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

type Slide = SlideImageHero;

const SLIDES: Slide[] = [
  {
    id: 1,
    imageOnly: true,
    imageSrc: "/Bannerprincipal.png",
    bgColor: "#2c1c12",
    accentColor: "#C8893A",
    href: "/produtos",
    ariaLabel: "Banner principal",
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

  return (
    <>
      <style>{`
        .banner-slider {
          position: relative;
          width: 100%;
          overflow: hidden;
          aspect-ratio: 16 / 7;
          background: #1a1008;
        }

        @media (max-width: 640px) {
          .banner-slider {
            aspect-ratio: unset;
            height: auto;
          }
        }

        .banner-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity .5s ease;
        }

        .banner-slide.active {
          opacity: 1;
        }

        /* 🔥 MOBILE FIX REAL */
        @media (max-width: 640px) {
          .banner-slide {
            position: absolute;
          }

          .banner-slide.active {
            position: relative;
            height: auto;
          }
        }

        .banner-img--hero {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }

        /* 🔥 MOBILE IMG REAL */
        @media (max-width: 640px) {
          .banner-img--hero {
            position: relative;
            background: none !important;
          }

          .banner-hero-img-real {
            display: block;
            width: 100%;
            height: auto;
          }
        }

        .banner-hero-img-real {
          display: none;
        }

        /* 🔥 OVERLAY CORRIGIDO */
        .banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.2), transparent);
        }

        .banner-hero-hit {
          position: absolute;
          inset: 0;
          z-index: 2;
        }
      `}</style>

      <div className="banner-slider">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`banner-slide ${i === current ? "active" : ""}`}
            style={{ background: slide.bgColor }}
          >
            <div
              className="banner-img--hero"
              style={{ backgroundImage: `url(${slide.imageSrc})` }}
            >
              <img
                src={slide.imageSrc}
                alt={slide.ariaLabel}
                className="banner-hero-img-real"
              />
            </div>

            <div className="banner-overlay" />

            <a href={slide.href} className="banner-hero-hit" />
          </div>
        ))}
      </div>
    </>
  );
}