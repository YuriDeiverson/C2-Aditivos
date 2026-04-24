"use client";

import Link from "next/link";

const CATS = [
  {
    key: "melhores",
    label: "Melhores",
    img: "/Melhorador em pó.jpeg",
    href: "/produtos?sort=popular",
  },
  {
    key: "base",
    label: "Bases prontas",
    img: "/Amido de milho.jpeg",
    href: "/produtos?cat=base",
  },
  {
    key: "enzima",
    label: "Enzimas",
    img: "/Chocolate em pó.jpeg",
    href: "/produtos?cat=enzima",
  },
  {
    key: "fermentacao",
    label: "Fermentação",
    img: "/Fermento quimico em pó.jpeg",
    href: "/produtos?cat=fermentacao",
  },
];

export default function CategoriesSection() {
  return (
    <>
      <style>{`
        .cats-section {
          width: 100%;
          padding: clamp(2rem, 6vw, 4rem) clamp(1.25rem, 5vw, 3rem);
        }

        .cats-header {
          margin-bottom: clamp(1.25rem, 3vw, 2rem);
        }

        .cats-kicker {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C8893A;
          margin: 0 0 0.35em;
        }

        .cats-title {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 800;
          line-height: 1.1;
          color: #1a1008;
          margin: 0;
        }

        /* ───────── DESKTOP GRID ───────── */
        .cats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        /* ───────── MOBILE: SCROLL HORIZONTAL ───────── */
        @media (max-width: 768px) {
          .cats-grid {
            display: flex;
            gap: 0.75rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
          }

          .cats-grid::-webkit-scrollbar {
            display: none;
          }
        }

        .cat-card {
          position: relative;
          display: block;
          border-radius: 14px;
          overflow: hidden;
          text-decoration: none;
          background: #2c1c12;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        /* DESKTOP SIZE */
        .cat-card {
          aspect-ratio: 3 / 4;
        }

        /* MOBILE SIZE */
        @media (max-width: 768px) {
          .cat-card {
            min-width: 68%;
            aspect-ratio: 4 / 5;
            flex: 0 0 auto;
            scroll-snap-align: start;
          }
        }

        /* EXTRA SMALL (celular pequeno) */
        @media (max-width: 420px) {
          .cat-card {
            min-width: 78%;
          }
        }

        .cat-card:active {
          transform: scale(0.96);
        }

        @media (hover: hover) {
          .cat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 14px 40px rgba(0,0,0,.25);
          }

          .cat-card:hover .cat-card-img {
            transform: scale(1.08);
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
          transition: transform 0.5s ease;
          will-change: transform;
        }

        /* OVERLAY MELHORADO */
        .cat-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.75) 0%,
            rgba(0,0,0,0.3) 50%,
            rgba(0,0,0,0.05) 100%
          );
        }

        /* MOBILE: overlay mais leve */
        @media (max-width: 768px) {
          .cat-card-overlay {
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.65) 0%,
              rgba(0,0,0,0.2) 50%,
              transparent 100%
            );
          }
        }

        .cat-card-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }

        .cat-card-label {
          color: #fff;
          font-size: clamp(0.95rem, 2.8vw, 1.1rem);
          font-weight: 700;
          letter-spacing: 0.03em;
          line-height: 1.2;
          text-shadow: 0 2px 12px rgba(0,0,0,.7);
        }
      `}</style>

      <section className="cats-section">
        <div className="cats-header">
          <p className="cats-kicker">Explore por</p>
          <h2 className="cats-title">Categoria</h2>
        </div>

        <div className="cats-grid">
          {CATS.map((cat) => (
            <Link key={cat.key} href={cat.href} className="cat-card">
              <img
                src={cat.img}
                alt={cat.label}
                className="cat-card-img"
                loading="lazy"
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