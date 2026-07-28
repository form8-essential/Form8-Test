export type Product = {
  id: string;
  th: string;
  en: string;
  price: number;
  was: number;
};

export const PRODUCTS: Product[] = [
  { id: "shirt-white", th: "เสื้อเชิ้ต Easy Iron — สีขาว", en: "White Shirt", price: 690, was: 890 },
  { id: "shirt-navy", th: "เสื้อเชิ้ต Easy Iron — สีกรมท่า", en: "Navy Shirt", price: 690, was: 890 },
  { id: "pants-black", th: "กางเกงสแล็ค Smart Fit — สีดำ", en: "Black Trousers", price: 690, was: 890 },
  { id: "pants-grey", th: "กางเกงสแล็ค Smart Fit — สีเทาเข้ม", en: "Dark Grey Trousers", price: 690, was: 890 },
];

export const SIZES = ["S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

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
