import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ⚠️ ใช้ฝั่ง server เท่านั้น (API route / server action)
// service role key มีสิทธิ์ข้าม RLS — ห้าม import ไฟล์นี้ในโค้ดฝั่ง client เด็ดขาด

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // ถ้ายังไม่ตั้งค่า env → คืน null (dev mode จะ log lead ลง console แทน insert)
  if (!url || !serviceKey) return null;

  if (cached) return cached;
  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
