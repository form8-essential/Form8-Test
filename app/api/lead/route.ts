import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

// ---- ตรวจความถูกต้องของ payload ----
const LeadItem = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  size: z.string().min(1),
});

const LeadSchema = z.object({
  name: z.string().trim().min(1, "กรุณากรอกชื่อ").max(120),
  // เบอร์ไทย 9–10 หลัก (อนุญาตให้มีขีด/เว้นวรรค แล้วค่อยตัดออก)
  phone: z
    .string()
    .trim()
    .transform((s: string) => s.replace(/\D/g, ""))
    .refine((s: string) => s.length >= 9 && s.length <= 10, "เบอร์โทรไม่ถูกต้อง"),
  line: z.string().trim().max(120).optional().or(z.literal("")),
  items: z.array(LeadItem).min(1, "เลือกสินค้าอย่างน้อย 1 รายการ"),
  summary: z.string().max(500).optional(),
  source: z.string().max(60).optional(),
});

// กันสแปมเบื้องต้น (rate limit ต่อ IP ในหน่วยความจำ — สำหรับโหลดสูงให้ย้ายไป Upstash/Vercel KV)
const hits = new Map<string, { count: number; ts: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const win = 60_000; // 1 นาที
  const max = 8;
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > win) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > max;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "ส่งบ่อยเกินไป ลองใหม่อีกครั้ง" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "รูปแบบข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "ข้อมูลไม่ครบ";
    return NextResponse.json({ ok: false, error: msg }, { status: 422 });
  }
  const lead = parsed.data;

  const row = {
    name: lead.name,
    phone: lead.phone,
    line_id: lead.line || null,
    items: lead.items,
    summary:
      lead.summary ??
      lead.items.map((i: { id: string; name: string; size: string }) => (i.size === "-" ? i.name : `${i.name} (${i.size})`)).join(", "),
    source: lead.source ?? "landing",
    user_agent: req.headers.get("user-agent") ?? null,
    ip,
  };

  const supabase = getSupabaseAdmin();

  // ---- โหมด dev: ยังไม่ตั้งค่า Supabase → log แทน (ไม่ให้ฟอร์มพัง) ----
  if (!supabase) {
    // eslint-disable-next-line no-console
    console.log("[LEAD] (no Supabase configured) ", row);
    return NextResponse.json({ ok: true, dev: true });
  }

  const { error } = await supabase.from("preorders").insert(row);
  if (error) {
    // eslint-disable-next-line no-console
    console.error("[LEAD] supabase insert error:", error.message);
    return NextResponse.json({ ok: false, error: "บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง" }, { status: 500 });
  }

  // ---- ทางเลือก: แจ้งเตือนอีเมลผ่าน Resend (ทำงานเมื่อมี RESEND_API_KEY) ----
  await notifyByEmail(row).catch((e) => console.error("[LEAD] notify error:", e));

  return NextResponse.json({ ok: true });
}

async function notifyByEmail(row: {
  name: string;
  phone: string;
  line_id: string | null;
  summary: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  if (!key || !to) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: `พรีออเดอร์ใหม่: ${row.name}`,
      text: `ชื่อ: ${row.name}\nเบอร์: ${row.phone}\nLine: ${row.line_id ?? "-"}\nสินค้า: ${row.summary}`,
    }),
  });
}
