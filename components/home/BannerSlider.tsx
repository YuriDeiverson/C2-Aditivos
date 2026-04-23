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
  /** Apenas para o layout texto-esquerda / imagem-direita */
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

  return (
    <div className="banner-slider" aria-label="Banners promocionais">
      {SLIDES.map((slide, i) => {
        const isHeroImage = "imageOnly" in slide && slide.imageOnly;
        return (
          <div
            key={slide.id}
            className={`banner-slide${i === current ? " active" : ""}${isHeroImage ? " banner-slide--hero-image" : " banner-slide--rich"}`}
            style={{ background: slide.bgColor, ["--slide-bg" as never]: slide.bgColor }}
            aria-hidden={i !== current}
          >
            {isHeroImage ? (
              /* ── Slide fullscreen ── */
              <>
                <div
                  className="banner-img banner-img--hero"
                  style={{ backgroundImage: `url(${slide.imageSrc})` }}
                />
                <div className="banner-overlay banner-overlay--hero" />
                <a
                  href={slide.href}
                  className="banner-hero-hit"
                  tabIndex={i === current ? 0 : -1}
                >
                  <span className="sr-only">{slide.ariaLabel}</span>
                </a>
              </>
            ) : (
              slide.layout === "split" ? (
                /* ── Layout split (apenas Lançamentos) ── */
                <div className="banner-split">
                  <div className="banner-split__content">
                    <span
                      className="banner-eyebrow"
                      style={{ background: slide.accentColor }}
                    >
                      {slide.eyebrow}
                    </span>
                    <h2 className="banner-title">
                      {slide.title.map((line, j) => (
                        <span key={j}>
                          {line}
                          {j < slide.title.length - 1 && <br />}
                        </span>
                      ))}
                    </h2>
                    <p className="banner-desc">{slide.desc}</p>
                    <a
                      href={slide.href}
                      className="banner-cta"
                      style={{ background: slide.accentColor }}
                      tabIndex={i === current ? 0 : -1}
                    >
                      {slide.cta}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  <div
                    className="banner-split__image"
                    style={{ backgroundImage: `url(${slide.imageSrc})` }}
                    aria-hidden="true"
                  />
                </div>
              ) : (
                /* ── Rich padrão (mantém como era) ── */
                <>
                  <div
                    className="banner-img"
                    style={{ backgroundImage: `url(${slide.imageSrc})` }}
                  />
                  <div
                    className="banner-overlay"
                    style={{
                      background: `linear-gradient(100deg, ${slide.bgColor} 0%, ${slide.bgColor}f0 42%, ${slide.bgColor}90 65%, transparent 100%)`,
                    }}
                  />
                  <div className="banner-content">
                    <span
                      className="banner-eyebrow"
                      style={{ background: slide.accentColor }}
                    >
                      {slide.eyebrow}
                    </span>
                    <h1 className="banner-title">
                      {slide.title.map((line, j) => (
                        <span key={j}>
                          {line}
                          {j < slide.title.length - 1 && <br />}
                        </span>
                      ))}
                    </h1>
                    <p className="banner-desc">{slide.desc}</p>
                    <a
                      href={slide.href}
                      className="banner-cta"
                      style={{ background: slide.accentColor }}
                      tabIndex={i === current ? 0 : -1}
                    >
                      {slide.cta}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </>
              )
            )}
          </div>
        );
      })}

      <button
        className="slider-arrow slider-prev"
        onClick={() => goTo((current - 1 + total) % total)}
        aria-label="Slide anterior"
      >
        ‹
      </button>
      <button
        className="slider-arrow slider-next"
        onClick={() => goTo((current + 1) % total)}
        aria-label="Próximo slide"
      >
        ›
      </button>

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
  );
}