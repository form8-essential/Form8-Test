-- ─────────────────────────────────────────────────────────────
-- Essential Workwear · ตาราง preorders
-- รันใน Supabase Dashboard → SQL Editor → New query → paste → Run
-- ─────────────────────────────────────────────────────────────

create table if not exists public.preorders (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  line_id     text,
  items       jsonb not null,          -- [{ id, name, size }]
  summary     text,
  source      text,                    -- hero | card | bundle | catalog | sticky
  user_agent  text,
  ip          text
);

-- ค้นหา/เรียงตามเวลาได้ไว
create index if not exists preorders_created_at_idx on public.preorders (created_at desc);

-- เปิด RLS: ปิดการเข้าถึงจาก client โดยตรงทั้งหมด
-- การ insert เกิดฝั่ง server ด้วย service_role key ซึ่ง "ข้าม" RLS อยู่แล้ว
-- (จึงไม่ต้องสร้าง policy ให้ anon — ปลอดภัยกว่า แม้ anon key หลุดก็เขียนไม่ได้)
alter table public.preorders enable row level security;

-- ─────────────────────────────────────────────────────────────
-- วิเคราะห์ดีมานด์: ไซส์/สีไหนมาแรง (ตัวอย่าง query)
-- ─────────────────────────────────────────────────────────────
-- แตก items ออกมานับรายชิ้น:
--   select it->>'name' as product, it->>'size' as size, count(*) as n
--   from public.preorders, jsonb_array_elements(items) as it
--   group by product, size
--   order by n desc;
