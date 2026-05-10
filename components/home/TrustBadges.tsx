"use client";

import { useEffect, useRef, useState } from "react";

const BADGES = [
  {
    key: "frete",
    title: "Frete Grátis",
    subtitle: (freteSubtitle: string) => freteSubtitle,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1.5" />
        <path d="M16 8h4l3 4v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    key: "envio",
    title: "Envio Rápido",
    subtitle: () => "Até 5 dias úteis",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    key: "parcelas",
    title: "6x Sem Juros",
    subtitle: () => "No cartão de crédito",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    key: "segura",
    title: "Compra Segura",
    subtitle: () => "100% protegido",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

type Props = {
  freteSubtitle: string;
};

export default function TrustBadges({ freteSubtitle }: Props) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = BADGES.length;

  const goTo = (i: number) => {
    if (i === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(i);
      setAnimating(false);
    }, 280);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      goTo((current + 1) % total);
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  return (
    <>
      <style>{`
        /* ── Wrapper ── */
        .trust-badges {
          width: 100%;
          background: #faf8f5;
          border-top: 1px solid #ede8e0;
          border-bottom: 1px solid #ede8e0;
        }

        /* ── Desktop: 4 colunas em linha ── */
        .trust-desktop {
          display: flex;
          align-items: stretch;
          justify-content: center;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          flex: 1;
          padding: 1.25rem 1.5rem;
          position: relative;
        }

        .trust-badge:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background: #e0d8cc;
        }

        .trust-icon-wrap {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #fff;
          border: 1px solid #e8e0d4;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C8893A;
          box-shadow: 0 1px 4px rgba(0,0,0,.06);
        }

        .trust-text strong {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #1a1008;
          letter-spacing: 0.01em;
          margin-bottom: 0.15em;
        }

        .trust-text span {
          display: block;
          font-size: 0.72rem;
          color: #7a6a55;
          line-height: 1.4;
        }

        /* ── Mobile: slide único com dots ── */
        .trust-mobile {
          display: none;
          flex-direction: column;
          align-items: center;
          padding: 1.25rem 1.5rem 1rem;
          min-height: 90px;
        }

        .trust-slide {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          justify-content: center;
          transition: opacity 0.28s ease, transform 0.28s ease;
        }

        .trust-slide.fade-out {
          opacity: 0;
          transform: translateY(4px);
        }

        .trust-slide-text strong {
          display: block;
          font-size: 0.88rem;
          font-weight: 700;
          color: #1a1008;
          letter-spacing: 0.01em;
          margin-bottom: 0.15em;
        }

        .trust-slide-text span {
          display: block;
          font-size: 0.75rem;
          color: #7a6a55;
        }

        /* Dots */
        .trust-dots {
          display: flex;
          gap: 6px;
          margin-top: 0.875rem;
          align-items: center;
        }

        .trust-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4c9b8;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .trust-dot.active {
          background: #C8893A;
          transform: scale(1.35);
        }

        @media (max-width: 640px) {
          .trust-desktop { display: none; }
          .trust-mobile { display: flex; }
        }
      `}</style>

      <div className="trust-badges">

        {/* ── Desktop ── */}
        <div className="trust-desktop">
          {BADGES.map((b) => (
            <div key={b.key} className="trust-badge">
              <div className="trust-icon-wrap">{b.icon}</div>
              <div className="trust-text">
                <strong>{b.title}</strong>
                <span>{b.subtitle(freteSubtitle)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile: slide ── */}
        <div className="trust-mobile">
          <div className={`trust-slide${animating ? " fade-out" : ""}`}>
            <div className="trust-icon-wrap">{BADGES[current].icon}</div>
            <div className="trust-slide-text">
              <strong>{BADGES[current].title}</strong>
              <span>{BADGES[current].subtitle(freteSubtitle)}</span>
            </div>
          </div>

          <div className="trust-dots" role="tablist" aria-label="Navegação dos selos">
            {BADGES.map((_, i) => (
              <button
                key={i}
                className={`trust-dot${i === current ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Ver ${BADGES[i].title}`}
                role="tab"
                aria-selected={i === current}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
