"use client";

import Link from "next/link";

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

const GROUPS = [
  {
    label: "Mais procurados",
    layout: "featured",
    cats: [
      {
        key: "melhores",
        type: "Seleção especial",
        label: "Mais Vendidos",
        title: "Melhores Produtos",
        description: "Nossa seleção dos produtos mais populares e bem avaliados pelos clientes.",
        img: "/Melhorador em pó.jpeg",
        href: "/produtos?sort=popular",
        featured: true,
        tag: "Top vendas",
        cta: "Ver todos os destaques",
        count: null,
      },
      {
        key: "base",
        type: "Fundações",
        label: "Bases",
        title: "Bases Prontas",
        description: "Soluções completas para panificação com máxima performance.",
        img: "/Amido de milho.jpeg",
        href: "/produtos?cat=base",
        count: 5,
      },
      {
        key: "fermentacao",
        type: "Biológicos",
        label: "Fermentação",
        title: "Fermentação",
        description: "Fermentos e melhoradores biológicos de alta qualidade.",
        img: "/Fermento quimico em pó.jpeg",
        href: "/produtos?cat=fermentacao",
        count: 3,
      },
    ],
  },
  {
    label: "Tecnologia & processamento",
    layout: "equal",
    cats: [
      {
        key: "enzima",
        type: "Bioquímica",
        label: "Enzimas",
        title: "Enzimas",
        description: "Tecnologia enzimática para melhorar textura e shelf life.",
        img: "/Chocolate em pó.jpeg",
        href: "/produtos?cat=enzima",
        count: 2,
      },
      {
        key: "melhoradores",
        type: "Aditivos",
        label: "Melhoradores",
        title: "Melhoradores",
        description: "Aditivos para otimizar processos e resultados da produção.",
        img: "/Melhorador em pó.jpeg",
        href: "/produtos?cat=melhoradores",
        count: 4,
      },
      {
        key: "emulsificantes",
        type: "Estabilizantes",
        label: "Emulsificantes",
        title: "Emulsificantes",
        description: "Estabilizantes para cremes, recheios e massas de alto padrão.",
        img: "/Amido de milho.jpeg",
        href: "/produtos?cat=emulsificantes",
        count: 4,
      },
    ],
  },
];

function CountPill({ count }: { count: number }) {
  return (
    <span className="cat-count-pill">
      <span className="cat-count-dot" />
      {count} produto{count !== 1 ? "s" : ""}
    </span>
  );
}

type Cat = {
  key: string;
  type?: string;
  label: string;
  title: string;
  description: string;
  img: string;
  href: string;
  featured?: boolean;
  tag?: string;
  cta?: string;
  count?: number | null;
};

function FeaturedCard({ cat }: { cat: Cat }) {
  return (
    <Link href={cat.href} className="cat-card cat-card--featured">
      {cat.tag && <span className="cat-tag">{cat.tag}</span>}
      <div className="cat-img-wrap">
        <img src={cat.img} alt={cat.title} className="cat-img" />
      </div>
      <div className="cat-body">
        {cat.type && <span className="cat-type">{cat.type}</span>}
        <h3 className="cat-name cat-name--lg">{cat.title}</h3>
        <p className="cat-desc">{cat.description}</p>
        <div className="cat-footer">
          <span className="cat-cta">{cat.cta}</span>
          <span className="cat-arrow" aria-hidden="true">
            <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SecondaryCard({ cat }: { cat: Cat }) {
  return (
    <Link href={cat.href} className="cat-card cat-card--secondary">
      <div className="cat-img-wrap">
        <img src={cat.img} alt={cat.title} className="cat-img" />
      </div>
      <div className="cat-body">
        {cat.type && <span className="cat-type">{cat.type}</span>}
        <h3 className="cat-name">{cat.title}</h3>
        <p className="cat-desc">{cat.description}</p>
        <div className="cat-footer">
          {cat.count != null ? (
            <CountPill count={cat.count} />
          ) : (
            <span />
          )}
          <span className="cat-arrow" aria-hidden="true">
            <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CategoriesSection() {
  return (
    <>
      <style>{`
        .cats-section {
          padding: 4rem 1.5rem 3rem;
          max-width: 1200px;
          margin-inline: auto;
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 20px;
          margin: 2rem auto;
        }

        /* Header */
        .cats-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .cats-kicker {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8B6B3D;
          margin: 0 0 0.5rem;
        }
        .cats-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 600;
          margin: 0 0 0.6rem;
          line-height: 1.2;
          color: #1a1208;
        }
        .cats-subtitle {
          font-size: 15px;
          color: #6b6050;
          margin: 0 auto;
          max-width: 420px;
          line-height: 1.6;
        }

        /* Groups */
        .cats-groups {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .group-label-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 0.75rem;
        }
        .group-line {
          flex: 1;
          height: 1px;
          background: #e8ddd0;
        }
        .group-badge {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid #e8ddd0;
          color: #8B6B3D;
          white-space: nowrap;
        }

        /* Grids */
        .cats-grid--featured {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 16px;
          grid-auto-rows: 1fr;
        }
        .cats-grid--equal {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          grid-auto-rows: 1fr;
        }

        /* Cards base */
        .cat-card {
          position: relative;
          border-radius: 16px;
          border: 1px solid #e5e5e5;
          background: #ffffff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          height: 100%;
        }
        .cat-card:hover {
          border-color: #c8893a;
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(200, 137, 58, 0.15);
        }

        /* Image */
        .cat-img-wrap {
          width: 100%;
          height: 180px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
        }
        .cat-card--featured .cat-img-wrap {
          height: 220px;
        }
        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .cat-card:hover .cat-img {
          transform: scale(1.05);
        }

        /* Tag flutuante */
        .cat-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          background: #c8893a;
          color: #fff;
          box-shadow: 0 2px 8px rgba(200, 137, 58, 0.3);
        }

        /* Body */
        .cat-body {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          background: #ffffff;
        }
        .cat-card--featured .cat-body {
          padding: 1.5rem;
        }

        .cat-type {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c8893a;
          background: rgba(200, 137, 58, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          width: fit-content;
        }
        .cat-name {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          margin: 0;
          line-height: 1.25;
          color: #1a1008;
        }
        .cat-name--lg {
          font-size: 20px;
        }
        .cat-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.5;
          margin: 0;
          flex: 1;
        }
        .cat-card--featured .cat-desc {
          font-size: 14px;
        }

        /* Footer */
        .cat-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #f0f0f0;
        }
        .cat-cta {
          font-size: 12px;
          font-weight: 600;
          color: #c8893a;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .cat-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8893a;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .cat-card:hover .cat-arrow {
          background: #c8893a;
          color: #fff;
          border-color: #c8893a;
        }

        /* Count pill */
        .cat-count-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #666;
          font-weight: 500;
          background: #f8f9fa;
          padding: 4px 8px;
          border-radius: 12px;
        }
        .cat-count-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c8893a;
          flex-shrink: 0;
        }

        /* Mobile grid */
        .cats-mobile-grid {
          display: none;
        }

        @media (max-width: 768px) {
          .cats-section {
            margin: 1rem;
            padding: 2rem 1rem;
            border-radius: 12px;
          }
          .cats-grid--featured,
          .cats-grid--equal {
            display: none;
          }
          .cats-groups {
            display: none;
          }
          .cats-mobile-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 2rem;
          }
          .cat-card-mobile {
            border-radius: 12px;
            border: 1px solid #e5e5e5;
            background: #ffffff;
            overflow: hidden;
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            height: 100%;
            transition: all 0.3s ease;
          }
          .cat-card-mobile:hover {
            border-color: #c8893a;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(200, 137, 58, 0.15);
          }
          .cat-mobile-img {
            width: 100%;
            height: 120px;
            overflow: hidden;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            position: relative;
          }
          .cat-mobile-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
          }
          .cat-card-mobile:hover .cat-mobile-img img {
            transform: scale(1.05);
          }
          .cat-mobile-body {
            padding: 0.8rem;
            display: flex;
            flex-direction: column;
            gap: 4px;
            flex: 1;
          }
          .cat-mobile-type {
            font-size: 8px;
            font-weight: 500;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #c8893a;
            background: rgba(200, 137, 58, 0.1);
            padding: 2px 4px;
            border-radius: 3px;
            width: fit-content;
          }
          .cat-mobile-name {
            font-family: 'Playfair Display', serif;
            font-size: 14px;
            font-weight: 700;
            margin: 0;
            color: #1a1008;
            line-height: 1.2;
          }
          .cat-mobile-desc {
            font-size: 11px;
            color: #666;
            line-height: 1.4;
            margin: 0;
          }
        }
      `}</style>

      <section className="cats-section" aria-labelledby="cats-heading">
        <div className="cats-header">
          <p className="cats-kicker">Explore por</p>
          <h2 id="cats-heading" className="cats-title">Nossas Categorias</h2>
          <p className="cats-subtitle">
            Produtos especializados para cada etapa da sua produção
          </p>
        </div>

        {/* Desktop */}
        <div className="cats-groups">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <div className="group-label-row">
                <span className="group-line" />
                <span className="group-badge">{group.label}</span>
                <span className="group-line" />
              </div>

              <div className={group.layout === "featured" ? "cats-grid--featured" : "cats-grid--equal"}>
                {group.cats.map((cat) =>
                  cat.featured ? (
                    <FeaturedCard key={cat.key} cat={cat} />
                  ) : (
                    <SecondaryCard key={cat.key} cat={cat} />
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Grid - Todas as categorias juntas */}
        <div className="cats-mobile-grid">
          {GROUPS.flatMap((g) => g.cats).map((cat) => (
            <Link key={cat.key} href={cat.href} className="cat-card-mobile">
              <div className="cat-mobile-img">
                <img src={cat.img} alt={cat.title} />
              </div>
              <div className="cat-mobile-body">
                {cat.type && <span className="cat-mobile-type">{cat.type}</span>}
                <h3 className="cat-mobile-name">{cat.title}</h3>
                <p className="cat-mobile-desc">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}