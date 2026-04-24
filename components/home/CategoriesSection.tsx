import Link from "next/link";

const CATS = [
  {
    key: "melhores",
    label: "Melhores",
    img: "/melhorador-massa.jpg",
    href: "/produtos?sort=popular",
  },
  {
    key: "base",
    label: "Bases prontas",
    img: "/base-multigraos.jpg",
    href: "/produtos?cat=base",
  },
  {
    key: "enzima",
    label: "Enzimas",
    img: "/enzima-amilamix.jpg",
    href: "/produtos?cat=enzima",
  },
  {
    key: "fermentacao",
    label: "Fermentação",
    img: "/fermento-seco.jpg",
    href: "/produtos?cat=fermentacao",
  },
];

export default function CategoriesSection() {
  return (
    <>
      <style>{`
        /* ── Section wrapper ── */
        .cats-section {
          width: 100%;
          /* Padding horizontal fluido: generoso no desktop, compacto no mobile */
          padding: clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem);
        }

        /* ── Header ── */
        .cats-header {
          margin-bottom: clamp(1.25rem, 3vw, 2rem);
        }

        .cats-kicker {
          font-size: clamp(0.65rem, 1.8vw, 0.75rem);
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C8893A;
          margin: 0 0 0.35em;
        }

        .cats-title {
          font-size: clamp(1.4rem, 4vw, 2.25rem);
          font-weight: 800;
          line-height: 1.1;
          color: #1a1008;
          margin: 0;
        }

        /* ── Grid ──
           Desktop (≥768px): 4 colunas iguais
           Tablet (480–767px): 2 colunas
           Mobile (<480px): 2 colunas compactas (scroll horizontal como fallback abaixo)
        */
        .cats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.5rem, 1.5vw, 1rem);
        }

        @media (max-width: 767px) {
          .cats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(0.5rem, 2vw, 0.75rem);
          }
        }

        /* Opcional: em telas muito estreitas (< 320px) scroll horizontal */
        @media (max-width: 319px) {
          .cats-grid {
            grid-template-columns: repeat(2, minmax(130px, 1fr));
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 4px;
          }
          .cats-grid::-webkit-scrollbar { display: none; }
        }

        /* ── Card ── */
        .cat-card {
          position: relative;
          display: block;
          /* Proporção quadrada em mobile é mais legível; retangular no desktop */
          aspect-ratio: 3 / 4;
          border-radius: clamp(6px, 1.5vw, 12px);
          overflow: hidden;
          text-decoration: none;
          /* Área de toque mínima garantida pela altura do aspect-ratio */
          -webkit-tap-highlight-color: transparent;
          /* Sutil elevação ao toque */
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        @media (min-width: 768px) {
          .cat-card {
            aspect-ratio: 3 / 4;
          }
        }

        /* Estados interativos */
        .cat-card:active {
          transform: scale(0.97);
        }

        @media (hover: hover) {
          .cat-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 32px rgba(0,0,0,.18);
          }
          .cat-card:hover .cat-card-bg {
            transform: scale(1.06);
          }
          .cat-card:hover .cat-card-label {
            letter-spacing: 0.07em;
          }
        }

        /* Focus visível (acessibilidade) */
        .cat-card:focus-visible {
          outline: 2px solid #C8893A;
          outline-offset: 3px;
        }

        /* ── Imagem de fundo ── */
        .cat-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          transition: transform 0.45s ease;
          will-change: transform;
        }

        /* ── Overlay gradiente ── */
        .cat-card-overlay {
          position: absolute;
          inset: 0;
          /* Gradiente mais intenso no mobile para garantir legibilidade do label */
          background: linear-gradient(
            to top,
            rgba(20, 10, 4, 0.78) 0%,
            rgba(20, 10, 4, 0.3) 45%,
            transparent 100%
          );
        }

        /* ── Label ── */
        .cat-card-content {
          position: absolute;
          inset: 0;
          display: flex;
          /* Label ancorado na parte inferior */
          align-items: flex-end;
          padding: clamp(0.6rem, 2.5vw, 1rem);
        }

        .cat-card-label {
          color: #fff;
          font-size: clamp(0.8rem, 2.2vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.03em;
          line-height: 1.2;
          /* Evita texto longo em duas linhas desnecessariamente */
          word-break: break-word;
          hyphens: auto;
          transition: letter-spacing 0.25s ease;
          /* Sombra de texto para contraste em imagens claras */
          text-shadow: 0 1px 6px rgba(0,0,0,.5);
        }
      `}</style>

      <section className="cats-section" aria-labelledby="cats-heading">
        <div className="cats-header">
          <p className="cats-kicker">Explore por</p>
          <h2 id="cats-heading" className="cats-title">
            Categoria
          </h2>
        </div>

        <div className="cats-grid">
          {CATS.map((cat) => (
            <Link key={cat.key} href={cat.href} className="cat-card">
              <div
                className="cat-card-bg"
                style={{ backgroundImage: `url(${cat.img})` }}
              />
              <div className="cat-card-overlay" />
              <div className="cat-card-content">
                <span className="cat-card-label">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
