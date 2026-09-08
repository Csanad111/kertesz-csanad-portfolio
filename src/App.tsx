import { useState, useRef, useEffect } from "react";

export interface LightboxItem {
  src: string;
  alt: string;
  title?: string;
  tag?: string;
  desc?: string;
}

function LightboxModal({
  item,
  onClose,
}: {
  item: LightboxItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#1A1918]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 cursor-zoom-out animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center cursor-default bg-[#262523] border border-[#44423E] shadow-2xl overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 bg-[#1F1E1C] border-b border-[#3E3C38] text-[11px] font-mono text-[#F7F5F0]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#6B7FA3]" />
            <span className="text-[#A8B5CC] uppercase tracking-wider">
              {item.tag || "NAGYÍTOTT NÉZET"}
            </span>
            <span className="text-[#555] hidden sm:inline">/</span>
            <span className="text-[#DDD9D0] truncate max-w-xs sm:max-w-md hidden sm:inline">
              {item.title || item.alt}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#33312E] hover:bg-[#4A4844] text-[#F7F5F0] transition-colors cursor-pointer flex items-center gap-2 uppercase tracking-wider text-[11px] border border-[#4E4C47]"
          >
            <span>Bezárás</span>
            <span className="text-[#A8B5CC] text-[10px]">[ESC]</span>
          </button>
        </div>

        {/* Scaled Image Display Area */}
        <div className="relative w-full flex-1 flex items-center justify-center p-3 sm:p-6 bg-[#141312] overflow-hidden max-h-[calc(92vh-105px)]">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-xs shadow-2xl"
          />
        </div>

        {/* Bottom Caption Bar */}
        <div className="w-full px-4 sm:px-6 py-3 bg-[#1F1E1C] border-t border-[#3E3C38] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex flex-col">
            <span className="text-[#F7F5F0] font-medium text-sm">
              {item.title || item.alt}
            </span>
            {item.desc && (
              <span className="text-[11px] text-[#A8B5CC] font-light mt-0.5">
                {item.desc}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#7E8B9E] shrink-0 font-mono">
            Kattints a háttérre vagy az ESC-re a bezáráshoz
          </span>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E8E4DC] py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        <a
          href="#"
          className="group flex items-center gap-3 text-sm tracking-tight text-[#2C2B29] font-medium shrink-0"
        >
          <span className="w-2 h-2 bg-[#2C2B29] group-hover:bg-[#6B7FA3] transition-colors" />
          <span>Kertész Csanád</span>
          <span className="hidden sm:inline-block text-xs font-normal text-[#6B7FA3] tracking-normal">
            / Portfolio
          </span>
        </a>

        <div className="flex items-center gap-4 lg:gap-8 text-xs tracking-wide uppercase">
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[#4A4845]">
            <a
              href="#strategy"
              className="hover:text-[#6B7FA3] transition-colors"
            >
              01 Stratégia
            </a>
            <a
              href="#systems"
              className="hover:text-[#6B7FA3] transition-colors"
            >
              02 Rendszerek
            </a>
            <a
              href="#certificates"
              className="hover:text-[#6B7FA3] transition-colors"
            >
              03 Minősítések
            </a>
            <a
              href="#sound"
              className="hover:text-[#6B7FA3] transition-colors"
            >
              04 Hangdizájn
            </a>
            <a
              href="#contact"
              className="hover:text-[#6B7FA3] transition-colors"
            >
              05 Kapcsolat
            </a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium text-[#2C2B29] bg-[#E8E4DC]/60 hover:bg-[#E8E4DC] transition-colors border border-[#DDD9D0] shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7FA3] animate-pulse" />
            <span className="hidden sm:inline">12 hetes gyakorlat (2026 ősz / tél)</span>
            <span className="sm:hidden">Gyakorlat 2026 ősz/tél</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({
  onOpenLightbox,
}: {
  onOpenLightbox?: (item: LightboxItem) => void;
}) {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("hu-HU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Budapest",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 sm:pt-40 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Editorial eyebrow index */}
      <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-6 mb-12 sm:mb-16">
        <div className="flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-[#6B7FA3] font-medium">
          <span>Portfólió</span>
          <span className="text-[#DDD9D0]">/</span>
          <span>Vol. 2026</span>
          <span className="text-[#DDD9D0] hidden sm:inline">/</span>
          <span className="hidden sm:inline text-[#2C2B29]">Pilisvörösvár &amp; Budapest</span>
        </div>
        <div className="text-[11px] font-mono text-[#8E9EBA] flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B7FA3] animate-pulse" />
          <span>PILISVÖRÖSVÁR · BUDAPEST {timeStr && `[${timeStr} CET]`}</span>
        </div>
      </div>

      {/* Main hero grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end my-auto">
        {/* Typographic statement block */}
        <div className="lg:col-span-8 flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-[#6B7FA3]" />
            <p className="text-xs font-mono tracking-[0.22em] uppercase text-[#6B7FA3]">
              Creative Strategist · Digital Product Designer · Producer
            </p>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-light tracking-[-0.04em] leading-[0.98] text-[#2C2B29] mb-8">
            Kertész Csanád
            <span className="block mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#2C2B29]">
              Kreatív Stratéga
            </span>
            <span className="block mt-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic font-light text-[#6B7FA3]">
              &amp; Digitális Terméktervező
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#4A4845] max-w-2xl">
            A közgazdasági gondolkodás, a felhasználói élmény és a digitális kultúra
            metszéspontján dolgozom. Nem elméletben beszélek a figyelemről: 25K+ fős
            organikus követőtáborral és milliós nézettségekkel tesztelem élesben,
            mi mozgatja meg az embereket — a briefektől a kész kódokig.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-[#E8E4DC]">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[#2C2B29] text-[#F7F5F0] text-xs font-medium tracking-wider uppercase hover:bg-[#6B7FA3] transition-colors"
            >
              12 hetes gyakorlat (2026 ősz / tél) →
            </a>
            <a
              href="/cv/kertesz-csanad-oneletrajz.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#2C2B29] text-xs font-medium tracking-wider uppercase text-[#2C2B29] hover:bg-[#2C2B29] hover:text-[#F7F5F0] transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Önéletrajz (CV) letöltése</span>
            </a>
            <a
              href="#sound"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#4A4845] hover:text-[#2C2B29] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#6B7FA3] animate-ping" />
              <span>Hallgass bele: Pesti zápor ↓</span>
            </a>
          </div>
        </div>

        {/* Clean Editorial Portrait Container — IMG_7609 with Lightbox */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
          <div
            onClick={() =>
              onOpenLightbox?.({
                src: "/images/csanad-portrait.jpg",
                alt: "Kertész Csanád portré — IMG_7609",
                title: "Kertész Csanád — Kreatív Stratéga & Digitális Terméktervező",
                tag: "PORTRÉ / PILISVÖRÖSVÁR & BUDAPEST",
                desc: "IMG_7609 — BME gazdasági alapok, digitális tartalomkészítés és felhasználói felületek tervezése.",
              })
            }
            title="Kattints a portré nagyításához"
            className="w-full max-w-xs aspect-[3/4] bg-[#EAE6DE] border border-[#DDD9D0] relative flex flex-col justify-between overflow-hidden group shadow-xs cursor-zoom-in select-none"
          >
            {/* Real Editorial Portrait Image (IMG_7609) */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/csanad-portrait.jpg"
                alt="Kertész Csanád portré — IMG_7609"
                style={{ objectPosition: "50% 62%" }}
                className="w-full h-full object-cover saturate-[0.95] contrast-[1.02] group-hover:contrast-[1.12] group-hover:scale-105 transition-all duration-700 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/IMG_7609.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2B29]/35 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Top grid crosshair markers */}
            <div className="relative z-10 flex justify-between items-start text-[10px] font-mono text-[#F7F5F0] bg-[#2C2B29]/70 backdrop-blur-xs px-3 py-1.5 select-none">
              <span>KC / PILISVÖRÖSVÁR &amp; BP</span>
              <span className="flex items-center gap-1.5 text-[#A8B5CC] group-hover:text-[#F7F5F0]">
                <span>⤢ NAGYÍTÁS</span>
              </span>
            </div>

            {/* Bottom details label */}
            <div className="relative z-10 bg-[#2C2B29]/85 backdrop-blur-xs text-[#F7F5F0] p-3 border-t border-[#DDD9D0]/20 flex justify-between items-center text-[10px] font-mono">
              <span>Kertész Csanád</span>
              <span className="text-[#A8B5CC]">KREATÍV STRATÉGA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer guideline ticker */}
      <div className="mt-16 pt-6 border-t border-[#E8E4DC] flex flex-wrap justify-between items-center text-[11px] font-mono text-[#8E9EBA]">
        <div className="flex items-center gap-6">
          <span>00 / BEMUTATKOZÁS</span>
          <span className="hidden sm:inline">SVÁJCI TIPOGRÁFIA</span>
          <span className="hidden md:inline text-[#2C2B29]">SAJÁT GYÁRTÁSÚ ZENÉK</span>
        </div>
        <div className="flex items-center gap-4">
          <span>GÖRGESS LEJJEBB</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}

function StrategyAndInsight({
  onOpenLightbox,
}: {
  onOpenLightbox?: (item: LightboxItem) => void;
}) {
  const [strategyIndex, setStrategyIndex] = useState(0);

  const strategySlides = [
    {
      src: "/images/bonsai-fa.jpg",
      tag: "01 / VALÓDI BONSAI",
      badge: "VALÓDI BONSAI (IMG_9221)",
      title: "01. Türelem és arányok",
      desc: "Valódi olajfa bonsai — a türelem és a tudatos arányérzék iskolája. Minden felesleges ág lemetszése a lényeget és a tartós formát erősíti.",
      lightboxTitle: "Valódi olajfa bonsai — Türelem, ritkítás és formai fegyelem",
      lightboxDesc: "Saját fotó (IMG_9221). A sallangmentes arányok és a növekedési ritmus analógiája.",
    },
    {
      src: "/images/en-es-a-bonsai.jpg",
      tag: "02 / KÍSÉRLETEZÉS & HUMOR",
      badge: "ÖNAZONOS HUMOR",
      title: "02. Csanád és a faág",
      desc: "Csanád és a faág — játékos analógia az alkotói folyamatról: a precíz stratégiai fegyelem és a közvetlen, emberi hang kiválóan megfér egymással.",
      lightboxTitle: "Csanád és a faág — Önreflexív alkotói folyamat és humor",
      lightboxDesc: "Önazonos, közvetlen pillanat: komolyan venni a munkát, de sosem venni túl komolyan magunkat.",
    },
  ];

  const currentSlide = strategySlides[strategyIndex];

  return (
    <section
      id="strategy"
      className="py-32 sm:py-44 border-t border-[#E8E4DC] max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full"
    >
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-24">
        <div className="lg:col-span-5">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#6B7FA3] mb-4">
            01 — Stratégia &amp; Tartalom
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#2C2B29] leading-[1.08]">
            Kulturális érzék &amp;
            <span className="block font-medium">tudatos tartalomépítés</span>
          </h2>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-end">
          <div className="h-px w-full bg-[#E8E4DC] mb-8" />
          <p className="text-xs font-mono tracking-[0.15em] uppercase text-[#8E9EBA]">
            Organikus figyelem · Közösségépítés · Hosszú távú fegyelem
          </p>
        </div>
      </div>

      {/* Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Narrative & Stats column */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between">
          <div className="space-y-6 text-[#4A4845] font-light leading-[1.85] text-base sm:text-lg">
            <p className="text-[#2C2B29] font-normal text-xl sm:text-2xl leading-snug tracking-tight">
              Ahelyett, hogy a pillanatnyi lájkok után kapkodnék, szeretem megérteni a mélyebb okokat:
              miért kattintanak az emberek, és hogyan építhetünk olyat, ami meg is marad.
            </p>
            <p>
              A növények formálása nálam a türelem és az arányérzék iskolája. Egy ág helyes
              alakításához hónapok kellenek, és minden metszést alapos megfigyelés előz meg.
              Ugyanez a szemlélet vezet a digitális tartalmaknál is: ahelyett, hogy felesleges
              zajt generálnék, igyekszem a lényegre fókuszálni.
            </p>
            <p>
              A TikTok-csatornámon (@csibo01) nem a véletlenre bízom az elérést. Kísérletezem a
              ritmussal, a nézők figyelmével és azzal a közvetlen stílussal, ami valódi közösséget
              teremt. A 25 ezer követő és a milliós nézettség számomra azt bizonyítja, hogy a jó
              stratégia és a természetes, emberi hang kiválóan működik együtt.
            </p>
          </div>

          {/* Stats Callout Box */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-[#E8E4DC] grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border-l-2 border-[#2C2B29] pl-4">
              <span className="block text-3xl sm:text-4xl font-light tracking-tight text-[#2C2B29]">
                25K+
              </span>
              <span className="block text-[11px] font-mono tracking-wider uppercase text-[#6B7FA3] mt-1">
                Közösség
              </span>
              <span className="text-[10px] text-[#666461] mt-0.5 block font-mono">
                Organikus követők a TikTokon
              </span>
            </div>

            <div className="border-l-2 border-[#6B7FA3] pl-4">
              <span className="block text-3xl sm:text-4xl font-light tracking-tight text-[#2C2B29]">
                200K–1M+
              </span>
              <span className="block text-[11px] font-mono tracking-wider uppercase text-[#6B7FA3] mt-1">
                Egy-egy videó elérése
              </span>
              <span className="text-[10px] text-[#666461] mt-0.5 block font-mono">
                Organikus csúcsok, hirdetés nélkül
              </span>
            </div>

            <div className="border-l-2 border-[#8E9EBA] pl-4">
              <a
                href="https://www.tiktok.com/@csibo01"
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <span className="block text-xl sm:text-2xl font-mono font-medium tracking-tight text-[#2C2B29] group-hover:text-[#6B7FA3] transition-colors">
                  @csibo01
                </span>
                <span className="block text-[11px] font-mono tracking-wider uppercase text-[#6B7FA3] mt-1">
                  TikTok profil ↗
                </span>
                <span className="text-[10px] text-[#666461] mt-0.5 block font-mono">
                  Kreatív tesztlabor
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* 2-Slide Interactive Bonsai Switcher (Valódi Bonsai -> Csanád & Faág) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center lg:items-end w-full mt-6 lg:mt-0">
          <figure className="relative w-full max-w-[290px] sm:max-w-[320px] lg:max-w-[340px] bg-[#EAE6DE] border border-[#DDD9D0] overflow-hidden group shadow-xs">
            {/* Top Bar with Tag and Lightbox trigger */}
            <div className="relative z-10 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-[#F7F5F0] bg-[#2C2B29]/85 backdrop-blur-xs px-3.5 py-1.5 border-b border-[#DDD9D0]/20 select-none">
              <span className="truncate">{currentSlide.tag}</span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLightbox?.({
                      src: currentSlide.src,
                      alt: currentSlide.title,
                      title: currentSlide.lightboxTitle,
                      tag: currentSlide.tag,
                      desc: currentSlide.lightboxDesc,
                    });
                  }}
                  className="px-1.5 py-0.5 bg-[#383734] hover:bg-[#4D4C48] text-[#DDD9D0] hover:text-[#F7F5F0] transition-colors cursor-pointer flex items-center gap-1 text-[9px]"
                  title="Kép nagyítása"
                >
                  <span>⤢ Nagyítás</span>
                </button>
                <span className="text-[#A8B5CC] font-mono">
                  {strategyIndex + 1}/2
                </span>
              </div>
            </div>

            {/* Clickable Image Slide Area */}
            <div
              onClick={() =>
                setStrategyIndex((prev) => (prev + 1) % strategySlides.length)
              }
              title="Kattints a kép váltásához"
              className="aspect-[4/5] w-full overflow-hidden relative cursor-pointer group/slide select-none bg-[#E2DED5]"
            >
              <img
                key={currentSlide.src}
                src={currentSlide.src}
                alt={currentSlide.title}
                className="w-full h-full object-cover saturate-[0.98] contrast-[1.02] group-hover/slide:contrast-[1.08] group-hover/slide:scale-[1.03] transition-all duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2B29]/40 via-transparent to-transparent opacity-40 group-hover/slide:opacity-20 transition-opacity duration-300 pointer-events-none" />

              {/* Prev / Next Arrows */}
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setStrategyIndex((prev) => (prev === 0 ? 1 : 0));
                  }}
                  aria-label="Előző kép"
                  className="w-7 h-7 rounded-full bg-[#2C2B29]/75 text-[#F7F5F0] flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-[#2C2B29] transition-all pointer-events-auto cursor-pointer shadow-sm text-xs font-mono"
                >
                  ←
                </button>
              </div>

              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setStrategyIndex((prev) => (prev + 1) % 2);
                  }}
                  aria-label="Következő kép"
                  className="w-7 h-7 rounded-full bg-[#2C2B29]/75 text-[#F7F5F0] flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-[#2C2B29] transition-all pointer-events-auto cursor-pointer shadow-sm text-xs font-mono"
                >
                  →
                </button>
              </div>

              {/* Hover Advance Hint Badge */}
              <div className="absolute bottom-2 left-2 right-2 bg-[#2C2B29]/80 backdrop-blur-xs text-[#F7F5F0] py-1 px-2.5 text-[10px] font-mono flex items-center justify-between pointer-events-none opacity-90 group-hover/slide:opacity-100 transition-opacity">
                <span>{strategyIndex === 0 ? "Kattints: 2. Csanád és a faág" : "Kattints: 1. Valódi bonsai"}</span>
                <span className="text-[#A8B5CC]">→</span>
              </div>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="grid grid-cols-2 border-t border-[#DDD9D0] bg-[#ECE8DF] text-[10px] font-mono">
              <button
                type="button"
                onClick={() => setStrategyIndex(0)}
                className={`py-2 px-2 text-center transition-colors cursor-pointer border-r border-[#DDD9D0] ${
                  strategyIndex === 0
                    ? "bg-[#2C2B29] text-[#F7F5F0] font-medium"
                    : "text-[#666461] hover:bg-[#DDD9D0] hover:text-[#2C2B29]"
                }`}
              >
                01 Valódi Bonsai
              </button>
              <button
                type="button"
                onClick={() => setStrategyIndex(1)}
                className={`py-2 px-2 text-center transition-colors cursor-pointer ${
                  strategyIndex === 1
                    ? "bg-[#2C2B29] text-[#F7F5F0] font-medium"
                    : "text-[#666461] hover:bg-[#DDD9D0] hover:text-[#2C2B29]"
                }`}
              >
                02 Csanád &amp; Faág
              </button>
            </div>

            {/* Captions */}
            <figcaption className="p-4 sm:p-5 bg-[#F7F5F0] border-t border-[#DDD9D0] flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-xs font-medium tracking-wide uppercase text-[#2C2B29]">
                  {currentSlide.title}
                </p>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#6B7FA3] border border-[#DDD9D0] bg-[#E8E4DC]/60 px-2 py-0.5 whitespace-nowrap">
                  {currentSlide.badge}
                </span>
              </div>
              <p className="text-[11px] sm:text-[12px] text-[#666461] font-light leading-snug">
                {currentSlide.desc}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function SystemDesign({
  onOpenLightbox,
}: {
  onOpenLightbox?: (item: LightboxItem) => void;
}) {
  const [isGrandifloraLive, setIsGrandifloraLive] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [spotScreenIndex, setSpotScreenIndex] = useState(0);

  const spotScreens = [
    {
      title: "Budapest Hőtérkép",
      label: "Hőtérkép",
      tag: "01 / ÁTTEKINTÉS",
      src: "/images/spot-cover.png",
      fit: "cover",
      desc: "Városi hőtérkép: hol gyűlnek a barátok a budapesti éjszakában"
    },
    {
      title: "Mag Pub Helyszínlap",
      label: "Mag Pub Lap",
      tag: "02 / ITT TALI? FUNKCIÓ",
      src: "/images/spot-screen-venue-detail.png",
      fit: "contain",
      desc: "Közösségi jelenlét: '3 barátod hesszel itt' és azonnali 'Itt tali?' gomb"
    },
    {
      title: "Spotok Lista",
      label: "Helyszínlista",
      tag: "03 / HELYSZÍNKERESŐ",
      src: "/images/spot-screen-venues.png",
      fit: "contain",
      desc: "Közeli beülős helyek távolság és árfekvés szerint (Bercsényi u., Karinthy út)"
    },
    {
      title: "Barátok Közelsége",
      label: "Barátok",
      tag: "04 / KÖZELSÉGMÉRŐ",
      src: "/images/spot-screen-friends.png",
      fit: "contain",
      desc: "Spontán találkozások: valós idejű távolságmérés ismerősökhöz"
    }
  ];

  const currentSpot = spotScreens[spotScreenIndex];

  return (
    <section
      id="systems"
      className="py-32 sm:py-44 border-t border-[#E8E4DC] max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full"
    >
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-24">
        <div className="lg:col-span-5">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#6B7FA3] mb-4">
            02 — Rendszertervezés &amp; UX
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#2C2B29] leading-[1.08]">
            Kiválasztott
            <span className="block font-medium">digitális munkák</span>
          </h2>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-end">
          <div className="h-px w-full bg-[#E8E4DC] mb-8" />
          <p className="text-base font-light text-[#4A4845] max-w-xl">
            Két esettanulmány arról, hogyan közelítem meg a tervezést: a valós
            probléma megértésétől a letisztult felhasználói élményen át a működő kódokig.
          </p>
        </div>
      </div>

      {/* Borderless Clean Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Project Card 01: Spot App */}
        <article className="group flex flex-col justify-between bg-transparent">
          <div>
            {/* Visual Container with Interactive Wireframe Switcher */}
            <div
              onClick={() => setSpotScreenIndex((prev) => (prev + 1) % spotScreens.length)}
              className="relative aspect-[16/10] bg-[#ECE8DF] border border-[#DDD9D0] overflow-hidden mb-8 transition-colors duration-300 group-hover:border-[#6B7FA3] flex flex-col justify-between cursor-pointer select-none group/spot"
            >
              {/* Screen Image */}
              <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 overflow-hidden bg-[#ECE8DF]">
                {currentSpot.fit === "cover" ? (
                  <img
                    src={currentSpot.src}
                    alt={currentSpot.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/spot:scale-[1.03]"
                  />
                ) : (
                  <div className="relative h-full aspect-[9/19] max-h-[92%] bg-white rounded-2xl shadow-xl overflow-hidden border border-[#DDD9D0] transition-transform duration-500 ease-out group-hover/spot:scale-[1.04]">
                    <img
                      src={currentSpot.src}
                      alt={currentSpot.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Hover overlay indicator */}
              <div className="absolute inset-0 bg-[#2C2B29]/20 opacity-0 group-hover/spot:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                <span className="px-4 py-2 bg-[#2C2B29] text-[#F7F5F0] text-xs font-mono tracking-wider uppercase shadow-md flex items-center gap-2">
                  <span>Következő képernyő ({spotScreenIndex + 1} / {spotScreens.length})</span>
                  <span>→</span>
                </span>
              </div>

              {/* Top tag banner with Lightbox zoom button */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-[#F7F5F0] bg-[#2C2B29]/80 backdrop-blur-xs px-3 py-1.5 z-10 select-none">
                <span>01. ESET / UX ARCHITEKTÚRA</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#A8B5CC] hidden sm:inline">{currentSpot.tag}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox?.({
                        src: currentSpot.src,
                        alt: currentSpot.title,
                        title: `SpOt App — ${currentSpot.title}`,
                        tag: currentSpot.tag,
                        desc: currentSpot.desc,
                      });
                    }}
                    className="px-2 py-0.5 bg-[#383734] hover:bg-[#4D4C48] text-[#DDD9D0] hover:text-[#F7F5F0] transition-colors cursor-pointer text-[9px] flex items-center gap-1 uppercase tracking-wider"
                    title="Kép nagyítása"
                  >
                    <span>⤢ Nagyítás</span>
                  </button>
                </div>
              </div>

              {/* Bottom detail banner */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-[#F7F5F0] bg-[#2C2B29]/90 backdrop-blur-xs px-3 py-1.5 pointer-events-none z-10">
                <span className="truncate text-[#A8B5CC] max-w-[220px] sm:max-w-none">
                  {currentSpot.desc}
                </span>
                <span className="text-[#F7F5F0] ml-2 shrink-0 font-medium">
                  {spotScreenIndex + 1} / {spotScreens.length} KATTINTS ↺
                </span>
              </div>
            </div>

            {/* Interactive Wireframe Screen Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {spotScreens.map((s, idx) => (
                <button
                  key={s.label}
                  onClick={() => setSpotScreenIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                    spotScreenIndex === idx
                      ? "bg-[#2C2B29] text-[#F7F5F0]"
                      : "bg-[#EAE6DE] text-[#666461] hover:bg-[#DDD9D0] hover:text-[#2C2B29]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Editorial Metadata */}
            <div className="flex items-baseline justify-between border-b border-[#E8E4DC] pb-3 mb-4">
              <h3 className="text-2xl font-light text-[#2C2B29] tracking-tight">
                SpOt App
              </h3>
              <span className="text-xs font-mono uppercase text-[#6B7FA3]">
                Mobilapp koncepció &amp; UX
              </span>
            </div>

            <p className="text-sm sm:text-base font-light text-[#4A4845] leading-relaxed mb-6">
              Mobilapp-koncepció, ami a budapesti éjszakai élet örök kérdésére válaszol:
              „Hol vagytok most, hol érdemes találkozni?” Valós budapesti lokációkkal
              (Mag Pub, Bercsényi utca), spontán „Itt tali?” funkcióval és távolságméréssel —
              felhasználói kutatástól a kattintható Figma wireframe-ekig.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8E4DC]">
            {["UX Kutatás", "Budapesti Helyszínek", "Figma Wireframe-ek", "Közösségi Élet", "Prototípus"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-1 bg-[#EAE6DE] text-[#4A4845]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </article>

        {/* Project Card 02: Grandiflora Kert */}
        <article className="group flex flex-col justify-between bg-transparent">
          <div>
            {/* Visual Container / Interactive Showcase */}
            <div className="relative aspect-[16/10] bg-[#ECE8DF] border border-[#DDD9D0] overflow-hidden mb-8 transition-colors duration-300 group-hover:border-[#6B7FA3] flex flex-col justify-between">
              {isGrandifloraLive ? (
                <div className="relative w-full h-full flex flex-col bg-[#1A1918]">
                  {/* Top Bar inside embedded live view */}
                  <div className="flex items-center justify-between px-3 py-2 bg-[#2C2B29] text-[#F7F5F0] text-[10px] font-mono border-b border-[#44423E] z-10 select-none">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="truncate max-w-[180px] sm:max-w-none text-[#F7F5F0]">
                        grandiflora-zold-weboldal.vercel.app
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://grandiflora-zold-weboldal.vercel.app"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#6B7FA3] hover:text-[#F7F5F0] underline"
                      >
                        Új lapon ↗
                      </a>
                      <button
                        onClick={() => {
                          setIsGrandifloraLive(false);
                          setIframeLoaded(false);
                        }}
                        className="px-2 py-0.5 bg-[#383734] hover:bg-[#4D4C48] text-[#F7F5F0] transition-colors cursor-pointer"
                      >
                        [Vissza a képhez]
                      </button>
                    </div>
                  </div>

                  {/* Embedded Iframe */}
                  <div className="relative flex-1 w-full h-full bg-[#111]">
                    {!iframeLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#2C2B29] text-xs font-mono text-[#A8B5CC] gap-2.5 z-0">
                        <span className="w-2 h-2 rounded-full bg-[#6B7FA3] animate-ping" />
                        <span>Weboldal betöltése (Vercel)...</span>
                      </div>
                    )}
                    <iframe
                      src="https://grandiflora-zold-weboldal.vercel.app"
                      title="Grandiflora Kert élő weboldal"
                      onLoad={() => setIframeLoaded(true)}
                      className="w-full h-full border-0 relative z-10"
                    />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setIsGrandifloraLive(true)}
                  className="relative w-full h-full cursor-pointer overflow-hidden group/cover"
                >
                  {/* Real Screenshot Cover */}
                  <img
                    src="/images/grandiflora-cover.png"
                    alt="Grandiflora Kert élő weboldal borítókép"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/cover:scale-105"
                  />

                  {/* Dark Gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2B29]/90 via-[#2C2B29]/30 to-transparent opacity-80 group-hover/cover:opacity-90 transition-opacity duration-300" />

                  {/* Top tags */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-[#F7F5F0] bg-[#2C2B29]/80 backdrop-blur-xs px-3 py-1.5 z-10 select-none">
                    <span>02. ESET / FRONT-END</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLightbox?.({
                            src: "/images/grandiflora-cover.png",
                            alt: "Grandiflora Kert élő weboldal borítókép",
                            title: "Grandiflora Kert — Reszponzív Tájépítészeti Weboldal",
                            tag: "02. ESET / FRONT-END REACT",
                            desc: "grandiflora-zold-weboldal.vercel.app — React & Vite alapú prémium kert- és tájépítészeti bemutató oldal.",
                          });
                        }}
                        className="px-2 py-0.5 bg-[#383734] hover:bg-[#4D4C48] text-[#DDD9D0] hover:text-[#F7F5F0] transition-colors cursor-pointer text-[9px] flex items-center gap-1 uppercase tracking-wider"
                        title="Kép nagyítása"
                      >
                        <span>⤢ Nagyítás</span>
                      </button>
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ÉLES PROJEKT
                      </span>
                    </div>
                  </div>

                  {/* Center CTA button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
                    <div className="px-5 py-2.5 bg-[#F7F5F0] text-[#2C2B29] text-xs font-mono tracking-wider uppercase font-medium shadow-xl group-hover/cover:bg-[#6B7FA3] group-hover/cover:text-[#F7F5F0] transition-colors flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span>Kattints az oldal betöltéséhez</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#DDD9D0] bg-[#2C2B29]/70 px-2 py-0.5 backdrop-blur-xs">
                      vagy nyisd meg új lapon ↗
                    </span>
                  </div>

                  {/* Bottom details banner */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-[#F7F5F0] bg-[#2C2B29]/90 backdrop-blur-xs px-3 py-1.5 select-none">
                    <span className="truncate text-[#A8B5CC]">
                      grandiflora-zold-weboldal.vercel.app
                    </span>
                    <span className="text-[#F7F5F0] font-medium ml-2 shrink-0">
                      INTERAKTÍV BETÖLTÉS ↗
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Editorial Metadata */}
            <div className="flex items-baseline justify-between border-b border-[#E8E4DC] pb-3 mb-4">
              <h3 className="text-2xl font-light text-[#2C2B29] tracking-tight">
                Grandiflora Kert
              </h3>
              <a
                href="https://grandiflora-zold-weboldal.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono uppercase text-[#6B7FA3] hover:text-[#2C2B29] flex items-center gap-1 transition-colors"
              >
                <span>grandiflora-zold-weboldal.vercel.app</span>
                <span>↗</span>
              </a>
            </div>

            <p className="text-sm sm:text-base font-light text-[#4A4845] leading-relaxed mb-6">
              Egyedi tervezésű és fejlesztésű weboldal egy prémium kert- és tájépítészeti stúdió számára.
              Cél egy letisztult, fotóközpontú élmény megteremtése volt, ami hűen tükrözi a természetes
              anyagokat. React és modern CSS alapokon épült, azonnal betöltődik és élesben fut a Vercelen.
            </p>

            {/* Direct Action Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button
                onClick={() => {
                  setIsGrandifloraLive(!isGrandifloraLive);
                  if (isGrandifloraLive) setIframeLoaded(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C2B29] text-[#F7F5F0] text-xs font-mono tracking-wider uppercase hover:bg-[#6B7FA3] transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>
                  {isGrandifloraLive ? "Képernyőkép mutatása" : "Interaktív nézet betöltése"}
                </span>
              </button>

              <a
                href="https://grandiflora-zold-weboldal.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6B7FA3] hover:text-[#2C2B29] uppercase tracking-wider underline underline-offset-4"
              >
                <span>Élő oldal új lapon</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8E4DC]">
            {["React", "Vite", "Front-End Kód", "Éles Vercel Projekt", "Reszponzív UI"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-1 bg-[#EAE6DE] text-[#4A4845]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

function Certificates() {
  const certs = [
    {
      index: "01",
      title: "Google UX Design Professional Certificate",
      category: "UX KUTATÁS & TERVEZÉS",
      issuer: "Google / Coursera",
      field: "Felhasználói élmény & Wireframe-ek",
      desc: "Mélyinterjúk, empátia-térképezés és információs architektúra. Megtanított arra, hogyan kell a feltételezéseket valós felhasználói visszajelzésekkel tesztelni.",
      file: "/certificates/google-ux-design.pdf",
    },
    {
      index: "02",
      title: "Meta Front-End Developer Professional Certificate",
      category: "FEJLESZTÉS & REACT",
      issuer: "Meta / Coursera",
      field: "Webes terméképítés & Kód",
      desc: "Gyakorlati kódolás: React, modern CSS és JavaScript. Stratégaként azért hasznos, mert pontosan látom, hogyan valósítható meg egy ötlet a fejlesztői oldalon.",
      file: "/certificates/meta-front-end-developer.pdf",
    },
    {
      index: "03",
      title: "C1 Felsőfokú Angol Nyelvvizsga",
      category: "NEMZETKÖZI TÁRGYALÁSI SZINT",
      issuer: "Állami Akkreditáció",
      field: "Tárgyalási & Szakmai Angol",
      desc: "Magabiztos felsőfok: globális trendek primer forrású kutatása, nemzetközi briefek feldolgozása és anyanyelvi szintű prezentáció.",
      file: "/certificates/c1-angol-nyelvvizsga.pdf",
    },
    {
      index: "04",
      title: "Kertész Csanád — Szakmai Önéletrajz (CV)",
      category: "TELJES DOSSZIÉ",
      issuer: "Kertész Csanád",
      field: "Tanulmányok & Tapasztalatok",
      desc: "BME gazdasági tanulmányok, stratégiai esettanulmányok, kreatív tapasztalatok és zenei referenciák egyetlen áttekinthető dokumentumban.",
      file: "/cv/kertesz-csanad-oneletrajz.pdf",
    },
  ];

  return (
    <section
      id="certificates"
      className="py-28 sm:py-36 border-t border-[#E8E4DC] max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full"
    >
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20">
        <div className="lg:col-span-5">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#6B7FA3] mb-4">
            03 — Minősítések &amp; Készségek
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#2C2B29] leading-[1.08]">
            Hivatalos bizonyítványok &amp;
            <span className="block font-medium">szakmai alapok</span>
          </h2>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-end">
          <div className="h-px w-full bg-[#E8E4DC] mb-8" />
          <p className="text-base font-light text-[#4A4845] max-w-xl">
            A jó stratégia nem légből kapott ötletelés: a valós felhasználói kutatás,
            a front-end megvalósíthatóság és a magabiztos angol tárgyalási készség adja a biztos hátteret.
          </p>
        </div>
      </div>

      {/* Swiss Editorial Index List */}
      <div className="border-t border-[#2C2B29]/20 divide-y divide-[#2C2B29]/15">
        {certs.map((c) => (
          <a
            key={c.index}
            href={c.file}
            target="_blank"
            rel="noreferrer"
            className="group block py-8 sm:py-10 transition-colors duration-200 hover:bg-[#2C2B29]/[0.02] -mx-4 px-4 sm:-mx-6 sm:px-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start sm:items-center">
              {/* Col 1: Index Number */}
              <div className="md:col-span-1">
                <span className="font-mono text-sm sm:text-base text-[#6B7FA3] group-hover:text-[#2C2B29] transition-colors font-medium">
                  {c.index}
                </span>
              </div>

              {/* Col 2: Title & Description */}
              <div className="md:col-span-6">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E9EBA]">
                    {c.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-[#2C2B29] group-hover:text-[#6B7FA3] transition-colors">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-[#666461] font-light leading-relaxed max-w-xl">
                  {c.desc}
                </p>
              </div>

              {/* Col 3: Issuer & Field */}
              <div className="md:col-span-3">
                <span className="text-xs font-mono text-[#2C2B29] block">
                  {c.issuer}
                </span>
                <span className="text-[11px] font-mono text-[#8E9EBA] mt-0.5 block">
                  {c.field}
                </span>
              </div>

              {/* Col 4: Action button */}
              <div className="md:col-span-2 flex items-center md:justify-end">
                <span className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#2C2B29] group-hover:text-[#6B7FA3] font-medium transition-colors">
                  <span>Megnyitás (PDF)</span>
                  <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
                    ↗
                  </span>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="border-b border-[#2C2B29]/20" />
    </section>
  );
}

function SoundDesign() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(158); // default ~2:38
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback simulation mode
          setIsPlaying(true);
        });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="sound"
      className="bg-[#22211F] text-[#F7F5F0] py-32 sm:py-44 border-t border-[#33322F] w-full"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-24">
          <div className="lg:col-span-5">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#6B7FA3] mb-4">
              04 — Zene &amp; Hangtervezés
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#F7F5F0] leading-[1.08]">
              A ritmus és a hangulat:
              <span className="block font-medium">Saját zenei produkciók</span>
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <div className="h-px w-full bg-[#383734] mb-8" />
            <p className="text-base font-light text-[#A8B5CC] leading-relaxed max-w-xl">
              A zene számomra a hangulatteremtés legközvetlenebb eszköze.
              A saját zenék komponálása megtanított a tempóra, az arányokra és arra,
              hogyan lehet letisztult elemekből emlékezetes élményt formálni.
            </p>
          </div>
        </div>

        {/* Minimalist Dark Audio Player Layout */}
        <div className="border border-[#383734] bg-[#2C2B29]/60 p-8 sm:p-12 lg:p-16">
          <audio
            ref={audioRef}
            preload="metadata"
          >
            <source src="/audio/pesti-zapor.wav" type="audio/wav" />
            <source src="/audio/pesti-zapor.mp3" type="audio/mpeg" />
          </audio>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Track Info */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#383734] pb-8 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-3 text-xs font-mono text-[#6B7FA3] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#6B7FA3] animate-pulse" />
                <span>SAJÁT ZENE · PRODUCER</span>
              </div>
              <h3 className="text-3xl font-light tracking-tight text-[#F7F5F0] mb-1">
                Pesti zápor
              </h3>
              <p className="text-xs font-mono text-[#8E9EBA] mb-2">
                Saját szerzemény · WAV 3 (24-bit 48kHz)
              </p>
              <p className="text-xs font-light text-[#A8B5CC] leading-relaxed mb-6">
                Késő esti, esős pesti séta hangulata: meleg analóg basszusok és elgondolkodtató ritmus.
                Teljes egészében FL Studio-ban írt és hangszerelt saját zene.
              </p>

              <div className="space-y-2 text-xs font-light text-[#A8B5CC]">
                <div className="flex justify-between border-b border-[#383734] py-1">
                  <span>Formátum</span>
                  <span className="font-mono text-[#F7F5F0]">WAV 3 / 24-bit 48kHz</span>
                </div>
                <div className="flex justify-between border-b border-[#383734] py-1">
                  <span>Műhely</span>
                  <span className="font-mono text-[#F7F5F0]">FL Studio · Budapest</span>
                </div>
                <div className="flex justify-between border-b border-[#383734] py-1">
                  <span>Hangulat</span>
                  <span className="font-mono text-[#F7F5F0]">Esős, városi, meditatív</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Állapot</span>
                  <span className="font-mono text-[#6B7FA3]">Teljes verzió</span>
                </div>
              </div>
            </div>

            {/* Waveform & Playback Controls */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-8">
              {/* Interactive Dynamic Waveform Visualizer */}
              <div className="space-y-3">
                <div className="flex items-end justify-between gap-0.5 sm:gap-1 h-20 px-2 py-1 bg-[#1E1D1B] border border-[#383734]">
                  {Array.from({ length: 64 }).map((_, i) => {
                    const barPercent = (i / 64) * 100;
                    const isPlayed = barPercent <= progressPercent;
                    const heightValue = Math.max(
                      15,
                      Math.round(
                        35 +
                          Math.sin(i * 0.38) * 30 +
                          Math.cos(i * 0.18) * 22 +
                          (i % 5 === 0 ? 12 : -8)
                      )
                    );

                    return (
                      <div
                        key={i}
                        onClick={() => {
                          const targetTime = (i / 64) * duration;
                          setCurrentTime(targetTime);
                          if (audioRef.current) {
                            audioRef.current.currentTime = targetTime;
                          }
                        }}
                        style={{ height: `${heightValue}%` }}
                        className={`flex-1 cursor-pointer transition-all duration-150 ${
                          isPlayed
                            ? "bg-[#6B7FA3] hover:bg-[#8E9EBA]"
                            : "bg-[#383734] hover:bg-[#4D4C48]"
                        } ${
                          isPlaying && isPlayed && i % 4 === 0 ? "opacity-90" : "opacity-100"
                        }`}
                        title={`${Math.round(barPercent)}%`}
                      />
                    );
                  })}
                </div>

                {/* Scrubber slider */}
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Hang sáv pozicionáló"
                  className="audio-scrubber w-full"
                />

                {/* Timestamps */}
                <div className="flex justify-between text-xs font-mono text-[#8E9EBA]">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-[#6B7FA3] uppercase tracking-wider">
                    Pesti zápor · WAV 3
                  </span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Main Control Bar */}
              <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-[#383734]">
                <div className="flex items-center gap-6">
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="flex items-center justify-center w-14 h-14 bg-[#F7F5F0] text-[#2C2B29] hover:bg-[#6B7FA3] hover:text-[#F7F5F0] transition-colors cursor-pointer"
                    aria-label={isPlaying ? "Szünet" : "Lejátszás"}
                  >
                    {isPlaying ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="5" y="4" width="4" height="16" />
                        <rect x="15" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="translate-x-0.5"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>

                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-[#F7F5F0]">
                      {isPlaying ? "Lejátszás aktív · Pesti zápor" : "Kattints a lejátszáshoz"}
                    </p>
                    <p className="text-[11px] text-[#8E9EBA] font-light">
                      FL Studio Master WAV 3 · Kertész Csanád
                    </p>
                  </div>
                </div>

                {/* Auxiliary Controls */}
                <div className="flex items-center gap-6 text-xs font-mono text-[#8E9EBA]">
                  <button
                    onClick={toggleMute}
                    className="hover:text-[#F7F5F0] transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    {isMuted ? "[Hang be]" : "[Némítás]"}
                  </button>
                  <span className="border-l border-[#383734] pl-6 text-[#6B7FA3]">
                    FL STUDIO 24-BIT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="py-32 sm:py-44 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full"
    >
      {/* Editorial CTA Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start pb-20 sm:pb-28 border-b border-[#E8E4DC]">
        <div className="lg:col-span-8">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#6B7FA3] mb-6">
            05 — Szakmai Gyakorlat &amp; Kapcsolat
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] leading-[1.05] text-[#2C2B29] mb-8">
            <span className="font-normal text-[#2C2B29]">
              12 hetes szakmai gyakorlati
            </span>{" "}
            helyet keresek{" "}
            <span className="italic font-light text-[#6B7FA3]">
              kreatív stratégia
            </span>{" "}
            területén.
          </h2>

          <p className="text-base sm:text-lg font-light text-[#4A4845] leading-relaxed max-w-2xl mb-8">
            Olyan ügynökségi vagy stúdiócsapathoz szeretnék csatlakozni, ahol számít a valós
            digitális kulturális érzék (25K+ követő, milliós organikus elérések), a józan
            közgazdasági logika és a precíz kivitelezés. Szívesen dolgozom briefeken,
            felhasználói kutatásokon, kampánykoncepciókon vagy digitális felületeken — és nem
            ijedek meg attól sem, ha kódhoz vagy videóvágáshoz kell nyúlni.
            Kezdés: 2026 ősz / tél (rugalmasan egyeztethető).
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/cv/kertesz-csanad-oneletrajz.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#2C2B29] text-[#F7F5F0] text-xs font-mono uppercase tracking-wider hover:bg-[#6B7FA3] transition-colors"
            >
              <span>Önéletrajz (CV) letöltése</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
            <a
              href="mailto:kertesz.csanad@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#2C2B29] text-[#2C2B29] text-xs font-mono uppercase tracking-wider hover:border-[#6B7FA3] hover:text-[#6B7FA3] transition-colors"
            >
              <span>Írj egy e-mailt ↗</span>
            </a>
          </div>
        </div>

        {/* Contact Matrix */}
        <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#E8E4DC] pt-8 lg:pt-0 lg:pl-10 space-y-8">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-widest text-[#8E9EBA] mb-1">
              Közvetlen kapcsolat
            </span>
            <a
              href="mailto:kertesz.csanad@gmail.com"
              className="text-base sm:text-lg font-medium text-[#2C2B29] hover:text-[#6B7FA3] transition-colors"
            >
              kertesz.csanad@gmail.com
            </a>
          </div>

          <div>
            <span className="block text-[11px] font-mono uppercase tracking-widest text-[#8E9EBA] mb-1">
              TikTok Csatorna
            </span>
            <a
              href="https://www.tiktok.com/@csibo01"
              target="_blank"
              rel="noreferrer"
              className="text-base font-mono text-[#6B7FA3] hover:text-[#2C2B29] transition-colors block"
            >
              @csibo01 ↗
            </a>
            <span className="text-[11px] text-[#8E9EBA] font-mono">
              25K+ követő · milliós organikus elérések
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-mono uppercase tracking-widest text-[#8E9EBA] mb-1">
              Szakmai Profil
            </span>
            <a
              href="https://www.linkedin.com/in/kerteszcsanad"
              target="_blank"
              rel="noreferrer"
              className="text-base font-medium text-[#2C2B29] hover:text-[#6B7FA3] transition-colors"
            >
              Kertész Csanád LinkedIn ↗
            </a>
          </div>

          <div>
            <span className="block text-[11px] font-mono uppercase tracking-widest text-[#8E9EBA] mb-1">
              Helyszín &amp; Elérhetőség
            </span>
            <p className="text-sm font-light text-[#4A4845]">
              Pilisvörösvár / Budapest · Rugalmas bejárás, hibrid vagy távmunka (C1 angol)
            </p>
          </div>
        </div>
      </div>

      {/* Colophon & Swiss Standards */}
      <div className="pt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs font-mono text-[#8E9EBA]">
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 bg-[#2C2B29]" />
          <span>© 2026 KERTÉSZ CSANÁD</span>
          <span className="text-[#DDD9D0]">/</span>
          <span>MINDEN JOG FENNTARTVA</span>
        </div>

        <div className="flex items-center gap-6">
          <span>SVÁJCI MINIMALISTA TIPOGRÁFIA</span>
          <span>PILISVÖRÖSVÁR · BUDAPEST</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#2C2B29] flex flex-col selection:bg-[#6B7FA3] selection:text-[#F7F5F0]">
      <Nav />
      <main className="flex-1">
        <Hero onOpenLightbox={setLightboxItem} />
        <StrategyAndInsight onOpenLightbox={setLightboxItem} />
        <SystemDesign onOpenLightbox={setLightboxItem} />
        <Certificates />
        <SoundDesign />
        <Footer />
      </main>

      {/* Lightbox Zoom Modal */}
      {lightboxItem && (
        <LightboxModal
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </div>
  );
}
