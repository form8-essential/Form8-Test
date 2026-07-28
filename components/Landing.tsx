"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PRODUCTS, SIZES, BUNDLE_PRICE } from "@/lib/products";
import { trackBuyIntent } from "@/lib/analytics";
import PreorderModal from "./PreorderModal";

type Prefill = { productId?: string; size?: string } | null;

export default function Landing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefill, setPrefill] = useState<Prefill>(null);
  const [cardSize, setCardSize] = useState<Record<string, string>>({});
  const [stickyShown, setStickyShown] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(
    (source: string, productId?: string) => {
      trackBuyIntent(source, productId ?? null);
      setPrefill(productId ? { productId, size: cardSize[productId] } : null);
      setModalOpen(true);
    },
    [cardSize]
  );

  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setStickyShown(!e.isIntersecting), {
      threshold: 0,
      rootMargin: "-120px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => en.isIntersecting && (en.target.classList.add("in"), io.unobserve(en.target))),
      { threshold: 0.12 }
    );
    els.forEach((el: HTMLElement) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToCollection = () => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="frame relative" ref={rootRef}>
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-steam/90 backdrop-blur border-b border-line">
        <div className="flex items-center justify-between px-5 h-14">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="FORM8"
              className="h-9 w-auto"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                const f = t.parentElement?.querySelector(".logo-fallback") as HTMLElement | null;
                if (f) f.style.display = "inline";
              }}
            />
            <span className="logo-fallback brandmark text-[18px] font-semibold text-ink" style={{ display: "none" }}>
              FORM8
            </span>
            <span className="text-[9px] tracking-[.22em] uppercase text-muted leading-tight border-l border-line pl-2.5">
              Everyday<br />Smartwear
            </span>
          </div>
          <div className="text-[10px] tracking-[.18em] uppercase text-navy border border-navy/40 px-2 py-1">Pre-order</div>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section ref={heroRef} className="px-5 pt-8 pb-9 bg-steam">
        <p className="eyebrow reveal">Easy Iron Series · พรีออเดอร์ล็อตแรก</p>
        <h1 className="reveal mt-3 text-[26px] leading-[1.28] font-semibold text-ink">
          เสื้อเชิ้ต &amp; กางเกงสแล็ค
          <span className="display italic font-semibold text-navy"> Easy&nbsp;Iron</span>
          <br />
          <span className="text-navy">สะบัดตาก รีดแป๊บเดียวจบ</span>
          <br />
          ลุคเนี้ยบตลอด 8 ชั่วโมง
        </h1>
        <p className="reveal mt-4 text-[15px] leading-relaxed text-muted">
          ออกแบบมาเพื่อคนทำงานยุคใหม่ — ผ้าคืนตัวไว ไม่ยับง่าย แม้นั่งทำงานหรือเดินทางทั้งวัน
        </p>

        <div className="reveal mt-6 mock wrinkle aspect-[4/5] w-full">
          <img src="/hero.jpg" alt="นายแบบใส่ชุด Easy Iron" className="mock-img" />
          <div className="press-badge absolute bottom-3 right-3 bg-ink text-white text-[11px] font-medium px-2.5 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" /> รอยยับหายไป
          </div>
        </div>

        <button onClick={() => openModal("hero")} className="btn btn-primary reveal mt-6 w-full h-14 text-[15px]">
          เลือกเซ็ตพรีออเดอร์ · รับส่วนลด 20%
        </button>
        <button
          onClick={scrollToCollection}
          className="reveal mt-3 text-center w-full text-[12px] text-muted tracking-wide underline-offset-2 hover:underline"
        >
          ดูสินค้าทั้ง 4 ชิ้น · ล็อตแรกจำกัด <span className="text-ink font-semibold">200 ชุด</span>
        </button>
      </section>

      <div className="hairline" />

      {/* SECTION 2 — PAIN POINT & FEATURES */}
      <section className="px-5 py-10 bg-paper">
        <p className="eyebrow reveal">Fit &amp; Fabric</p>
        <h2 className="reveal mt-3 text-[21px] leading-snug font-semibold text-ink">
          เลิกเสียเวลากับการรีดผ้า
          <br />
          และหมดกังวลกับเสื้อยับระหว่างวัน
        </h2>

        <ul className="mt-7 space-y-5">
          {FEATURES.map((f) => (
            <li key={f.title} className="reveal flex gap-4">
              <span
                className="flex-none w-11 h-11 rounded-full bg-navy/10 text-navy flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: f.icon }}
              />
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{f.title}</h3>
                <p className="text-[13.5px] text-muted leading-relaxed mt-1">{f.body}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Before / After */}
        <div className="reveal mt-8 grid grid-cols-2 gap-px bg-line border border-line">
          <div className="mock aspect-[3/4]">
            <img src="/before.jpg" alt="เสื้อทั่วไปยับ" className="mock-img" />
            <span className="tag on-img">Before</span>
          </div>
          <div className="mock aspect-[3/4]">
            <img src="/after.jpg" alt="เสื้อของแบรนด์เรียบเนี้ยบ" className="mock-img" />
            <span className="tag on-img" style={{ color: "#cf8a2c" }}>After</span>
          </div>
        </div>
        <p className="reveal text-center text-[11.5px] text-muted mt-2">ภาพเปรียบเทียบ ก่อน / หลัง</p>

        {/* Fabric close-up */}
        <div className="reveal mt-5 mock aspect-[16/9]">
          <img src="/fabric.jpg" alt="เนื้อผ้า Easy Iron" className="mock-img" />
        </div>
      </section>

      <div className="hairline" />

      {/* SECTION 3 — CATALOG */}
      <section id="collection" className="px-5 py-10 bg-steam">
        <p className="eyebrow reveal">The Collection</p>
        <h2 className="reveal mt-3 text-[21px] leading-snug font-semibold text-ink">
          The FORM8 Collection
          <span className="text-muted font-normal text-[15px] block mt-1">
            4 ชิ้นหลัก · มิกซ์แอนด์แมตช์ได้มากกว่า 4 ลุคตลอดสัปดาห์
          </span>
        </h2>

        <div className="reveal mt-5 mock aspect-[16/10]">
          <img src="/capsule.jpg" alt="เซ็ต Capsule Wardrobe" className="mock-img" />
        </div>

        {/* Product grid */}
        <div className="mt-7 grid grid-cols-2 gap-3.5">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="reveal bg-paper border border-line p-3">
              <div className="mock aspect-[3/4]">
                <img src={`/${p.id}.jpg`} alt={p.en} className="mock-img" />
              </div>
              <h3 className="mt-2.5 text-[13px] font-medium leading-snug text-ink">{p.th}</h3>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[15px] font-semibold text-navy">฿{p.price}</span>
                <span className="text-[11px] text-muted line-through">฿{p.was}</span>
              </div>
              <div className="mt-2 flex gap-1">
                {SIZES.map((s) => (
                  <span
                    key={s}
                    onClick={() => setCardSize((c) => ({ ...c, [p.id]: s }))}
                    className={`size-pill ${cardSize[p.id] === s ? "active" : ""}`}
                    style={{ minWidth: "1.8rem", height: "1.8rem", fontSize: ".72rem" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <button onClick={() => openModal("card", p.id)} className="btn btn-primary mt-2.5 w-full h-10 text-[13px]">
                จอง
              </button>
            </div>
          ))}
        </div>

        {/* Bundle */}
        <div className="reveal mt-4 bg-navy text-white p-5 relative overflow-hidden">
          <span className="absolute top-0 right-0 bg-amber text-ink text-[10px] font-bold tracking-wider uppercase px-2.5 py-1">คุ้มสุด</span>
          <p className="eyebrow" style={{ color: "#cf8a2c" }}>Special Bundle Set</p>
          <h3 className="mt-2 text-[17px] font-semibold leading-snug">เสื้อเชิ้ต 1 ตัว + กางเกงสแล็ค 1 ตัว</h3>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="display text-[30px] font-semibold">฿{BUNDLE_PRICE.toLocaleString()}</span>
            <span className="text-[12px] text-white/60">รวมส่งฟรีทั่วประเทศ</span>
          </div>
          <button onClick={() => openModal("bundle", "bundle")} className="btn btn-amber mt-4 w-full h-12 text-[14px]">
            รับดีล Bundle · ส่งฟรี
          </button>
        </div>

        <button onClick={() => openModal("catalog")} className="btn btn-primary reveal mt-4 w-full h-14 text-[15px]">
          สั่งจองสิทธิ์ · รับส่วนลด 20%
        </button>
      </section>

      <div className="hairline" />

      {/* SECTION 4 — SOCIAL PROOF */}
      <section className="px-5 py-11 bg-ink text-white">
        <p className="eyebrow reveal" style={{ color: "#cf8a2c" }}>Why Essential</p>
        <h2 className="reveal mt-3 text-[21px] leading-snug font-semibold">
          ทำไมคนทำงานถึงเลือก
          <br />
          FORM8
        </h2>

        <div className="reveal mt-7 grid grid-cols-3 gap-px bg-white/10 border border-white/10">
          {STATS.map((s) => (
            <div key={s.k} className="bg-ink px-3 py-5 text-center">
              <div className="display text-[24px] font-semibold text-amber">{s.k}</div>
              <p className="text-[11.5px] text-white/70 mt-1.5 leading-snug" dangerouslySetInnerHTML={{ __html: s.v }} />
            </div>
          ))}
        </div>
        <p className="reveal text-[12.5px] text-white/60 leading-relaxed mt-4">
          ตัดเย็บอย่างพิถีพิถันด้วยผ้าเกรดโรงงานส่งออก คัดเนื้อผ้าและควบคุมงานเย็บทุกขั้นตอน เพื่อให้ได้ทรงที่เนี้ยบและใส่ทน
        </p>

        <div className="reveal mt-6 mock aspect-[16/10]" style={{ borderColor: "rgba(255,255,255,.12)" }}>
          <img src="/lifestyle.jpg" alt="ลุคคนทำงาน" className="mock-img" />
        </div>

        <figure className="reveal mt-6 border-l-2 border-amber pl-4">
          <blockquote className="text-[15px] leading-relaxed text-white/90">
            “ลองใส่ไปทำงานทั้งวัน นั่ง MRT ลุกนั่งบ่อยมาก พอกลับบ้านรอยยับตรงข้อพับแทบไม่มี ประทับใจมากครับ”
          </blockquote>
          <figcaption className="mt-3 text-[12.5px] text-white/60">
            <span className="text-white font-medium">คุณทัช</span> · Business Development
            <span className="block text-[10px] tracking-wider uppercase text-amber mt-1">Verified Tester</span>
          </figcaption>
        </figure>
      </section>

      {/* FOOTER */}
      <footer className="px-5 py-8 bg-navy text-white/70">
        <div className="brandmark text-[13px] font-semibold text-white tracking-[.14em]">FORM8</div>
        <p className="text-[12px] mt-2 leading-relaxed">พรีออเดอร์ล็อตแรกจำนวนจำกัด 200 ชุด · คาดพร้อมจัดส่งภายใน 2–3 สัปดาห์</p>
        <p className="text-[11px] mt-4 text-white/40">© 2025 FORM8 · Easy Iron Series.</p>
        <div className="h-16" />
      </footer>

      {/* STICKY BAR */}
      <div className={`sticky-bar ${stickyShown && !modalOpen ? "show" : ""}`}>
        <div className="bg-ink text-white flex items-stretch border-t border-white/10">
          <div className="flex-1 px-4 py-2.5 flex flex-col justify-center">
            <span className="text-[10px] tracking-wider uppercase text-amber">โปรเปิดตัว</span>
            <span className="text-[14px] font-semibold leading-tight">ลด 20% · เหลือ ฿690</span>
          </div>
          <button onClick={() => openModal("sticky")} className="btn btn-amber px-5 text-[14px] rounded-none">
            สั่งซื้อ / รับสิทธิ์
          </button>
        </div>
      </div>

      <PreorderModal open={modalOpen} prefill={prefill} onClose={closeModal} />
    </div>
  );
}

const FEATURES = [
  {
    title: "Easy Iron Fabric",
    body: "เส้นใยคืนตัวไว รีดง่ายขึ้น 3 เท่า หรือสะบัดตากก็พร้อมใส่ในวันรีบ ๆ",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>`,
  },
  {
    title: "Breathable & Soft Touch",
    body: "ผ้าระบายอากาศดี ไม่ร้อน สัมผัสนุ่ม เหมาะกับสภาพอากาศเมืองไทย",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h11a3 3 0 100-6M3 12h16a3 3 0 110 6M3 16h9"/></svg>`,
  },
  {
    title: "Modern Tailored Fit",
    body: "แพทเทิร์นพอดีตัว เสริมบุคลิกให้ดูมืออาชีพ ไม่โคร่งและไม่รัดแน่นเกินไป",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><path d="M8 7l12 10M8 17L20 7"/></svg>`,
  },
];

const STATS = [
  { k: "×3", v: "รีดง่ายขึ้น<br/>คืนตัวไว" },
  { k: "QC", v: "ตรวจคุณภาพ<br/>ทุกชิ้น" },
  { k: "Export", v: "ผ้าเกรด<br/>ส่งออก" },
];
