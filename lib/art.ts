// ภาพประกอบแบบเวกเตอร์ในตัว (เรนเดอร์ได้ทุกที่ ไม่พึ่ง external image)
// ใช้ผ่าน <Art html={...} /> (dangerouslySetInnerHTML) ในคอมโพเนนต์
// ⇒ เมื่อพร้อม ให้แทนที่ด้วย <Image/> ของ next/image ที่ชี้ไปยังรูปสินค้าจริง

export const SHARED_DEFS = `<svg width="0" height="0" style="position:absolute;pointer-events:none" aria-hidden="true"><defs>
  <linearGradient id="gHero" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e8ee"/><stop offset="1" stop-color="#c2ccd7"/></linearGradient>
  <linearGradient id="gNavy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c3c5a"/><stop offset="1" stop-color="#1a2740"/></linearGradient>
  <pattern id="pWeave" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="12" fill="#eaeef2"/><rect width="6" height="12" fill="#dfe5ec"/><rect y="6" width="12" height="6" fill="#e4e9ef" opacity=".6"/></pattern>
</defs></svg>`;

export const HERO_SVG = `<svg class="mock-img" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-label="นายแบบใส่เชิ้ตขาว">
  <rect width="400" height="500" fill="url(#gHero)"/>
  <ellipse cx="200" cy="474" rx="118" ry="15" fill="#0a132211"/>
  <circle cx="200" cy="120" r="36" fill="#cdb9a6"/>
  <path d="M164 116c2-30 70-30 72 0 2-38-74-40-72 0z" fill="#3b3a3c"/>
  <path d="M150 170 L200 150 L250 170 L264 306 L136 306 Z" fill="#f8fafc"/>
  <path d="M186 154 L200 178 L214 154 L207 148 L200 170 L193 148 Z" fill="#e6ebf0"/>
  <line x1="200" y1="178" x2="200" y2="304" stroke="#dde3ea" stroke-width="3"/>
  <circle cx="200" cy="206" r="2.6" fill="#c6cdd6"/><circle cx="200" cy="238" r="2.6" fill="#c6cdd6"/><circle cx="200" cy="270" r="2.6" fill="#c6cdd6"/>
  <path d="M150 170 L118 264 L146 274 L168 202 Z" fill="#eef2f6"/>
  <path d="M250 170 L282 264 L254 274 L232 202 Z" fill="#eef2f6"/>
  <path d="M150 306 L138 474 L190 474 L200 328 L210 474 L262 474 L250 306 Z" fill="#28344e"/>
</svg>`;

export const WRINKLE_SVG = `<svg class="mock-img" viewBox="0 0 300 400" preserveAspectRatio="none" aria-label="ผ้ายับ">
  <rect width="300" height="400" fill="#e6eaee"/>
  <g fill="none" stroke="#c4ccd4" stroke-width="4">
    <path d="M-10 50 q30 -18 60 0 t60 0 t60 0 t60 0 t60 0"/>
    <path d="M-10 110 q35 22 70 0 t70 0 t70 0 t70 0"/>
    <path d="M-10 170 q28 -20 56 0 t56 0 t56 0 t56 0 t56 0"/>
    <path d="M-10 230 q34 20 68 0 t68 0 t68 0 t68 0"/>
    <path d="M-10 290 q30 -18 60 0 t60 0 t60 0 t60 0 t60 0"/>
    <path d="M-10 350 q35 20 70 0 t70 0 t70 0 t70 0"/>
  </g>
</svg>`;

export const FABRIC_SVG = `<svg class="mock-img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 200 200" aria-label="เนื้อผ้า"><rect width="200" height="200" fill="url(#pWeave)"/></svg>`;

export const WARDROBE_SVG = `<svg class="mock-img" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-label="ตู้เสื้อผ้าแคปซูล">
  <rect width="400" height="250" fill="url(#gHero)"/>
  <line x1="40" y1="46" x2="360" y2="46" stroke="#8b95a1" stroke-width="5"/>
  <g stroke="#8b95a1" stroke-width="3" fill="none">
    <path d="M116 46 q0 -13 9 -13 t9 13"/><path d="M206 46 q0 -13 9 -13 t9 13"/><path d="M296 46 q0 -13 9 -13 t9 13"/>
  </g>
  <path d="M95 60 L120 50 L145 60 L150 214 L90 214 Z" fill="#f4f7fa" stroke="#d9dee4" stroke-width="2"/>
  <path d="M185 60 L210 50 L235 60 L240 214 L180 214 Z" fill="#26324c"/>
  <path d="M275 60 L300 50 L325 60 L330 214 L270 214 Z" fill="#565c64"/>
</svg>`;

export const LIFESTYLE_SVG = `<svg class="mock-img" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-label="ลุคคนทำงาน">
  <rect width="400" height="250" fill="url(#gNavy)"/>
  <circle cx="200" cy="72" r="26" fill="#cdb9a6"/>
  <path d="M172 68c2-22 54-22 56 0 2-28-58-30-56 0z" fill="#2c2b2d"/>
  <path d="M162 106 L200 92 L238 106 L248 250 L152 250 Z" fill="#eef2f6"/>
  <line x1="200" y1="112" x2="200" y2="248" stroke="#d5dce4" stroke-width="2"/>
  <path d="M162 106 L140 190 L160 196 L176 128 Z" fill="#e6ecf2"/>
  <path d="M238 106 L260 190 L240 196 L224 128 Z" fill="#e6ecf2"/>
</svg>`;

type Garment = { type: "shirt" | "pants"; fill: string; stroke: string; collar?: string; crease?: string };

const GARMENT: Record<string, Garment> = {
  "shirt-white": { type: "shirt", fill: "#f4f7fa", stroke: "#d3dae1", collar: "#e7ecf1" },
  "shirt-navy": { type: "shirt", fill: "#26324c", stroke: "#1a2338", collar: "#30405f" },
  "pants-black": { type: "pants", fill: "#1f232b", stroke: "#141821", crease: "#3a4150" },
  "pants-grey": { type: "pants", fill: "#565c64", stroke: "#454a52", crease: "#6d747d" },
};

export function garmentSVG(id: string): string {
  const g = GARMENT[id] ?? GARMENT["shirt-white"];
  if (g.type === "shirt") {
    return `<svg class="mock-img" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="400" fill="#e9edf1"/>
      <path d="M95 92 L150 70 L205 92 L214 344 L86 344 Z" fill="${g.fill}" stroke="${g.stroke}" stroke-width="2"/>
      <path d="M95 92 L58 218 L92 232 L112 132 Z" fill="${g.fill}" stroke="${g.stroke}" stroke-width="2"/>
      <path d="M205 92 L242 218 L208 232 L188 132 Z" fill="${g.fill}" stroke="${g.stroke}" stroke-width="2"/>
      <path d="M132 74 L150 100 L168 74 L158 66 L150 86 L142 66 Z" fill="${g.collar}"/>
      <line x1="150" y1="100" x2="150" y2="340" stroke="${g.stroke}" stroke-width="2"/>
      <circle cx="150" cy="150" r="3" fill="${g.stroke}"/><circle cx="150" cy="200" r="3" fill="${g.stroke}"/><circle cx="150" cy="250" r="3" fill="${g.stroke}"/><circle cx="150" cy="300" r="3" fill="${g.stroke}"/>
    </svg>`;
  }
  return `<svg class="mock-img" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
    <rect width="300" height="400" fill="#e9edf1"/>
    <rect x="92" y="70" width="116" height="28" rx="2" fill="${g.fill}" stroke="${g.stroke}" stroke-width="2"/>
    <path d="M92 96 L104 346 L144 346 L150 150 L156 346 L196 346 L208 96 Z" fill="${g.fill}" stroke="${g.stroke}" stroke-width="2"/>
    <line x1="124" y1="104" x2="126" y2="342" stroke="${g.crease}" stroke-width="2"/>
    <line x1="176" y1="104" x2="174" y2="342" stroke="${g.crease}" stroke-width="2"/>
  </svg>`;
}
