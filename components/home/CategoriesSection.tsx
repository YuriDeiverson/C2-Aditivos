"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

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

// 🔥 DUPLICAÇÃO PARA LOOP
const LOOP_CATS = [...CATS, ...CATS];

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isResetting = false;

    const handleScroll = () => {
      if (!el || isResetting) return;

      const scrollWidth = el.scrollWidth / 2;

      // 👉 chegou no final fake → volta pro início
      if (el.scrollLeft >= scrollWidth) {
        isResetting = true;
        el.scrollLeft = 0;
        setTimeout(() => (isResetting = false), 50);
      }

      // 👉 voltou demais → joga pro meio
      if (el.scrollLeft <= 0) {
        isResetting = true;
        el.scrollLeft = scrollWidth;
        setTimeout(() => (isResetting = false), 50);
      }
    };

    el.addEventListener("scroll", handleScroll);

    // começa no meio (loop perfeito)
    el.scrollLeft = el.scrollWidth / 2;

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .cats-section {
          padding: 2rem 1.25rem;
        }

        .cats-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .cats-grid {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .cats-grid::-webkit-scrollbar {
          display: none;
        }

        .cat-card {
          min-width: 70%;
          aspect-ratio: 4 / 5;
          flex: 0 0 auto;
          scroll-snap-align: start;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
        }

        .cat-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cat-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.7), transparent);
        }

        .cat-card-content {
          position: absolute;
          bottom: 0;
          padding: 1rem;
        }

        .cat-card-label {
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
        }

        @media (min-width: 768px) {
          .cats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            overflow: visible;
          }

          .cat-card {
            min-width: unset;
          }
        }
      `}</style>

      <section className="cats-section">
        <h2 className="cats-title">Categorias</h2>

        <div ref={scrollRef} className="cats-grid">
          {LOOP_CATS.map((cat, i) => (
            <Link key={i} href={cat.href} className="cat-card">
              <img src={cat.img} alt={cat.label} className="cat-card-img" />
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