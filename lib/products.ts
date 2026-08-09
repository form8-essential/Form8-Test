export type Product = {
  id: string;
  th: string;
  en: string;
  price: number;
  was: number;
  sizes: string[];
};

// ไซส์แยกตามประเภท: เสื้อใช้ S/M/L/XL, กางเกงใช้เอว 28/30/32/34
export const SHIRT_SIZES = ["S", "M", "L", "XL"] as const;
export const PANT_SIZES = ["28", "30", "32", "34"] as const;

export const PRODUCTS: Product[] = [
  // เสื้อเชิ้ต 3 สี
  { id: "shirt-white", th: "เสื้อเชิ้ต Easy Iron — สีขาว", en: "White Shirt", price: 690, was: 890, sizes: [...SHIRT_SIZES] },
  { id: "shirt-navy", th: "เสื้อเชิ้ต Easy Iron — สีกรมท่า", en: "Navy Shirt", price: 690, was: 890, sizes: [...SHIRT_SIZES] },
  { id: "shirt-black", th: "เสื้อเชิ้ต Easy Iron — สีดำ", en: "Black Shirt", price: 690, was: 890, sizes: [...SHIRT_SIZES] },
  // กางเกงสแล็ค 3 สี
  { id: "pants-black", th: "กางเกงสแล็ค Smart Fit — สีดำ", en: "Black Trousers", price: 690, was: 890, sizes: [...PANT_SIZES] },
  { id: "pants-grey", th: "กางเกงสแล็ค Smart Fit — สีเทาเข้ม", en: "Dark Grey Trousers", price: 690, was: 890, sizes: [...PANT_SIZES] },
  { id: "pants-navy", th: "กางเกงสแล็ค Smart Fit — สีกรมท่า", en: "Navy Trousers", price: 690, was: 890, sizes: [...PANT_SIZES] },
];

// คงไว้เผื่อโค้ดเก่าอ้างอิง (ค่าเริ่มต้น = ไซส์เสื้อ)
export const SIZES = SHIRT_SIZES;
export type Size = string;

export const BUNDLE_PRICE = 1290;

export type LeadItem = { id: string; name: string; size: string };

export type Lead = {
  name: string;
  phone: string;
  line?: string;
  items: LeadItem[];
  summary: string;
  source?: string;
};

export function productName(id: string): string {
  if (id === "bundle") return "Bundle Set (เสื้อ+กางเกง)";
  return PRODUCTS.find((p) => p.id === id)?.th ?? id;
}
