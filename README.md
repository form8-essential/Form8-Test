# Essential Workwear — Landing (Next.js + Supabase)

Smoke-test landing page (mobile-first) สำหรับเก็บ pre-order lead และวัดดีมานด์ก่อนผลิตจริง
Stack: **Next.js 14 (App Router) · TypeScript · Tailwind · Supabase**

---

## 1. รันในเครื่อง (Local)

```bash
npm install
cp .env.local.example .env.local   # แล้วเติมค่า (ดูข้อ 3)
npm run dev                        # เปิด http://localhost:3000
```

> ยังไม่ตั้งค่า Supabase ก็รันได้ — ฟอร์มจะทำงานในโหมด dev (log lead ลง console แทนการบันทึก) เพื่อให้ทดสอบ UI ได้ก่อน

---

## 2. ตั้งค่า Supabase (เก็บข้อมูล lead)

1. สร้างโปรเจกต์ที่ https://supabase.com
2. ไปที่ **SQL Editor** → วางเนื้อหาไฟล์ `supabase/schema.sql` → **Run** (สร้างตาราง `preorders` + เปิด RLS)
3. ไปที่ **Project Settings → API** คัดลอก:
   - `Project URL` → ใส่เป็น `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` key (secret) → ใส่เป็น `SUPABASE_SERVICE_ROLE_KEY`

**ทำไมใช้ service_role ฝั่ง server:** การ insert เกิดใน API route (`app/api/lead/route.ts`) เท่านั้น key ไม่หลุดไป client และ RLS เปิดไว้แบบไม่มี policy สำหรับ anon → แม้ anon key รั่วก็เขียนตารางไม่ได้

ดูข้อมูลที่เก็บได้ที่ Supabase → **Table Editor → preorders** หรือ Export CSV
วิเคราะห์ไซส์/สีที่คนต้องการมากสุดด้วย query ตัวอย่างท้ายไฟล์ `schema.sql`

---

## 3. Environment Variables

| ตัวแปร | จำเป็น | ใช้ทำอะไร |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | URL โปรเจกต์ Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | key ฝั่ง server เขียนตาราง |
| `NEXT_PUBLIC_GA4_ID` | – | Google Analytics 4 (G-XXXX) |
| `NEXT_PUBLIC_META_PIXEL_ID` | – | Meta/Facebook Pixel |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | – | TikTok Pixel |
| `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` | – | แจ้งเตือนอีเมลเมื่อมี lead ใหม่ |

---

## 4. Deploy บน Vercel

1. push โค้ดขึ้น GitHub
2. ที่ Vercel → **New Project** → import repo (Next.js auto-detect)
3. ใส่ Environment Variables ทั้งหมดจากข้อ 3 (Production + Preview)
4. **Deploy** — เสร็จแล้วผูกโดเมนได้เลย

---

## 5. Event Tracking (วัดผลแอด)

โค้ดยิง event ให้อัตโนมัติ (ดู `lib/analytics.ts`):

- **`Click_To_Buy_Intent`** — เมื่อกดปุ่มเปิด Modal (ทุกจุด) พร้อม `source`
- **`Completed_Lead`** — เมื่อส่งฟอร์มสำเร็จ และ map เป็น standard event:
  - GA4 → `generate_lead`
  - Meta → `Lead`
  - TikTok → `SubmitForm`

ใส่ Pixel ID ใน ENV แล้ว `components/Pixels.tsx` จะโหลด script ให้เอง (ตัวไหนไม่ใส่ = ข้าม)
ตั้งค่าให้ Ads Manager optimize หา conversion `Lead` / `SubmitForm` เพื่อลด CAC

---

## 6. แทนภาพตัวอย่าง (SVG) ด้วยรูปจริง

ภาพในหน้าเป็น SVG เวกเตอร์ชั่วคราว (อยู่ใน `lib/art.ts`) เมื่อถ่ายรูปสินค้าจริงแล้ว:
- วางไฟล์รูปใน `public/`
- แทน `<Art html={...}/>` ด้วย `<Image/>` ของ `next/image`
- **แนะนำ:** การ์ดสินค้า 4 ตัว ควรใช้รูปถ่ายจริงก่อนยิงแอด เพื่อให้สัญญาณดีมานด์แม่นยำ

---

## โครงสร้างไฟล์

```
app/
  layout.tsx            ฟอนต์ (next/font) + metadata + Pixels
  page.tsx              เรนเดอร์ <Landing/>
  globals.css           Tailwind + custom styles
  api/lead/route.ts     POST → validate (zod) → insert Supabase → (option) Resend
components/
  Landing.tsx           ทุก section + sticky bar + reveal
  PreorderModal.tsx     ฟอร์ม + เลือกไซส์ + success state
  Pixels.tsx            GA4 / Meta / TikTok
  Art.tsx               ตัวช่วยเรนเดอร์ SVG
lib/
  products.ts           ข้อมูลสินค้า + types
  analytics.ts          track() / trackBuyIntent() / trackLead()
  supabaseAdmin.ts      Supabase client (service role, server-only)
  art.ts                ภาพ SVG ในตัว
supabase/schema.sql     ตาราง + RLS + query วิเคราะห์
```
