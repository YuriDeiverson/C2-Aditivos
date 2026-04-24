"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  "Enviamos para todo o Brasil",
  "Até 6x sem juros no cartão",
  "Qualidade garantida em cada lote",
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % ITEMS.length);
        setFading(false);
      }, 350);
    }, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <>
      <style>{`
        .ann-bar {
          width: 100%;
          background: #1e110a;
          border-bottom: 1px solid rgba(200, 137, 58, 0.18);
          overflow: hidden;
        }

        /* ── Desktop: todos os itens em linha ── */
        .ann-desktop {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 0.5rem 1.5rem;
        }

        .ann-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,.82);
          white-space: nowrap;
          padding: 0 1.5rem;
        }

        .ann-item:not(:last-child) {
          border-right: 1px solid rgba(200, 137, 58, 0.3);
        }

        .ann-icon {
          width: 14px;
          height: 14px;
          color: #C8893A;
          flex-shrink: 0;
        }

        /* ── Mobile: um item por vez com fade ── */
        .ann-mobile {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,.82);
          white-space: nowrap;
          min-height: 32px;
        }

        .ann-mobile-text {
          transition: opacity 0.35s ease;
        }
        .ann-mobile-text.fade {
          opacity: 0;
        }

        .ann-dot {
          display: flex;
          gap: 4px;
          margin-left: 0.5rem;
        }
        .ann-dot span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(200, 137, 58, 0.35);
          transition: background 0.3s ease;
        }
        .ann-dot span.active {
          background: #C8893A;
        }

        @media (max-width: 600px) {
          .ann-desktop { display: none; }
          .ann-mobile { display: flex; }
        }
      `}</style>

      <div className="ann-bar" role="region" aria-label="Informações da loja">

        {/* Desktop */}
        <div className="ann-desktop">
          <div className="ann-item">
            <svg className="ann-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            Enviamos para todo o Brasil
          </div>
          <div className="ann-item">
            <svg className="ann-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            Até 6x sem juros no cartão
          </div>
          <div className="ann-item">
            <svg className="ann-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Qualidade garantida em cada lote
          </div>
        </div>

        {/* Mobile: rotação com fade */}
        <div className="ann-mobile" aria-live="polite" aria-atomic="true">
          <svg className="ann-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {current === 0 && <><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>}
            {current === 1 && <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>}
            {current === 2 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
          </svg>
          <span className={`ann-mobile-text${fading ? " fade" : ""}`}>
            {ITEMS[current]}
          </span>
          <div className="ann-dot" aria-hidden="true">
            {ITEMS.map((_, i) => (
              <span key={i} className={i === current ? "active" : ""} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
