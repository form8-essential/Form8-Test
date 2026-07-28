import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Anuphan, Prompt } from "next/font/google";
import Pixels from "@/components/Pixels";
import "./globals.css";

const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-anuphan",
  display: "swap",
});

// ฟอนต์คำอังกฤษเด่นๆ (wordmark, ราคา, "Easy Iron") — Prompt SemiBold
// หมายเหตุ: ยังใช้ตัวแปร --font-bodoni ตามเดิมเพื่อไม่ต้องแก้ไฟล์อื่น
const prompt = Prompt({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FORM8 — Easy Iron | สั่งจองพรีออเดอร์ ลด 20%",
  description:
    "เสื้อเชิ้ต & กางเกงสแล็ค Easy Iron สะบัดตาก รีดแป๊บเดียวจบ ลุคเนี้ยบตลอดวัน สำหรับคนทำงานยุคใหม่ พรีออเดอร์ล็อตแรกลด 20%",
  openGraph: {
    title: "FORM8 — Easy Iron | Everyday Smartwear",
    description: "สะบัดตาก รีดแป๊บเดียวจบ ลุคเนี้ยบตลอด 8 ชั่วโมง · พรีออเดอร์ลด 20%",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th" className={`${anuphan.variable} ${prompt.variable}`}>
      <body>
        {children}
        <Pixels />
      </body>
    </html>
  );
}
