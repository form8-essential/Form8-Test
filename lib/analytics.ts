// ยิง event เข้า dataLayer (GTM) + GA4 (gtag) + Meta Pixel (fbq) + TikTok Pixel (ttq)
// เรียกได้เฉพาะฝั่ง client เท่านั้น

type Params = Record<string, unknown>;

function w(): any {
  return typeof window === "undefined" ? null : (window as any);
}

/** custom event กลาง — ยิงเข้าทุกปลายทางที่มีให้ */
export function track(name: string, params: Params = {}): void {
  const win = w();
  if (!win) return;

  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event: name, ...params });

  if (typeof win.gtag === "function") win.gtag("event", name, params);
  if (typeof win.fbq === "function") win.fbq("trackCustom", name, params);
  if (win.ttq && typeof win.ttq.track === "function") win.ttq.track(name, params);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[track]", name, params);
  }
}

/** กดปุ่มเปิด Modal = แสดงเจตนาซื้อ */
export function trackBuyIntent(source: string, prefill?: string | null): void {
  track("Click_To_Buy_Intent", { source, prefill: prefill ?? null });
}

/** ส่งฟอร์มสำเร็จ = ได้ lead — map เข้า standard event ของแต่ละแพลตฟอร์มด้วย
 *  เพื่อให้อัลกอฯ optimize ต่อได้ (Meta = Lead, TikTok = SubmitForm, GA4 = generate_lead) */
export function trackLead(params: Params = {}): void {
  track("Completed_Lead", params);

  const win = w();
  if (!win) return;
  if (typeof win.gtag === "function") win.gtag("event", "generate_lead", params);
  if (typeof win.fbq === "function") win.fbq("track", "Lead", params);
  if (win.ttq && typeof win.ttq.track === "function") win.ttq.track("SubmitForm", params);
}
