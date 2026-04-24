export default function AnnouncementBar() {
  return (
    <>
      <style>{`
        .announcement-bar {
          width: 100%;
          background: #2c1c12;
          color: #fff;
          overflow: hidden;
        }

        .ann-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          white-space: nowrap;
          gap: 0.75rem;
          padding: 0.45rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        .ann-sep {
          color: rgba(255,255,255,.35);
          flex-shrink: 0;
        }

        /* Mobile: scroll horizontal, tudo numa linha */
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
            font-size: 0.7rem;
            gap: 0.6rem;
            padding: 0.4rem 1rem;
          }
        }
      `}</style>

      <div className="announcement-bar">
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
