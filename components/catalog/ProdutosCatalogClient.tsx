"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import FloatingCart from "@/components/catalog/FloatingCart";
import { CATEGORIES } from "@/lib/products";
import type { Product, ProductCategory } from "@/types";

type Sort = "popular" | "newest";

const VALID_CATS: ProductCategory[] = [
  "all",
  "fermento",
  "melhorador",
  "preparado",
  "conservante",
  "confeitaria",
  "ingrediente",
];

function parseCatFromUrl(raw: string | null): ProductCategory {
  if (raw && VALID_CATS.includes(raw as ProductCategory)) return raw as ProductCategory;
  return "all";
}

function parseSortFromUrl(raw: string | null): Sort {
  if (raw === "newest" || raw === "popular") return raw;
  return "popular";
}

function CatalogFallback() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <span>Produtos</span>
      </nav>
      <div className="catalog-wrapper" style={{ minHeight: "45vh" }} aria-busy="true" />
      <Footer />
    </>
  );
}

function ProdutosCatalogInner({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();

  const [activeCat, setActiveCat] = useState<ProductCategory>(() =>
    parseCatFromUrl(searchParams.get("cat"))
  );
  const [sort, setSort] = useState<Sort>(() => parseSortFromUrl(searchParams.get("sort")));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (searchParams.has("cat")) setActiveCat(parseCatFromUrl(searchParams.get("cat")));
    if (searchParams.has("sort")) setSort(parseSortFromUrl(searchParams.get("sort")));
  }, [searchParams]);

  const qFilter = (searchParams.get("q") ?? "").trim().toLowerCase();

  const visible = useMemo(() => {
    let list = activeCat === "all" ? [...products] : products.filter((p) => p.cat === activeCat);
    if (qFilter) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(qFilter) ||
          p.categoryLabel.toLowerCase().includes(qFilter) ||
          p.desc.toLowerCase().includes(qFilter)
      );
    }
    if (sort === "newest") list = list.filter((p) => p.badgeClass === "badge-new").concat(list.filter((p) => p.badgeClass !== "badge-new"));
    return list;
  }, [products, activeCat, sort, qFilter]);

  const resetFilters = () => {
    setActiveCat("all");
  };

  return (
    <>
      <AnnouncementBar />
      <Header />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <span>Produtos</span>
      </nav>

      <div className="catalog-wrapper">
        <div className="catalog-mobile-bar">
          <button type="button" className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="18" y2="18" />
            </svg>
            Filtros
          </button>
          <span className="catalog-count">{visible.length} produto{visible.length !== 1 ? "s" : ""}</span>
          <select className="catalog-sort-select" value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Ordenar">
            <option value="popular">Mais Populares</option>
            <option value="newest">Novidades</option>
          </select>
        </div>

        <div className="catalog-layout">
          <aside className={`catalog-sidebar${sidebarOpen ? " open" : ""}`}>
            <div className="sidebar-head">
              <span className="sidebar-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="18" y2="18" />
                </svg>
                Filtros
              </span>
              <div className="sidebar-head-actions">
                <button type="button" className="sidebar-reset" onClick={resetFilters}>Limpar</button>
                <button type="button" className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Fechar filtros">
                  ✕
                </button>
              </div>
            </div>

            <div className="sidebar-section">
              <h4 className="sidebar-section-title">Categoria</h4>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`sidebar-filter-item${activeCat === cat.key ? " active" : ""}`}
                  onClick={() => setActiveCat(cat.key)}
                >
                  <span>{cat.label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>


            <button type="button" className="sidebar-apply-btn" onClick={() => setSidebarOpen(false)}>
              Aplicar Filtros
            </button>
          </aside>

          {sidebarOpen && (
            <div className="catalog-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          )}

          <main className="catalog-main">
            <div className="catalog-toolbar">
              <span className="catalog-count">{visible.length} produto{visible.length !== 1 ? "s" : ""} encontrado{visible.length !== 1 ? "s" : ""}</span>
              <div className="catalog-sort">
                <label htmlFor="sort-select">Ordenar por:</label>
                <select id="sort-select" className="catalog-sort-select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                  <option value="popular">Mais Populares</option>
                  <option value="newest">Novidades</option>
                </select>
              </div>
            </div>

            {visible.length === 0 ? (
              <div className="catalog-empty">
                <p>Nenhum produto encontrado com esses filtros.</p>
                <button type="button" className="btn-dark" onClick={resetFilters}>Limpar Filtros</button>
              </div>
            ) : (
              <div className="catalog-grid">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
      <FloatingCart />
    </>
  );
}

export default function ProdutosCatalogClient({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <ProdutosCatalogInner products={products} />
    </Suspense>
  );
}
