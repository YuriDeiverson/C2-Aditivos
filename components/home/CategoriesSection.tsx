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
        .cats-section {
          width: 100%;
          padding: clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem);
        }

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

        .cats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.5rem, 1.5vw, 1rem);
        }

        @media (max-width: 767px) {
          .cats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.625rem;
          }
        }

        /* Card usa <img> real — evita problemas de background-image em mobile */
        .cat-card {
          position: relative;
          display: block;
          aspect-ratio: 3 / 4;
          border-radius: clamp(6px, 1.5vw, 12px);
          overflow: hidden;
          text-decoration: none;
          background: #2c1c12;
          -webkit-tap-highlight-color: transparent;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cat-card:active {
          transform: scale(0.97);
        }

        @media (hover: hover) {
          .cat-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 32px rgba(0,0,0,.22);
          }
          .cat-card:hover .cat-card-img {
            transform: scale(1.06);
          }
        }

        .cat-card:focus-visible {
          outline: 2px solid #C8893A;
          outline-offset: 3px;
        }

        .cat-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.45s ease;
          will-change: transform;
        }

        .cat-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(20, 10, 4, 0.75) 0%,
            rgba(20, 10, 4, 0.25) 50%,
            transparent 100%
          );
          pointer-events: none;
        }

        .cat-card-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: clamp(0.6rem, 2.5vw, 1rem);
          pointer-events: none;
        }

        .cat-card-label {
          color: #fff;
          font-size: clamp(0.82rem, 2.2vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.03em;
          line-height: 1.2;
          word-break: break-word;
          hyphens: auto;
          text-shadow: 0 1px 8px rgba(0,0,0,.6);
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
              <img
                src={cat.img}
                alt={cat.label}
                className="cat-card-img"
                loading="lazy"
                decoding="async"
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
