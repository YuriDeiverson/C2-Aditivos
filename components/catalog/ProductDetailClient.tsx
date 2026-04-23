"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";

function splitSpecs(specs: string | null | undefined) {
  const safe = (specs ?? "").trim();
  if (!safe) return [];
  return safe
    .split(" | ")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [label, ...rest] = s.split(":");
      const value = rest.join(":").trim();
      if (!value) return { label: "Info", value: s };
      return { label: label.trim(), value };
    });
}

function toDisplayText(text: string): string {
  return (text ?? "").trim();
}

function normalizeLabel(label: string): string {
  return label.trim().toLowerCase();
}

const SPEC_PRIORITY: Record<string, number> = {
  ingredientes: 1,
  "alérgicos": 2,
  "alergicos": 2,
  glúten: 3,
  gluten: 3,
  "modo de usar": 4,
  aplicação: 5,
  aplicacao: 5,
  dosagem: 6,
  "sugestão de uso": 7,
  "sugestao de uso": 7,
  fermentação: 8,
  fermentacao: 8,
  armazenamento: 9,
  conservação: 10,
  conservacao: 10,
  observação: 11,
  observacao: 11,
  "tabela nutricional (por 100 g) — valor energético": 50,
  "tabela nutricional (por 100 g) — carboidratos": 51,
};

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "specs">("details");
  const [added, setAdded] = useState(false);

  const allSpecs = useMemo(
    () => {
      const list = [...splitSpecs(product.specs1), ...splitSpecs(product.specs2)];
      return list.sort((a, b) => {
        const pa = SPEC_PRIORITY[normalizeLabel(a.label)] ?? 999;
        const pb = SPEC_PRIORITY[normalizeLabel(b.label)] ?? 999;
        if (pa !== pb) return pa - pb;
        return a.label.localeCompare(b.label, "pt-BR");
      });
    },
    [product]
  );

  const descriptionText = useMemo(() => toDisplayText(product.desc), [product.desc]);
  const detailsText = useMemo(
    () => toDisplayText(product.details ?? product.desc),
    [product.details, product.desc]
  );

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <AnnouncementBar />
      <Header />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/produtos">Produtos</Link>
        <span>›</span>
        <span>{product.categoryLabel}</span>
        <span>›</span>
        <span>{product.name}</span>
      </nav>

      <div className="detail-layout">
        <div className="detail-gallery">
          <div className="detail-main-img">
            <img src={product.imageSrc} alt={product.imageAlt || product.name} />
          </div>
        </div>

        <div className="detail-info">
          <div className="detail-category">{product.categoryLabel}</div>
          <h1 className="detail-name">{product.name}</h1>

          <p className="detail-desc">{descriptionText}</p>

          <div className="detail-tags">
            {product.tags.map((t) => (
              <span key={t} className="detail-tag">{t}</span>
            ))}
          </div>

          <div className="detail-divider" />

          <div className="detail-actions">
            <div className="qty-control">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuir">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
              <span className="qty-value">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Aumentar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
            </div>

            <button className="detail-add-btn" type="button" onClick={handleAddToCart}>
              {added ? "✓ Adicionado!" : "Adicionar ao Carrinho"}
            </button>
          </div>

          <Link href="/carrinho" className="detail-wa-btn">
            Ver carrinho e finalizar compra
          </Link>
        </div>
      </div>

      <div className="detail-tabs-section">
        <div className="detail-tabs">
          {(["details", "specs"] as const).map((tab) => (
            <button
              key={tab}
              className={`detail-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab === "details" ? "Detalhes" : "Especificações"}
            </button>
          ))}
        </div>

        <div className="detail-tab-content">
          {activeTab === "details" && (
            <p className="detail-tab-text">{detailsText}</p>
          )}
          {activeTab === "specs" && (
            <div className="detail-specs-grid">
              {allSpecs.map((s, i) => (
                <div key={i} className="detail-spec-item">
                  <span className="detail-spec-label">{s.label}</span>
                  <span className="detail-spec-value">{s.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="detail-related">
          <h2 className="detail-related-title">Você também pode gostar</h2>
          <div className="detail-related-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
