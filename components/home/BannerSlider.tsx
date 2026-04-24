"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Slide = {
  id: number;
  imageSrc: string;
  href: string;
  ariaLabel: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    imageSrc: "/Bannerprincipal.png",
    href: "/produtos",
    ariaLabel: "Banner principal",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5500);
  }, []);

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
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* ALTURA CONTROLADA (desktop) */
        .banner-track {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 7;
        }

        /* MOBILE: altura natural */
        @media (max-width: 640px) {
          .banner-track {
            aspect-ratio: unset;
          }
        }

        .banner-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity .6s ease;
        }

        .banner-slide.active {
          opacity: 1;
          position: relative;
        }

        /* IMAGEM PROFISSIONAL */
        .banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* MOBILE: imagem define altura */
        @media (max-width: 640px) {
          .banner-img {
            height: auto;
            object-fit: contain;
          }
        }

        /* OVERLAY SUAVE (SEM ESCURECER TUDO) */
        .banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.25),
            transparent
          );
          pointer-events: none;
        }

        /* MOBILE: overlay mais leve */
        @media (max-width: 640px) {
          .banner-overlay {
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.1),
              transparent
            );
          }
        }

        .banner-link {
          position: absolute;
          inset: 0;
          z-index: 2;
        }
      `}</style>

      <div className="banner-slider">
        <div className="banner-track">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className={`banner-slide ${i === current ? "active" : ""}`}
            >
              <img
                src={slide.imageSrc}
                alt={slide.ariaLabel}
                className="banner-img"
              />

              <div className="banner-overlay" />

              <a href={slide.href} className="banner-link" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}