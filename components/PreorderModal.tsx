"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PRODUCTS, BUNDLE_PRICE, type LeadItem } from "@/lib/products";
import { trackLead } from "@/lib/analytics";

type Prefill = { productId?: string; size?: string } | null;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} width={12} height={12}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export default function PreorderModal({
  open,
  prefill,
  onClose,
}: {
  open: boolean;
  prefill: Prefill;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [line, setLine] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [sizeOf, setSizeOf] = useState<Record<string, string>>({});
  const [bundleShirt, setBundleShirt] = useState("");
  const [bundleShirtSize, setBundleShirtSize] = useState("");
  const [bundlePants, setBundlePants] = useState("");
  const [bundlePantsSize, setBundlePantsSize] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  // เปิด modal: apply prefill, focus, ล็อก scroll
  useEffect(() => {
    if (!open) return;
    setSuccess(false);
    setError("");
    if (prefill?.productId) {
      setSelected((s) => ({ ...s, [prefill.productId as string]: true }));
      if (prefill.size) setSizeOf((s) => ({ ...s, [prefill.productId as string]: prefill.size as string }));
    }
    const t = setTimeout(() => nameRef.current?.focus(), 260);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open, prefill]);

  // ESC เพื่อปิด
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const pickSize = (id: string, size: string) => setSizeOf((s) => ({ ...s, [id]: size }));

  const anySelected = useMemo(
    () => Object.values(selected).some(Boolean),
    [selected]
  );

  const shirts = PRODUCTS.filter((p) => p.id.startsWith("shirt"));
  const pants = PRODUCTS.filter((p) => p.id.startsWith("pants"));
  const sizesOfId = (id: string) => PRODUCTS.find((p) => p.id === id)?.sizes ?? [];

  async function submit() {
    setError("");
    if (!name.trim()) return setError("กรุณากรอกชื่อของคุณ");
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 10) return setError("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9–10 หลัก)");
    if (!anySelected) return setError("กรุณาเลือกสินค้าที่สนใจอย่างน้อย 1 รายการ");

    const items: LeadItem[] = [];
    for (const p of PRODUCTS) {
      if (!selected[p.id]) continue;
      if (!sizeOf[p.id]) return setError(`กรุณาเลือกไซส์ของ "${p.th}"`);
      items.push({ id: p.id, name: p.th, size: sizeOf[p.id] });
    }
    if (selected["bundle"]) {
      if (!bundleShirt || !bundleShirtSize) return setError("Bundle: กรุณาเลือกเสื้อเชิ้ตและไซส์");
      if (!bundlePants || !bundlePantsSize) return setError("Bundle: กรุณาเลือกกางเกงและไซส์");
      const sName = PRODUCTS.find((p) => p.id === bundleShirt)?.th ?? bundleShirt;
      const pName = PRODUCTS.find((p) => p.id === bundlePants)?.th ?? bundlePants;
      items.push({ id: bundleShirt, name: `${sName} [Bundle]`, size: bundleShirtSize });
      items.push({ id: bundlePants, name: `${pName} [Bundle]`, size: bundlePantsSize });
    }

    const summary = items.map((i) => (i.size === "-" ? i.name : `${i.name} (${i.size})`)).join(", ");
    const payload = { name: name.trim(), phone: digits, line: line.trim(), items, summary, source: "landing" };

    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "ส่งไม่สำเร็จ");

      trackLead({
        value: selected["bundle"] ? BUNDLE_PRICE : 690,
        currency: "THB",
        products: items.map((i) => i.id).join("|"),
        sizes: items.map((i) => i.size).join("|"),
      });
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="modal-wrap show" aria-hidden={!open}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        {!success ? (
          <div>
            <div className="flex items-start justify-between px-5 pt-5">
              <div>
                <p className="eyebrow">Pre-order</p>
                <h3 id="modalTitle" className="mt-1.5 text-[18px] font-semibold text-ink leading-snug">
                  ขอบคุณที่ให้ความสนใจ
                  <br />
                  FORM8!
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="ปิด"
                className="flex-none w-9 h-9 -mr-1 -mt-1 flex items-center justify-center text-muted hover:text-ink"
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="mx-5 mt-4 bg-steam border border-line p-3.5">
              <p className="text-[12.5px] leading-relaxed text-ink">
                สินค้าล็อตแรกกำลังอยู่ในขั้นตอนการผลิตและตรวจรับคุณภาพอย่างพิถีพิถัน (
                <span className="font-semibold">จำนวนจำกัด 200 ชุดแรก</span>) ตอบแบบสอบถามสั้น ๆ เพื่อรับสิทธิ์ส่วนลดพิเศษ{" "}
                <span className="text-navy font-semibold">20%</span> (เหลือ ฿690 จาก ฿890)
                เราจะส่งรหัสส่วนลดให้เมื่อสินค้าพร้อม โดยติดต่อผ่านไลน์หรือเบอร์เพียงครั้งเดียวเท่านั้น
              </p>
            </div>

            <div className="px-5 pt-5 pb-6 space-y-4">
              <Field label="ชื่อ–นามสกุล / ชื่อเล่น" required>
                <input
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  autoComplete="name"
                  className="fld"
                  placeholder="เช่น สมชาย ใจดี"
                />
              </Field>
              <Field label="เบอร์โทรศัพท์ (สำหรับแจ้งเตือน SMS)" required>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="fld"
                  placeholder="08X-XXX-XXXX"
                />
              </Field>
              <Field label="Line ID" hint="(ถ้ามี)">
                <input value={line} onChange={(e) => setLine(e.target.value)} type="text" className="fld" placeholder="Somchai1234" />
              </Field>

              <div>
                <label className="block text-[12.5px] font-medium text-ink mb-2">
                  สินค้าและไซส์ที่คุณสนใจ <span className="text-amber">*</span>
                </label>
                <div className="space-y-1">
                  {PRODUCTS.map((p) => (
                    <div key={p.id} className={`prow relative border border-line px-3 py-2.5 ${selected[p.id] ? "open" : ""}`}>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input type="checkbox" checked={!!selected[p.id]} onChange={() => toggle(p.id)} className="peer sr-only" />
                        <span className={`box ${selected[p.id] ? "on" : ""}`}>
                          <CheckIcon />
                        </span>
                        <span className="text-[13px] text-ink">{p.th}</span>
                      </label>
                      <div className="sizes pl-8 pt-2 flex flex-wrap gap-1.5">
                        {p.sizes.map((s) => (
                          <span
                            key={s}
                            onClick={() => pickSize(p.id, s)}
                            className={`size-pill ${sizeOf[p.id] === s ? "active" : ""}`}
                            style={{ minWidth: "1.9rem", height: "1.9rem", fontSize: ".72rem" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Bundle */}
                  <div className="relative border-2 border-navy px-3 py-2.5" style={{ background: "rgba(34,48,74,.05)" }}>
                    <label className="flex items-center justify-between gap-2.5 cursor-pointer">
                      <span className="flex items-center gap-2.5">
                        <input type="checkbox" checked={!!selected["bundle"]} onChange={() => toggle("bundle")} className="peer sr-only" />
                        <span className={`box ${selected["bundle"] ? "on" : ""}`}>
                          <CheckIcon />
                        </span>
                        <span className="text-[13px] font-medium text-navy">รับเป็น Bundle Set (เสื้อ 1 + กางเกง 1)</span>
                      </span>
                      <span className="text-[13px] font-semibold text-navy">฿{BUNDLE_PRICE.toLocaleString()}</span>
                    </label>

                    {selected["bundle"] && (
                      <div className="mt-3 pt-3 border-t border-navy/20 space-y-3">
                        {/* 1) เลือกเสื้อ */}
                        <div>
                          <p className="text-[12px] font-medium text-navy mb-1.5">1) เลือกเสื้อเชิ้ต 1 ตัว</p>
                          <div className="flex flex-wrap gap-1.5">
                            {shirts.map((s) => (
                              <span
                                key={s.id}
                                onClick={() => setBundleShirt(s.id)}
                                className={`size-pill px-3 ${bundleShirt === s.id ? "active" : ""}`}
                                style={{ height: "1.9rem", fontSize: ".72rem" }}
                              >
                                {s.en}
                              </span>
                            ))}
                          </div>
                          {bundleShirt && (
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {sizesOfId(bundleShirt).map((sz) => (
                                <span
                                  key={sz}
                                  onClick={() => setBundleShirtSize(sz)}
                                  className={`size-pill ${bundleShirtSize === sz ? "active" : ""}`}
                                  style={{ minWidth: "1.9rem", height: "1.9rem", fontSize: ".72rem" }}
                                >
                                  {sz}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* 2) เลือกกางเกง */}
                        <div>
                          <p className="text-[12px] font-medium text-navy mb-1.5">2) เลือกกางเกงสแล็ค 1 ตัว</p>
                          <div className="flex flex-wrap gap-1.5">
                            {pants.map((s) => (
                              <span
                                key={s.id}
                                onClick={() => setBundlePants(s.id)}
                                className={`size-pill px-3 ${bundlePants === s.id ? "active" : ""}`}
                                style={{ height: "1.9rem", fontSize: ".72rem" }}
                              >
                                {s.en}
                              </span>
                            ))}
                          </div>
                          {bundlePants && (
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {sizesOfId(bundlePants).map((sz) => (
                                <span
                                  key={sz}
                                  onClick={() => setBundlePantsSize(sz)}
                                  className={`size-pill ${bundlePantsSize === sz ? "active" : ""}`}
                                  style={{ minWidth: "1.9rem", height: "1.9rem", fontSize: ".72rem" }}
                                >
                                  {sz}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-[12.5px] text-red-600 bg-red-50 border border-red-200 px-3 py-2">{error}</p>
              )}

              <button onClick={submit} disabled={submitting} className="btn btn-primary w-full h-13 py-4 text-[15px] disabled:opacity-60">
                {submitting ? "กำลังส่ง..." : "ส่งคำตอบ · รับสิทธิ์ส่วนลด 20%"}
              </button>
              <p className="text-center text-[11px] text-muted">
                การตอบแบบสอบถามนี้ไม่มีการชำระเงินและไม่มีข้อผูกมัดใด ๆ
                <br />
                การกดยืนยันถือว่ายอมรับ{" "}
                <a href="/privacy" target="_blank" className="underline text-navy">
                  นโยบายความเป็นส่วนตัว
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-navy flex items-center justify-center">
              <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#cf8a2c" strokeWidth={2}>
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-5 text-[19px] font-semibold text-ink">บันทึกข้อมูลเรียบร้อยแล้ว!</h3>
            <p className="mt-3 text-[13.5px] text-muted leading-relaxed">
              ทีมงานจะส่งรหัสส่วนลด <span className="text-navy font-semibold">20%</span> ให้ท่านทาง SMS / Line
              เมื่อสินค้าพร้อมจัดส่ง (คาดว่าพร้อมส่งภายใน 2–3 สัปดาห์)
              <br />
              ขอบคุณครับ 🙏
            </p>
            <button onClick={onClose} className="btn btn-primary mt-7 w-full h-12 text-[14px]">
              เรียบร้อย
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12.5px] font-medium text-ink mb-1.5">
        {label} {required && <span className="text-amber">*</span>}
        {hint && <span className="text-muted font-normal"> {hint}</span>}
      </label>
      {children}
    </div>
  );
}
