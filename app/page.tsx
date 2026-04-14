"use client";

// NOTE: This file mirrors the original `index.html` structure, but React-ifies
// the product filter + modal + reveal animations.
export default function Home() {
  return <LandingPage />;
}

import { useEffect, useMemo, useState } from "react";

type ProductCategory =
  | "all"
  | "melhorador"
  | "base"
  | "enzima"
  | "fermentacao"
  | "gordura";

type Product = {
  id: string;
  cat: Exclude<ProductCategory, "all">;
  categoryLabel: string;
  name: string;
  desc: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  priceLabel: string;
  specs1: string;
  specs2: string;
  tags: string[];
  badgeClass?: "badge-new" | "badge-top" | "badge-pro";
  badgeText?: string;
};

function splitSpecs(specs: string) {
  return specs
    .split(" | ")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [label, ...rest] = s.split(":");
      return { label: label.trim(), value: rest.join(":").trim() };
    });
}

function LandingPage() {
  const products: Product[] = useMemo(
    () => [
      {
        id: "1",
        cat: "melhorador",
        categoryLabel: "Melhorador",
        name: "Melhorador de Massa Premium",
        desc: "Formulação de alta performance para massas de pão francês, baguetes e pães artesanais. Melhora volume, textura miolo, cor de casca e prolonga a vida útil em até 40% sem aditivos artificiais agressivos.",
        imageSrc: "/melhorador-massa.jpg",
        imageAlt: "Melhorador de Massa Premium",
        price: "R$ 98,50",
        priceLabel: "Por kg (emb. 5 kg)",
        specs1:
          "Embalagem: 5 kg | Validade: 18 meses | Dosagem: 0,5–1% sobre farinha | Armazenamento: local seco e fresco",
        specs2: "Aspecto pó bege | pH 6,2–6,8 | Umidade ≤ 10%",
        tags: ["Pão Francês", "Baguete", "Fatiado", "Artesanal"],
        badgeClass: "badge-top",
        badgeText: "Mais Vendido",
      },
      {
        id: "2",
        cat: "base",
        categoryLabel: "Base Pronta",
        name: "Base Integral Multigrãos",
        desc: "Base completa pronta para uso, com mix de grãos integrais, aveia, linhaça e sementes de girassol. Reduz tempo de produção em 60% mantendo perfil nutricional premium. Ideal para padarias com foco em saúde.",
        imageSrc: "/base-multigraos.jpg",
        imageAlt: "Base Integral Multigrãos",
        price: "R$ 74,00",
        priceLabel: "Por kg (emb. 10 kg)",
        specs1:
          "Embalagem: 10 kg | Validade: 12 meses | Dosagem: 50% sobre farinha base | Armazenamento: temperatura ambiente",
        specs2:
          "Cor marrom acastanhado | Aroma característico de grãos | Umidade ≤ 12%",
        tags: ["Integral", "Multigrãos", "Sem Conservantes", "Funcional"],
        badgeClass: "badge-new",
        badgeText: "Novo",
      },
      {
        id: "3",
        cat: "enzima",
        categoryLabel: "Enzima",
        name: "Complexo Enzimático AmilaMix",
        desc: "Blend de amilases, hemicelulases e xilanases de última geração para maximizar volume e maciez de pão de forma e pão de leite. Compatível com sistemas de fermentação direta e longa fermentação. Reduz teor de gordura na receita.",
        imageSrc: "/enzima-amilamix.jpg",
        imageAlt: "Complexo Enzimático AmilaMix",
        price: "R$ 215,00",
        priceLabel: "Por kg (emb. 1 kg)",
        specs1:
          "Embalagem: 1 kg | Validade: 24 meses | Dosagem: 20–50 ppm sobre farinha | Armazenamento: refrigerado",
        specs2: "Pó branco fluente | Atividade ≥ 3.500 SKB/g | Umidade ≤ 6%",
        tags: ["Pão de Forma", "Alta Hidrataçāo", "Industrial"],
        badgeClass: "badge-pro",
        badgeText: "Pro",
      },
      {
        id: "4",
        cat: "fermentacao",
        categoryLabel: "Fermentação",
        name: "Fermento Biológico Seco Instantâneo",
        desc: "Levedura Saccharomyces cerevisiae liofilizada de alta atividade. Fermentação consistente em qualquer temperatura ambiente entre 24°C e 38°C. Ideal para processos industriais contínuos com linha automatizada.",
        imageSrc: "/fermento-seco.jpg",
        imageAlt: "Fermento Biológico Seco Instantâneo",
        price: "R$ 42,90",
        priceLabel: "Por kg (emb. 500 g)",
        specs1:
          "Embalagem: 500 g e 10 kg | Validade: 24 meses | Dosagem: 0,5–1,5% | Armazenamento: temperatura ambiente (lacrado)",
        specs2: "Grânulos dourados | Atividade ≥ 70 U/g | Umidade ≤ 5%",
        tags: ["Industrial", "Automático", "Longa Validade"],
        badgeClass: "badge-top",
        badgeText: "Popular",
      },
      {
        id: "5",
        cat: "gordura",
        categoryLabel: "Gordura",
        name: "Gordura Vegetal Panificação Plus",
        desc: "Gordura hidrogenada zero trans especial para panificação. Confere maciez, leveza e durabilidade à massa. Excelente para croissant, brioche e pão de leite. Ponto de fusão controlado para laminação perfeita.",
        imageSrc: "/gordura-vegetal.jpg",
        imageAlt: "Gordura Vegetal Panificação Plus",
        price: "R$ 18,70",
        priceLabel: "Por kg (emb. 15 kg)",
        specs1:
          "Embalagem: 15 kg | Validade: 12 meses | Modo de uso: em temperatura ambiente | Armazenamento: local fresco e seco",
        specs2:
          "Aspecto branco cremoso | Ponto de fusão: 34–38°C | Índice de iodo ≤ 5",
        tags: ["Croissant", "Brioche", "Pão de Leite", "Laminados"],
        badgeClass: "badge-new",
        badgeText: "Novo",
      },
      {
        id: "6",
        cat: "melhorador",
        categoryLabel: "Melhorador",
        name: "Melhorador Especial Confeitaria",
        desc: "Formulação exclusiva para massas doces, bolos e cucas. Melhora textura, elasticidade e umidade do miolo. Garante padronização lote a lote em produções de larga escala. Com emulsificantes naturais e vitamina C.",
        imageSrc: "/melhorador-confeitaria.jpg",
        imageAlt: "Melhorador Especial Confeitaria",
        price: "R$ 112,00",
        priceLabel: "Por kg (emb. 5 kg)",
        specs1:
          "Embalagem: 5 kg | Validade: 15 meses | Dosagem: 1–2% sobre farinha | Armazenamento: local seco e fresco",
        specs2: "Pó levemente amarelado | pH 5,8–6,5 | Umidade ≤ 8%",
        tags: ["Bolos", "Cucas", "Confeitaria", "Doces"],
        badgeClass: "badge-pro",
        badgeText: "Pro",
      },
      {
        id: "7",
        cat: "base",
        categoryLabel: "Base Pronta",
        name: "Base Ciabatta Italiana",
        desc: "Fórmula autêntica para produção de ciabatta com alvéolos irregulares e casca crocante característica. Permite alta hidratação (até 85%) sem perda de estrutura. Resultado artesanal em escala industrial.",
        imageSrc: "/base-ciabatta.jpg",
        imageAlt: "Base Ciabatta Italiana",
        price: "R$ 88,50",
        priceLabel: "Por kg (emb. 5 kg)",
        specs1:
          "Embalagem: 5 kg | Validade: 12 meses | Dosagem: 100% base + 60–85% água | Armazenamento: temperatura ambiente",
        specs2: "Pó bege claro | Absorção de água 70–85% | Umidade ≤ 10%",
        tags: ["Ciabatta", "Italiana", "Alta Hidratação", "Artesanal"],
        badgeClass: "badge-new",
        badgeText: "Novo",
      },
      {
        id: "8",
        cat: "enzima",
        categoryLabel: "Enzima",
        name: "GlucoxEnzyme Anti-Envelhecimento",
        desc: "Tecnologia de ponta com glucose oxidase e lipase microbiana para retardar o envelhecimento da massa e prolongar a maciez do miolo em até 5 dias. Essencial para pães embalados e distribuídos em redes supermercadistas.",
        imageSrc: "/enzima-glucox.jpg",
        imageAlt: "GlucoxEnzyme Anti-Envelhecimento",
        price: "R$ 380,00",
        priceLabel: "Por kg (emb. 500 g)",
        specs1:
          "Embalagem: 500 g | Validade: 18 meses | Dosagem: 10–30 ppm | Armazenamento: refrigerado 4–8°C",
        specs2:
          "Pó branco | Atividade Glucose Oxidase ≥ 500 U/g | pH ótimo 5–7",
        tags: ["Pão Embalado", "Rede", "Anti-Staling"],
        badgeClass: "badge-pro",
        badgeText: "Pro",
      },
      {
        id: "9",
        cat: "fermentacao",
        categoryLabel: "Fermentação",
        name: "Massa Fermentada Natural",
        desc: "Cultura viva de Lactobacillus sanfranciscensis e leveduras selvagens, produzida em substrato de farinha de trigo integral. Proporciona sabor ácido equilibrado, aroma complexo e textura rústica sem aditivos. Produto refrigerado.",
        imageSrc: "/massa-fermentada.jpg",
        imageAlt: "Massa Fermentada Natural",
        price: "R$ 62,00",
        priceLabel: "Por kg (emb. 1 kg)",
        specs1:
          "Embalagem: 1 kg (refrigerado) | Validade: 30 dias | Dosagem: 10–20% sobre farinha | Armazenamento: 2–6°C",
        specs2:
          "Pasta pastosa marrom clara | pH 3,5–4,0 | Contagem ≥ 10^8 UFC/g",
        tags: ["Sourdough", "Artesanal", "Fermentação Natural"],
        badgeClass: "badge-new",
        badgeText: "Novo",
      },
    ],
    [],
  );

  const [activeCat, setActiveCat] = useState<ProductCategory>("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    if (activeCat === "all") return products;
    return products.filter((p) => p.cat === activeCat);
  }, [activeCat, products]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  const modalSpecs = useMemo(() => {
    if (!selected) return [];
    return [...splitSpecs(selected.specs1), ...splitSpecs(selected.specs2)];
  }, [selected]);

  return (
    <>
      {/* ── NAV ── */}
      <nav>
        <div className="nav-logo">
          <img src="/Logo.png" alt="C2 Aditivos" />
          <span style={{ color: "var(--crust)" }}>C2</span>{" "}
          <span>Aditivos</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#sobre">Sobre</a>
          </li>
          <li>
            <a href="#produtos">Produtos</a>
          </li>
          <li>
            <a href="#clientes">Clientes</a>
          </li>
        </ul>
        <a href="https://wa.me/82987317923" className="nav-cta">
          Solicitar Orçamento
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Abrir menu"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`mobile-nav-overlay ${mobileNavOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileNavOpen(false);
        }}
      >
        <div className="mobile-nav">
          <button
            type="button"
            className="mobile-nav-close"
            aria-label="Fechar menu"
            onClick={() => setMobileNavOpen(false)}
          >
            ✕
          </button>
          <a href="#sobre" onClick={() => setMobileNavOpen(false)}>
            Sobre
          </a>
          <a href="#produtos" onClick={() => setMobileNavOpen(false)}>
            Produtos
          </a>
          <a href="#clientes" onClick={() => setMobileNavOpen(false)}>
            Clientes
          </a>
          <a
            href="https://wa.me/82987317923"
            className="mobile-nav-cta"
            onClick={() => setMobileNavOpen(false)}
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grain" />

        <div className="hero-content">
          <div className="hero-eyebrow">
            <img
              src="/Logo.png"
              alt="C2 Aditivos"
              style={{
                height: 28,
                width: "auto",
                borderRadius: 0,
                objectFit: "contain",
                marginRight: ".4rem",
              }}
            />
            Indústria de Panificação desde 1992
          </div>
          <h1>
            A qualidade que
            <br />
            <em>você merece</em>
          </h1>
          <p className="hero-desc">
            Oferecemos os melhores ingredientes para panificação, garantindo
            sabor, textura e aroma inesquecíveis.
          </p>
          <div className="hero-actions">
            <a href="#produtos" className="btn-primary">
              Explorar Produtos
            </a>
            <a href="#sobre" className="btn-ghost">
              Conheça a Empresa
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrap">
            <img
              src="/different-types-bread-made-from-wheat-flour.jpg"
              alt="Diferentes tipos de pão"
            />
          </div>
          <div className="hero-stat-row">
            <div className="hero-stat">
              <strong>32+</strong>
              <span>Anos de mercado</span>
            </div>
            <div className="hero-stat">
              <strong>1.200</strong>
              <span>Clientes ativos</span>
            </div>
            <div className="hero-stat">
              <strong>100%</strong>
              <span>Sabor para você</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about" id="sobre">
        <div className="about-text reveal">
          <div className="section-label">Quem Somos</div>
          <h2 className="section-title">
            Três décadas entregando o melhor para sua{" "}
            <em>panificação brasileira</em>
          </h2>
          <p className="about-body">
            Desde 1992, a C2 Aditivos atua no mercado de alimentos com o
            propósito de levar mais qualidade, praticidade e consistência para o
            dia a dia da panificação. Nascida da visão de profissionais da área
            de alimentos, a marca construiu sua trajetória atendendo diferentes
            perfis de clientes em todo o Brasil.
          </p>
          <p className="about-body">
            Hoje, trabalhamos com a comercialização e desenvolvimento de
            produtos alimentícios, incluindo aditivos, melhoradores e bases para
            pães, doces e massas — sempre com foco em desempenho e padronização.
          </p>
          <p className="about-body">
            Atendemos desde padarias e confeitarias até comércios e operações
            alimentícias que buscam regularidade no resultado e confiança no
            fornecimento.
          </p>
          <a href="#produtos" className="btn-primary">
            Ver Linha de Produtos
          </a>
        </div>

        <div className="about-visual reveal">
          <div className="about-card-main">
            <img
              src="/close-up-challah-dish-hanukkah.jpg"
              alt="Panificação artesanal"
            />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-banner">
        <div className="stat-item reveal">
          <strong>32</strong>
          <p>Anos de experiência no setor</p>
        </div>
        <div className="stat-item reveal">
          <strong>1.200+</strong>
          <p>Clientes em todo o Brasil</p>
        </div>
        <div className="stat-item reveal">
          <strong>48</strong>
          <p>Produtos no portfólio ativo</p>
        </div>
        <div className="stat-item reveal">
          <strong>18</strong>
          <p>Estados atendidos com entrega própria</p>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section className="products" id="produtos">
        <div className="products-header reveal">
          <div className="section-label">Portfólio Completo</div>
          <h2 className="section-title">
            Nossos <em>Produtos</em>
          </h2>
          <p>
            Da formulação ao acabamento — soluções técnicas para cada etapa do
            processo de panificação.
          </p>
        </div>

        <div className="products-filter reveal">
          <button
            className={`filter-btn ${activeCat === "all" ? "active" : ""}`}
            onClick={() => setActiveCat("all")}
            type="button"
          >
            Todos
          </button>
          <button
            className={`filter-btn ${
              activeCat === "melhorador" ? "active" : ""
            }`}
            onClick={() => setActiveCat("melhorador")}
            type="button"
          >
            Melhoradores
          </button>
          <button
            className={`filter-btn ${activeCat === "base" ? "active" : ""}`}
            onClick={() => setActiveCat("base")}
            type="button"
          >
            Bases Prontas
          </button>
          <button
            className={`filter-btn ${activeCat === "enzima" ? "active" : ""}`}
            onClick={() => setActiveCat("enzima")}
            type="button"
          >
            Enzimas
          </button>
          <button
            className={`filter-btn ${
              activeCat === "fermentacao" ? "active" : ""
            }`}
            onClick={() => setActiveCat("fermentacao")}
            type="button"
          >
            Fermentação
          </button>
          <button
            className={`filter-btn ${activeCat === "gordura" ? "active" : ""}`}
            onClick={() => setActiveCat("gordura")}
            type="button"
          >
            Gorduras
          </button>
        </div>

        <div className="products-grid" id="productsGrid">
          {visibleProducts.map((p) => (
            <div
              key={p.id}
              className="product-card"
              data-cat={p.cat}
              onClick={() => setSelected(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelected(p);
              }}
            >
              <div className="product-img">
                <img
                  src={p.imageSrc}
                  alt={p.imageAlt || p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                    display: "block",
                  }}
                />
              </div>
              {p.badgeClass && p.badgeText ? (
                <span className={`product-badge ${p.badgeClass}`}>
                  {p.badgeText}
                </span>
              ) : null}
              <div className="product-body">
                <div className="product-category">{p.categoryLabel}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-desc">{p.desc}</div>
                <div className="product-tags">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="product-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="product-footer">
                  <div className="product-price">
                    {p.price} <small>por kg · emb. {p.priceLabel}</small>
                  </div>
                  <button className="product-cta" type="button">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

     

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials" id="clientes">
        <div className="testimonials-header reveal">
          <div className="section-label">Depoimentos</div>
          <h2 className="section-title">
            O que dizem nossos <em>clientes</em>
          </h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card reveal">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              &quot;Desde que adotamos o Melhorador Premium da C2 Aditivos, nossos
              pães franceses ganharam volume e padronização absurdos. A vida
              útil aumentou e as reclamações de pão &apos;borachudo&apos;
              acabaram.&quot;
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">M</div>
              <div>
                <div className="author-name">Marcelo Ferreira</div>
                <div className="author-role">
                  Padaria Ferreira &amp; Filhos — São Paulo, SP
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-card reveal">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              &quot;O suporte técnico é diferenciado. Quando tivemos dúvidas sobre
              dosagem para longa fermentação, o time da C2 Aditivos veio até
              nossa fábrica e ajustou a fórmula sem custo adicional.&quot;
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">A</div>
              <div>
                <div className="author-name">Ana Lima</div>
                <div className="author-role">
                  Diretora Industrial — Grupo Trigão — Campinas, SP
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-card reveal">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              &quot;Trabalhamos com 15 fornecedores de melhoradores ao longo dos
              anos. C2 Aditivos é o único que entrega consistência lote a lote e
              documentação completa sem precisar pedir.&quot;
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">R</div>
              <div>
                <div className="author-name">Ricardo Alves</div>
                <div className="author-role">
                  Gestor de Qualidade — Rede Ouro Pão — Belo Horizonte, MG
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contato">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="nav-logo">
              C2<span>Aditivos</span>
            </span>
            <p className="footer-about">
              Mais de três décadas fornecendo ingredientes técnicos de alta
              qualidade para a indústria de panificação brasileira. Ciência,
              tradição e confiança em cada lote.
            </p>
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            <ul className="footer-links">
              <li>
                <a href="#sobre">Sobre nós</a>
              </li>
              <li>
                <a href="#">Política de Qualidade</a>
              </li>
              <li>
                <a href="#">Trabalhe Conosco</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Produtos</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Melhoradores</a>
              </li>
              <li>
                <a href="#">Bases Prontas</a>
              </li>
              <li>
                <a href="#">Enzimas</a>
              </li>
              <li>
                <a href="#">Fermentação</a>
              </li>
              <li>
                <a href="#">Gorduras</a>
              </li>
              <li>
                <a href="#">Catálogo Completo (PDF)</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <div className="contact-icons">
              <a
                href="https://www.instagram.com/c2aditivos/"
                target="_blank"
                className="contact-icon-link"
                aria-label="Instagram"
                rel="noreferrer"
                title="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href="https://maps.google.com/?q=Rua+das+Industrias+1420+Sao+Paulo"
                target="_blank"
                className="contact-icon-link"
                aria-label="Abrir localização no mapa"
                rel="noreferrer"
                title="Localização"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
              <a
                href="https://wa.me/82987317923"
                target="_blank"
                className="contact-icon-link"
                aria-label="Conversar no WhatsApp"
                rel="noreferrer"
                title="WhatsApp"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2024 C2 Aditivos Indústria de Panificação Ltda. CNPJ
            12.345.678/0001-99. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* ── MODAL ── */}
      <div
        className={`modal-overlay ${selected ? "open" : ""}`}
        id="modalOverlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
      >
        <div className="modal" id="modal" role="dialog" aria-modal="true">
          <button
            className="modal-close"
            onClick={() => setSelected(null)}
            type="button"
            aria-label="Fechar"
          >
            ✕
          </button>
          <div className="modal-img" id="modalImg">
            {selected ? (
              <img
                src={selected.imageSrc}
                alt={selected.imageAlt || selected.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                  display: "block",
                }}
              />
            ) : null}
          </div>
          <div className="modal-body">
            <div className="modal-cat" id="modalCat">
              {selected?.cat
                ? selected.cat.charAt(0).toUpperCase() + selected.cat.slice(1)
                : ""}
            </div>
            <div className="modal-name" id="modalName">
              {selected?.name ?? ""}
            </div>
            <div className="modal-desc" id="modalDesc">
              {selected?.desc ?? ""}
            </div>
            <div className="modal-specs" id="modalSpecs">
              {modalSpecs.map((s, idx) => (
                <div className="spec" key={`${s.label}-${idx}`}>
                  <label>{s.label}</label>
                  <strong>{s.value}</strong>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <div className="modal-price" id="modalPrice">
                {selected ? (
                  <>
                    {selected.price} <small>{selected.priceLabel}</small>
                  </>
                ) : null}
              </div>
              <a
                href="#contato"
                className="btn-primary"
                onClick={() => setSelected(null)}
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}