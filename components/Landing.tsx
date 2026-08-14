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
        <h1 className="reveal mt-3 text-[29px] leading-[1.25] font-bold text-ink">
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

        <div
          className="reveal mt-6 mock wrinkle aspect-[4/5] w-full cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => openModal("hero-image")}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal("hero-image")}
        >
          <img src="/hero.jpg" alt="นายแบบใส่ชุด Easy Iron" className="mock-img" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 bg-amber text-ink text-[12px] font-semibold px-3 py-1.5 flex items-center gap-1.5">
            แตะตอบแบบสอบถาม · รับส่วนลด 20%
          </div>
          <div className="press-badge absolute top-3 right-3 bg-ink text-white text-[11px] font-medium px-2.5 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" /> รอยยับหายไป
          </div>
        </div>

        <button onClick={() => openModal("hero")} className="btn btn-primary reveal mt-6 w-full h-14 text-[15px]">
          ตอบแบบสอบถาม · รับสิทธิ์ส่วนลด 20%
        </button>
        <button
          onClick={scrollToCollection}
          className="reveal mt-3 text-center w-full text-[12px] text-muted tracking-wide underline-offset-2 hover:underline"
        >
          ดูสินค้าทั้ง 6 ไอเท็ม · ล็อตแรกจำกัด <span className="text-ink font-semibold">200 ชุด</span>
        </button>
      </section>

      <div className="hairline" />

      {/* SECTION — FOUNDER STORY */}
      <section className="px-5 py-11 bg-paper">
        <div className="reveal flex items-center gap-3">
          <img
            src="/founder.jpg"
            alt="สุทัศน์ ผู้ก่อตั้ง FORM8"
            className="w-14 h-14 rounded-full object-cover border border-line flex-none"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div>
            <p className="eyebrow">From The Founder</p>
            <p className="text-[13px] text-muted mt-0.5">สุทัศน์ (ทัช) · Co-Founder, FORM8</p>
          </div>
        </div>

        <h2 className="reveal mt-5 text-[21px] leading-snug font-semibold text-ink">
          ผมทำเสื้อตัวนี้ขึ้นมา เพราะผมไม่ชอบการยืนรีดผ้า 20 นาทีทุกเช้า
        </h2>

        <div className="reveal mt-4 space-y-4 text-[16px] leading-relaxed text-ink">
          <p>
            สวัสดีครับ ผมทัช (สุทัศน์) Co-Founder ของ FORM8 — ปกติผมชอบใส่เสื้อเชิ้ตไปทำงานมาก
            เพราะช่วยเสริมบุคลิกให้ดูเนี้ยบและน่าเชื่อถือ แต่สิ่งเดียวที่ผมเจอทุกเช้าและไม่ชอบเลยคือ “การรีดผ้า”
          </p>
          <p>
            ผมลองมาหลายยี่ห้อ ทั้งถูกและแพง บางตัวราคาสูงมากแต่เนื้อผ้ากลับรีดยาก
            นั่งรีดตัวเดียว 20–30 นาทีก็ยังไม่เรียบ เสียเวลาช่วงเช้าไปโดยเปล่าประโยชน์
          </p>
        </div>

        <blockquote className="reveal mt-5 border-l-2 border-amber pl-4 text-[18px] leading-snug font-semibold text-navy">
          “รีดจบใน 1 นาที แล้วเอาเวลา 19 นาทีที่เหลือไปกินกาแฟหรือทำอย่างอื่นดีกว่า”
        </blockquote>

        <div className="reveal mt-5 space-y-4 text-[14.5px] leading-relaxed text-ink/90">
          <p>
            จากประสบการณ์ที่เคยทำงานในบริษัทผลิตเสื้อผ้าส่งออกให้แบรนด์ญี่ปุ่นระดับโลก
            ผมรู้ดีว่านวัตกรรมเนื้อผ้าทุกวันนี้ไปไกลมาก — เลยอยากเอาความรู้และมาตรฐานตรงนั้น
            มาทำเสื้อเชิ้ตคุณภาพเดียวกับแบรนด์ต่างประเทศดี ๆ ขึ้นมาสักตัวด้วยตัวเอง
          </p>
          <p>
            ตอนเริ่มต้นนี้ ผมยังไม่รู้ว่าจะมีคนที่คิดเหมือนผมมากน้อยแค่ไหน เลยยังไม่กล้าผลิตเยอะ
            ทำให้ต้นทุนต่อตัวค่อนข้างสูงกว่าแบรนด์ใหญ่ที่ผลิตจำนวนมากๆ — แต่ผมจะพยายาม
            ตัดค่าใช้จ่ายทุกอย่างที่ไม่จำเป็นออกเพื่อให้ได้ราคาที่ดีที่สุดเท่าที่จะทำได้ ในแบบที่คุณจับต้องได้จริง
          </p>
          <p>
            ล็อตแรกผมตั้งใจทำออกมา <span className="font-semibold text-ink">2 สีเบสิก</span> ที่ผู้ชายทุกคนควรมีติดตู้:
          </p>
          <ul className="space-y-1.5 pl-1">
            <li>
              <span className="font-medium text-ink">⚪ Pure White</span> — ทรงสวย ผ้าเรียบ รีดง่าย ยับยาก ใส่ได้ทุกวัน
            </li>
            <li>
              <span className="font-medium text-ink">🔵 Navy Blue</span> — เนี้ยบ ดูเท่แบบมีมิติ ไว้ใส่สลับไม่ให้น่าเบื่อ
            </li>
          </ul>
          <p>
            ถ้าคุณเคยเจอปัญหาเรื่องรีดผ้าแบบเดียวกับผม ผมอยากรบกวนช่วยตอบแบบสอบถามสั้นๆ ด้านล่างว่า
            ถ้าคุณจะซื้อคุณอยากได้สีไหน ไซส์อะไร เพื่อผมจะได้วางแผนจำนวนสั่งผลิตกับโรงงานได้อย่างถูกต้องครับ
          </p>
        </div>

        {/* คำสัญญา */}
        <div className="reveal mt-5 bg-steam border border-line p-4">
          <p className="text-[15.5px] leading-relaxed text-ink">
            ผมมี <span className="font-semibold text-navy">คูปองส่วนลด 20%</span> ให้เป็นการขอบคุณ
            ใช้ได้จริงเมื่อสินค้าผลิตเสร็จ และถ้าถึงตอนนั้นคุณเปลี่ยนใจไม่ซื้อ ก็ไม่เป็นไรเลยครับ
          </p>
          <p className="text-[14px] leading-relaxed text-ink mt-3">
            ผมสัญญาด้วยเกียรติของผมว่าเราจะ <span className="font-semibold">ไม่โทรตื๊อแบบคอลเซ็นเตอร์</span> — ผมจะติดต่อคุณทางไลน์หรือSMS
            <span className="font-semibold"> เพียงครั้งเดียว</span> ถ้าคุณไม่สนใจ เราก็จะไม่รบกวนอีก
          </p>
          <p className="text-[14px] text-muted mt-3 italic">— สุทัศน์(ทัช) Co-Founder</p>
        </div>

        <button
          onClick={() => openModal("founder-story")}
          className="btn btn-primary reveal mt-6 w-full h-14 text-[15px]"
        >
          ตอบแบบสอบถาม · รับคูปอง 20%
        </button>
      </section>

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
            6 ไอเท็ม · มิกซ์แอนด์แมตช์ได้ไม่จำกัด ตลอดทั้งสัปดาห์
          </span>
        </h2>

        <div className="reveal mt-5 mock aspect-[16/10]">
          <img src="/capsule.jpg" alt="เซ็ต Capsule Wardrobe" className="mock-img" />
        </div>

        {/* Product grid */}
        <div className="mt-7 grid grid-cols-2 gap-3.5">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="reveal bg-paper border border-line p-3">
              <div
                className="mock aspect-[3/4] cursor-pointer"
                onClick={() => openModal("card-image", p.id)}
              >
                <img src={`/${p.id}.jpg`} alt={p.en} className="mock-img" />
              </div>
              <h3 className="mt-2.5 text-[13px] font-medium leading-snug text-ink">{p.th}</h3>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[15px] font-semibold text-navy">฿{p.price}</span>
                <span className="text-[11px] text-muted line-through">฿{p.was}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.sizes.map((s) => (
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
                รับสิทธิ์ส่วนลด
              </button>
            </div>
          ))}
        </div>

        {/* Bundle */}
        <div className="reveal mt-4 bg-navy text-white p-5 relative overflow-hidden">
          <span className="absolute top-0 right-0 bg-amber text-ink text-[10px] font-bold tracking-wider uppercase px-2.5 py-1">คุ้มสุด</span>
          <p className="eyebrow" style={{ color: "#F59E0B" }}>Special Bundle Set</p>
          <h3 className="mt-2 text-[17px] font-semibold leading-snug text-white">เสื้อเชิ้ต 1 ตัว + กางเกงสแล็ค 1 ตัว</h3>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="display text-[30px] font-semibold text-white">฿{BUNDLE_PRICE.toLocaleString()}</span>
            <span className="text-[12px] text-white/80">รวมส่งฟรีทั่วประเทศ</span>
          </div>
          <button onClick={() => openModal("bundle", "bundle")} className="btn btn-amber mt-4 w-full h-12 text-[14px]">
            สนใจเซ็ต Bundle · ส่งฟรี
          </button>
        </div>

        <button onClick={() => openModal("catalog")} className="btn btn-primary reveal mt-4 w-full h-14 text-[15px]">
          ตอบแบบสอบถาม · รับสิทธิ์ส่วนลด 20%
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
              <div className="display text-[24px] font-semibold" style={{ color: "#F59E0B" }}>{s.k}</div>
              <p className="text-[11.5px] text-white/85 mt-1.5 leading-snug" dangerouslySetInnerHTML={{ __html: s.v }} />
            </div>
          ))}
        </div>
        <p className="reveal text-[12.5px] text-white/60 leading-relaxed mt-4">
          ตัดเย็บอย่างพิถีพิถันด้วยผ้าเกรดโรงงานส่งออก คัดเนื้อผ้าและควบคุมงานเย็บทุกขั้นตอน เพื่อให้ได้ทรงที่เนี้ยบและใส่ทน
        </p>

        <div className="reveal mt-6 mock aspect-[16/10]" style={{ borderColor: "rgba(255,255,255,.12)" }}>
          <img src="/lifestyle.jpg" alt="ลุคคนทำงาน" className="mock-img" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 py-8 bg-navy text-white/70">
        <div className="brandmark text-[13px] font-semibold text-white tracking-[.14em]">FORM8</div>
        <p className="text-[12px] mt-2 leading-relaxed">พรีออเดอร์ล็อตแรกจำนวนจำกัด 200 ชุด · คาดพร้อมจัดส่งภายใน 2–3 สัปดาห์</p>
        <p className="text-[11px] mt-4 text-white/40">© 2025 FORM8 · Easy Iron Series.</p>
        <a href="/privacy" className="text-[11px] text-white/60 underline mt-2 inline-block">
          นโยบายความเป็นส่วนตัว
        </a>
        <div className="h-24" />
      </footer>

      {/* STICKY BAR */}
      <div className={`sticky-bar ${stickyShown && !modalOpen ? "show" : ""}`}>
        <div className="bg-ink text-white flex items-stretch border-t border-white/10">
          <div className="flex-1 px-4 py-2.5 flex flex-col justify-center">
            <span className="text-[10px] tracking-wider uppercase text-amber">โปรเปิดตัว</span>
            <span className="text-[14px] font-semibold leading-tight">ลด 20% · เหลือ ฿690</span>
          </div>
          <button onClick={() => openModal("sticky")} className="btn btn-amber px-5 text-[14px] rounded-none">
            ตอบแบบสอบถาม
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
