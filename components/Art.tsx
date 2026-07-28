// เรนเดอร์ SVG string ให้เต็มกรอบ (ภาพประกอบ static — ปลอดภัยเพราะไม่ใช่ input จากผู้ใช้)
export default function Art({ html, className = "" }: { html: string; className?: string }) {
  return <span className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}
