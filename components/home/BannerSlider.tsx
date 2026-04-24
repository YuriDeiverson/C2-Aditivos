"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SlideBase = {
  id: number;
  imageSrc: string;
  bgColor: string;
  accentColor: string;
  href: string;
};

type SlideImageHero = SlideBase & {
  imageOnly: true;
  ariaLabel: string;
};

type SlideRich = SlideBase & {
  imageOnly?: false;
  layout?: "split";
  eyebrow: string;
  title: string[];
  desc: string;
  cta: string;
};

type Slide = SlideImageHero | SlideRich;

const SLIDES: Slide[] = [
  {
    id: 1,
    imageOnly: true,
    imageSrc: "/Bannerprincipal.png",
    bgColor: "#2c1c12",
    accentColor: "#C8893A",
    href: "/produtos",
    ariaLabel:
      "Frescor e sabor em cada mordida — de pães artesanais a doces. Ofertas e primeira compra com desconto. Ir à loja.",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const total = SLIDES.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % total),
      5500
    );
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = useCallback(
    (i: number) => {
      setCurrent(i);
      startTimer();
    },
    [startTimer]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      goTo(dx < 0 ? (current + 1) % total : (current - 1 + total) % total);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <>
      <style>{`
        /* ── Desktop: aspect-ratio fixo ── */
        .banner-slider {
          position: relative;
          width: 100%;
          overflow: hidden;
          aspect-ratio: 16 / 7;
          min-height: 200px;
          max-height: 680px;
          background: #1a1008;
          touch-action: pan-y pinch-zoom;
          -webkit-tap-highlight-color: transparent;
        }

        /* ── Mobile: altura automática — imagem dita a altura ── */
        @media (max-width: 640px) {
          .banner-slider {
            aspect-ratio: unset;
            max-height: unset;
            min-height: unset;
            height: auto;
          }
        }

        /* ── Slides ── */
        .banner-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.65s ease;
          will-change: opacity;
        }
        .banner-slide.active {
          opacity: 1;
          pointer-events: auto;
        }

        /* No mobile o slide ativo precisa ser relativo para empurrar a altura */
        @media (max-width: 640px) {
          .banner-slide {
            position: absolute;
            inset: 0;
          }
          /* O slide ativo vira relativo para definir a altura do container */
          .banner-slide.active {
            position: relative;
            inset: unset;
          }
        }

        /* ── Hero image — desktop: cobre todo o container ── */
        .banner-img--hero {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }

        /* ── Hero image — mobile: usa <img> real para altura natural ── */
        @media (max-width: 640px) {
          .banner-img--hero {
            position: relative;
            inset: unset;
            width: 100%;
            height: auto;
            background: none !important; /* desativa background-image */
          }
          /* A imagem real fica visível */
          .banner-img--hero .banner-hero-img-real {
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          }
        }

        /* Esconde a img real no desktop (usa background-image) */
        .banner-hero-img-real {
          display: none;
        }

        .banner-overlay--hero {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.22) 0%, transparent 40%);
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .banner-overlay--hero {
            /* Overlay leve por cima da img real */
            inset: unset;
            top: 0; left: 0; right: 0; bottom: 0;
            position: absolute;
          }
        }

        .banner-hero-hit {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: block;
        }

        /* ── Rich slides ── */
        .banner-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .banner-overlay { position: absolute; inset: 0; }

        .banner-content {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(1rem, 5vw, 3.5rem) clamp(1.25rem, 6vw, 5rem);
          gap: clamp(0.5rem, 1.5vw, 1rem);
          max-width: 600px;
        }

        .banner-eyebrow {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          font-size: clamp(0.6rem, 1.8vw, 0.75rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          padding: 0.3em 0.9em;
          border-radius: 2px;
        }

        .banner-title {
          font-size: clamp(1.4rem, 5vw, 3rem);
          font-weight: 800;
          line-height: 1.15;
          color: #fff;
          margin: 0;
          word-break: break-word;
          hyphens: auto;
        }

        .banner-desc {
          font-size: clamp(0.78rem, 2vw, 1rem);
          color: rgba(255,255,255,.85);
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 480px) { .banner-desc { -webkit-line-clamp: 2; } }

        .banner-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #fff;
          font-size: clamp(0.78rem, 2vw, 0.9rem);
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          padding: clamp(0.55rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
          border-radius: 4px;
          width: fit-content;
          min-height: 44px;
          transition: filter .2s ease, transform .15s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .banner-cta:active { transform: scale(0.97); filter: brightness(.9); }
        @media (hover: hover) {
          .banner-cta:hover { filter: brightness(1.12); transform: translateX(3px); }
        }

        .banner-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100%;
        }
        @media (max-width: 600px) {
          .banner-split { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
        }
        .banner-split__content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(1rem, 5vw, 3rem);
          gap: clamp(0.5rem, 1.5vw, 0.875rem);
          z-index: 1;
        }
        .banner-split__image {
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          min-height: 160px;
        }

        /* ── Setas (ocultas no mobile) ── */
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(0,0,0,.38);
          color: #fff;
          border: none;
          cursor: pointer;
          width: clamp(36px, 5vw, 48px);
          height: clamp(36px, 5vw, 48px);
          border-radius: 50%;
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background .2s ease, transform .15s ease;
          -webkit-tap-highlight-color: transparent;
        }
        @media (max-width: 640px) { .slider-arrow { display: none; } }
        .slider-prev { left: clamp(0.5rem, 2vw, 1.25rem); }
        .slider-next { right: clamp(0.5rem, 2vw, 1.25rem); }
        @media (hover: hover) {
          .slider-arrow:hover { background: rgba(0,0,0,.62); transform: translateY(-50%) scale(1.08); }
        }
        .slider-arrow:active { transform: translateY(-50%) scale(0.95); }

        /* ── Dots ── */
        .slider-dots {
          position: absolute;
          bottom: clamp(0.5rem, 2vw, 1rem);
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: clamp(5px, 1.2vw, 8px);
          align-items: center;
        }
        .slider-dot {
          padding: 8px;
          margin: -8px;
          background: none;
          border: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slider-dot::after {
          content: '';
          display: block;
          width: clamp(6px, 1.5vw, 9px);
          height: clamp(6px, 1.5vw, 9px);
          border-radius: 50%;
          background: rgba(255,255,255,.45);
          transition: background .25s ease, transform .25s ease;
        }
        .slider-dot.active::after { background: #fff; transform: scale(1.3); }

        .slider-arrow:focus-visible,
        .slider-dot:focus-visible,
        .banner-cta:focus-visible,
        .banner-hero-hit:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 3px;
        }

        .sr-only {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>

      <div
        className="banner-slider"
        aria-label="Banners promocionais"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDES.map((slide, i) => {
          const isHeroImage = "imageOnly" in slide && slide.imageOnly;
          return (
            <div
              key={slide.id}
              className={`banner-slide${i === current ? " active" : ""}${
                isHeroImage ? " banner-slide--hero-image" : " banner-slide--rich"
              }`}
              style={{ background: slide.bgColor, ["--slide-bg" as never]: slide.bgColor }}
              aria-hidden={i !== current}
            >
              {isHeroImage ? (
                <>
                  {/* Desktop: background-image. Mobile: <img> real com altura natural */}
                  <div
                    className="banner-img banner-img--hero"
                    style={{ backgroundImage: `url(${slide.imageSrc})` }}
                  >
                    {/* Visível apenas no mobile via CSS */}
                    <img
                      src={slide.imageSrc}
                      alt={slide.ariaLabel}
                      className="banner-hero-img-real"
                      draggable={false}
                    />
                  </div>
                  <div className="banner-overlay banner-overlay--hero" />
                  <a
                    href={slide.href}
                    className="banner-hero-hit"
                    tabIndex={i === current ? 0 : -1}
                  >
                    <span className="sr-only">{slide.ariaLabel}</span>
                  </a>
                </>
              ) : slide.layout === "split" ? (
                <div className="banner-split">
                  <div className="banner-split__content">
                    <span className="banner-eyebrow" style={{ background: slide.accentColor }}>{slide.eyebrow}</span>
                    <h2 className="banner-title">
                      {slide.title.map((line, j) => (
                        <span key={j}>{line}{j < slide.title.length - 1 && <br />}</span>
                      ))}
                    </h2>
                    <p className="banner-desc">{slide.desc}</p>
                    <a href={slide.href} className="banner-cta" style={{ background: slide.accentColor }} tabIndex={i === current ? 0 : -1}>
                      {slide.cta}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                  <div className="banner-split__image" style={{ backgroundImage: `url(${slide.imageSrc})` }} aria-hidden="true" />
                </div>
              ) : (
                <>
                  <div className="banner-img" style={{ backgroundImage: `url(${slide.imageSrc})` }} />
                  <div className="banner-overlay" style={{ background: `linear-gradient(100deg, ${slide.bgColor} 0%, ${slide.bgColor}f0 42%, ${slide.bgColor}90 65%, transparent 100%)` }} />
                  <div className="banner-content">
                    <span className="banner-eyebrow" style={{ background: slide.accentColor }}>{slide.eyebrow}</span>
                    <h1 className="banner-title">
                      {slide.title.map((line, j) => (
                        <span key={j}>{line}{j < slide.title.length - 1 && <br />}</span>
                      ))}
                    </h1>
                    <p className="banner-desc">{slide.desc}</p>
                    <a href={slide.href} className="banner-cta" style={{ background: slide.accentColor }} tabIndex={i === current ? 0 : -1}>
                      {slide.cta}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </>
              )}
            </div>
          );
        })}

        <button className="slider-arrow slider-prev" onClick={() => goTo((current - 1 + total) % total)} aria-label="Slide anterior">‹</button>
        <button className="slider-arrow slider-next" onClick={() => goTo((current + 1) % total)} aria-label="Próximo slide">›</button>

        <div className="slider-dots" role="tablist">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`slider-dot${i === current ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Ir para slide ${i + 1}`}
              role="tab"
              aria-selected={i === current}
            />
          ))}
        </div>
      </div>
    </>
  );
}
