import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

// 🔧 แก้อีเมลติดต่อตรงนี้ให้เป็นอีเมลจริงของคุณ
const CONTACT_EMAIL = "form8.essential@gmail.com";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | FORM8",
  description: "นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคลของ FORM8 ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-steam text-ink">
      <div className="max-w-[680px] mx-auto px-5 py-10">
        {/* header */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <Link href="/" className="brandmark text-[16px] font-semibold text-ink">
            FORM8
          </Link>
          <Link href="/" className="text-[13px] text-navy hover:underline">
            ← กลับหน้าหลัก
          </Link>
        </div>

        <h1 className="mt-8 text-[24px] font-semibold">นโยบายความเป็นส่วนตัว</h1>
        <p className="mt-2 text-[13px] text-muted">มีผลบังคับใช้: 2568 · ปรับปรุงล่าสุด: 2568</p>

        <div className="mt-6 space-y-6 text-[14.5px] leading-relaxed text-ink/90">
          <p>
            FORM8 (&quot;เรา&quot;) ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของคุณ นโยบายฉบับนี้อธิบายว่าเราเก็บ ใช้
            และคุ้มครองข้อมูลของคุณอย่างไร เมื่อคุณเข้าใช้งานเว็บไซต์และลงทะเบียนพรีออเดอร์กับเรา
            โดยเป็นไปตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
          </p>

          <Section title="1. ข้อมูลที่เราเก็บรวบรวม">
            <p>เมื่อคุณลงทะเบียนจองสินค้าผ่านแบบฟอร์มบนเว็บไซต์ เราจะเก็บข้อมูลต่อไปนี้:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>ชื่อ–นามสกุล หรือชื่อเล่น</li>
              <li>เบอร์โทรศัพท์</li>
              <li>Line ID (หากคุณให้ข้อมูล)</li>
              <li>สินค้าและไซส์ที่คุณสนใจ</li>
            </ul>
            <p className="mt-2">
              นอกจากนี้ เมื่อคุณเข้าชมเว็บไซต์ เราอาจเก็บข้อมูลการใช้งานโดยอัตโนมัติผ่านคุกกี้และเครื่องมือวิเคราะห์
              เช่น หน้าที่เข้าชม ระยะเวลา และพฤติกรรมการใช้งาน เพื่อปรับปรุงเว็บไซต์และการโฆษณา
            </p>
          </Section>

          <Section title="2. วัตถุประสงค์ในการใช้ข้อมูล">
            <ul className="list-disc pl-5 space-y-1">
              <li>ติดต่อกลับเพื่อยืนยันคำสั่งจองและแจ้งความคืบหน้าของสินค้า</li>
              <li>จัดส่งข้อมูลโปรโมชันและส่วนลดที่เกี่ยวข้องกับการจองของคุณ</li>
              <li>วิเคราะห์ความต้องการของตลาดเพื่อวางแผนการผลิต</li>
              <li>ปรับปรุงประสิทธิภาพของเว็บไซต์และการโฆษณา</li>
            </ul>
          </Section>

          <Section title="3. คุกกี้และเครื่องมือของบุคคลที่สาม">
            <p>
              เว็บไซต์ของเราใช้คุกกี้และพิกเซลติดตามจากผู้ให้บริการภายนอกเพื่อวัดผลและปรับปรุงการโฆษณา ได้แก่:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Meta (Facebook) Pixel — วัดผลและปรับแต่งโฆษณาบน Facebook/Instagram</li>
              <li>TikTok Pixel — วัดผลและปรับแต่งโฆษณาบน TikTok</li>
              <li>Microsoft Clarity — วิเคราะห์พฤติกรรมการใช้งานเว็บไซต์ (แบบไม่ระบุตัวตน)</li>
            </ul>
            <p className="mt-2">
              คุณสามารถปิดการทำงานของคุกกี้ได้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ
            </p>
          </Section>

          <Section title="4. การเปิดเผยข้อมูล">
            <p>
              เรา<strong>ไม่ขาย</strong>ข้อมูลส่วนบุคคลของคุณให้บุคคลภายนอก เราอาจใช้ผู้ให้บริการที่น่าเชื่อถือในการจัดเก็บและประมวลผลข้อมูล
              (เช่น ระบบฐานข้อมูลและระบบวิเคราะห์) ซึ่งมีหน้าที่รักษาความลับของข้อมูลตามมาตรฐาน
              เราจะเปิดเผยข้อมูลต่อเมื่อได้รับความยินยอมจากคุณ หรือเมื่อกฎหมายกำหนดเท่านั้น
            </p>
          </Section>

          <Section title="5. ระยะเวลาการจัดเก็บ">
            <p>
              เราจะเก็บข้อมูลของคุณไว้เท่าที่จำเป็นตามวัตถุประสงค์ข้างต้น หรือจนกว่าคุณจะขอให้ลบข้อมูล
              เมื่อหมดความจำเป็น เราจะลบหรือทำให้ข้อมูลไม่สามารถระบุตัวตนได้
            </p>
          </Section>

          <Section title="6. สิทธิของเจ้าของข้อมูล">
            <p>ภายใต้ PDPA คุณมีสิทธิดังต่อไปนี้:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>สิทธิขอเข้าถึงและขอสำเนาข้อมูลของคุณ</li>
              <li>สิทธิขอแก้ไขข้อมูลให้ถูกต้อง</li>
              <li>สิทธิขอลบหรือทำลายข้อมูล</li>
              <li>สิทธิเพิกถอนความยินยอมเมื่อใดก็ได้</li>
              <li>สิทธิคัดค้านการเก็บหรือใช้ข้อมูล</li>
            </ul>
            <p className="mt-2">หากต้องการใช้สิทธิเหล่านี้ กรุณาติดต่อเราตามช่องทางด้านล่าง</p>
          </Section>

          <Section title="7. ความยินยอม">
            <p>
              การกรอกและส่งแบบฟอร์มลงทะเบียนบนเว็บไซต์ ถือว่าคุณได้อ่านและยอมรับนโยบายความเป็นส่วนตัวฉบับนี้
              และยินยอมให้เราเก็บและใช้ข้อมูลตามวัตถุประสงค์ที่ระบุไว้
            </p>
          </Section>

          <Section title="8. ติดต่อเรา">
            <p>
              หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว หรือต้องการใช้สิทธิเกี่ยวกับข้อมูลของคุณ ติดต่อได้ที่:
            </p>
            <p className="mt-2">
              <strong>FORM8</strong>
              <br />
              อีเมล:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-navy underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </Section>
        </div>

        <div className="mt-10 border-t border-line pt-5">
          <Link href="/" className="text-[13px] text-navy hover:underline">
            ← กลับหน้าหลัก FORM8
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[16px] font-semibold text-ink">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
