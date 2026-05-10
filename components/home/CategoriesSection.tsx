"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

const CATS = [
  {
    key: "melhores",
    label: "Mais Vendidos",
    title: "Melhores Produtos",
    description: "Nossa seleção dos produtos mais populares e bem avaliados pelos clientes.",
    img: "/melhorador-massa.jpg",
    href: "/produtos?sort=popular",
    featured: true,
    cta: "Ver todos",
  },
  {
    key: "base",
    label: "Bases",
    title: "Bases Prontas",
    description: "Soluções completas para panificação com máxima performance.",
    img: "/base-multigraos.jpg",
    href: "/produtos?cat=base",
  },
  {
    key: "enzima",
    label: "Enzimas",
    title: "Enzimas",
    description: "Tecnologia enzimática para melhorar textura e shelf life.",
    img: "/enzima-amilamix.jpg",
    href: "/produtos?cat=enzima",
  },
  {
    key: "fermentacao",
    label: "Fermentação",
    title: "Fermentação",
    description: "Fermentos e melhoradores biológicos de alta qualidade.",
    img: "/fermento-seco.jpg",
    href: "/produtos?cat=fermentacao",
  },
  {
    key: "melhoradores",
    label: "Melhoradores",
    title: "Melhoradores",
    description: "Aditivos para otimizar processos e resultados.",
    img: "/melhorador-massa.jpg",
    href: "/produtos?cat=melhoradores",
  },
  {
    key: "emulsificantes",
    label: "Emulsificantes",
    title: "Emulsificantes",
    description: "Estabilizantes para cremes, recheios e massas.",
    img: "/base-multigraos.jpg",
    href: "/produtos?cat=emulsificantes",
  },
];

export default function CategoriesSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!slider || isPaused) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      scrollPos += speed;
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (scrollPos >= maxScroll) {
        scrollPos = 0;
      }

      slider.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const mobileCats = [...CATS, ...CATS, ...CATS];
  const featured = CATS.find((c) => c.featured);
  const secondary = CATS.filter((c) => !c.featured);

  return (
    <section className="cats-section" aria-labelledby="cats-heading">
      {/* Header */}
      <div className="cats-header">
        <p className="cats-kicker">Explore por</p>
        <h2 id="cats-heading" className="cats-title">
          Nossas Categorias
        </h2>
        <p className="cats-subtitle">
          Produtos especializados para cada etapa da sua produção
        </p>
      </div>

      {/* Desktop - Bento Grid */}
      <div className="cats-bento desktop-only">
        <div className="cats-bento-grid">
          {/* Featured Card */}
          {featured && (
            <Link
              href={featured.href}
              className="cat-card-featured"
            >
              {/* Background decoration */}
              <div className="cat-featured-deco-1" />
              <div className="cat-featured-deco-2" />
              
              <div className="cat-featured-img">
                <img src={featured.img} alt={featured.title} />
              </div>
              
              <div className="cat-featured-content">
                <span className="cat-featured-label">{featured.label}</span>
                <h3 className="cat-featured-title">{featured.title}</h3>
                <p className="cat-featured-desc">{featured.description}</p>
                
                <span className="cat-featured-cta">
                  {featured.cta}
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          )}

          {/* Secondary Cards */}
          {secondary.map((cat, index) => (
            <Link
              key={cat.key}
              href={cat.href}
              className={`cat-card-secondary ${index < 2 ? 'cat-card-wide' : ''}`}
            >
              <div className="cat-secondary-img">
                <img src={cat.img} alt={cat.title} />
              </div>
              
              <div className="cat-secondary-content">
                <div className="cat-secondary-text">
                  <span className="cat-secondary-label">{cat.label}</span>
                  <h3 className="cat-secondary-title">{cat.title}</h3>
                  <p className="cat-secondary-desc">{cat.description}</p>
                </div>
                
                <span className="cat-secondary-arrow" aria-label="Ver produtos">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile - Swipeable Slider */}
      <div
        ref={sliderRef}
        className="cats-slider-mobile"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {mobileCats.map((cat, i) => (
          <Link
            key={`${cat.key}-${i}`}
            href={cat.href}
            className="cat-card-mobile"
            onClick={() => setIsPaused(true)}
          >
            <div className="cat-mobile-img">
              <img src={cat.img} alt={cat.title} />
            </div>
            <div className="cat-mobile-content">
              <span className="cat-mobile-label">{cat.label}</span>
              <h3 className="cat-mobile-title">{cat.title}</h3>
              <p className="cat-mobile-desc">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
