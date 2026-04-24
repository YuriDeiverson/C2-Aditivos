export default function AnnouncementBar() {
  return (
    <>
      <style>{`
        .announcement-bar {
          width: 100%;
          background: #2c1c12;
          color: #fff;
          font-size: clamp(0.65rem, 1.8vw, 0.78rem);
          font-weight: 600;
          letter-spacing: 0.04em;
          overflow: hidden;
        }

        .ann-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.5rem, 2vw, 1.25rem);
          padding: clamp(0.4rem, 1.2vw, 0.6rem) clamp(0.75rem, 3vw, 1.5rem);
          flex-wrap: nowrap;
          white-space: nowrap;
        }

        .ann-sep {
          color: rgba(255,255,255,.35);
          flex-shrink: 0;
        }

        /* ── Mobile: esconde os separadores e empilha os itens em scroll horizontal ── */
        @media (max-width: 600px) {
          .announcement-bar {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .announcement-bar::-webkit-scrollbar {
            display: none;
          }

          .ann-inner {
            justify-content: flex-start;
            gap: 0;
            padding: 0.45rem 1rem;
          }

          /* Cada span vira um "chip" separado */
          .ann-inner > span:not(.ann-sep) {
            flex-shrink: 0;
            padding: 0 0.9rem;
            border-right: 1px solid rgba(255,255,255,.2);
          }

          .ann-inner > span:not(.ann-sep):last-child {
            border-right: none;
          }

          /* Esconde os separadores "|" — a borda já faz esse papel */
          .ann-sep {
            display: none;
          }
        }

        /* ── Mobile muito pequeno: fonte ainda menor ── */
        @media (max-width: 360px) {
          .ann-inner > span:not(.ann-sep) {
            font-size: 0.65rem;
            padding: 0 0.7rem;
          }
        }
      `}</style>

      <div className="announcement-bar" role="marquee" aria-live="off">
        <div className="ann-inner">
          <span>🚚 Enviamos para todo o Brasil</span>
          <span className="ann-sep" aria-hidden="true">|</span>
          <span>💳 Até 6x sem juros no cartão</span>
          <span className="ann-sep" aria-hidden="true">|</span>
          <span>✅ Qualidade garantida em cada lote</span>
        </div>
      </div>
    </>
  );
}
