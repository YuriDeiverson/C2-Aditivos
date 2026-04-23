"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES, products as CATALOG } from "@/lib/products";
import type { ProductCategory } from "@/types";

const VALID: ProductCategory[] = [
  "all",
  "fermento",
  "melhorador",
  "preparado",
  "conservante",
  "confeitaria",
  "ingrediente",
];

function parseCat(raw: string | null): ProductCategory {
  if (raw && VALID.includes(raw as ProductCategory)) return raw as ProductCategory;
  return "all";
}

function HeaderCategorySelectInner() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const isCatalog = pathname === "/produtos";
  const catValue = isCatalog ? parseCat(sp.get("cat")) : "placeholder";

  const onCatChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const v = e.target.value as ProductCategory | "placeholder";
      if (v === "placeholder") return;
      router.push(v === "all" ? "/produtos" : `/produtos?cat=${v}`);
    },
    [router]
  );

  return (
    <div className="nav-cat-wrap">
      <label htmlFor="nav-categorias" className="sr-only">
        Categorias
      </label>
      <select
        id="nav-categorias"
        className="nav-cat-select"
        value={catValue}
        onChange={onCatChange}
        aria-label="Categorias"
      >
        <option value="placeholder" disabled={isCatalog}>
          Categorias
        </option>
        {CATEGORIES.map((c) => (
          <option key={c.key} value={c.key}>
            {c.label}
          </option>
        ))}
      </select>
      <span className="nav-cat-chevron" aria-hidden>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}

function HeaderCategorySelectFallback() {
  return (
    <div className="nav-cat-wrap nav-cat-wrap--skeleton" aria-hidden>
      <span className="nav-cat-select nav-cat-select--skeleton">Categorias</span>
      <span className="nav-cat-chevron" aria-hidden>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}

export function HeaderCategorySelect() {
  return (
    <Suspense fallback={<HeaderCategorySelectFallback />}>
      <HeaderCategorySelectInner />
    </Suspense>
  );
}

function HeaderSearchFormInner() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const q = pathname === "/produtos" ? sp.get("q") ?? "" : "";
  const [query, setQuery] = useState(q);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      const t = e.target as Node | null;
      if (t && !wrapRef.current.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const suggestions = useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return [];
    const list = CATALOG.filter((p) => {
      return (
        p.name.toLowerCase().includes(raw) ||
        p.categoryLabel.toLowerCase().includes(raw) ||
        p.desc.toLowerCase().includes(raw)
      );
    });
    return list.slice(0, 6);
  }, [query]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const raw = query.trim();
      const params = new URLSearchParams();
      if (pathname === "/produtos") {
        const cat = sp.get("cat");
        const sort = sp.get("sort");
        if (cat) params.set("cat", cat);
        if (sort) params.set("sort", sort);
      }
      if (raw) params.set("q", raw);
      const qs = params.toString();
      router.push(qs ? `/produtos?${qs}` : "/produtos");
      setOpen(false);
    },
    [pathname, query, router, sp]
  );

  return (
    <form className="nav-ref-search-inner" role="search" onSubmit={onSubmit}>
      <div className="nav-ref-search-field" ref={wrapRef}>
        <svg className="nav-ref-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Buscar produtos..."
          className="nav-ref-search-input"
          aria-label="Buscar produtos"
          aria-expanded={open}
          aria-controls="nav-search-suggestions"
          autoComplete="off"
        />

        {open && suggestions.length > 0 && (
          <div id="nav-search-suggestions" className="nav-search-suggest" role="listbox">
            {suggestions.map((p) => (
              <button
                key={p.id}
                type="button"
                className="nav-search-suggest-item"
                onClick={() => {
                  router.push(`/produtos/${p.slug}`);
                  setOpen(false);
                }}
              >
                <span className="nav-search-suggest-thumb" aria-hidden>
                  <img src={p.imageSrc} alt="" />
                </span>
                <span className="nav-search-suggest-meta">
                  <span className="nav-search-suggest-name">{p.name}</span>
                  <span className="nav-search-suggest-cat">{p.categoryLabel}</span>
                </span>
              </button>
            ))}
            <button
              type="button"
              className="nav-search-suggest-all"
              onClick={() => {
                const raw = query.trim();
                if (!raw) return;
                const params = new URLSearchParams();
                if (pathname === "/produtos") {
                  const cat = sp.get("cat");
                  const sort = sp.get("sort");
                  if (cat) params.set("cat", cat);
                  if (sort) params.set("sort", sort);
                }
                params.set("q", raw);
                router.push(`/produtos?${params.toString()}`);
                setOpen(false);
              }}
            >
              Ver todos os resultados para “{query.trim()}”
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

function HeaderSearchFormFallback() {
  return (
    <form action="/produtos" method="get" className="nav-ref-search-inner" role="search">
      <div className="nav-ref-search-field">
        <svg className="nav-ref-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          name="q"
          placeholder="Buscar produtos..."
          className="nav-ref-search-input"
          aria-label="Buscar produtos"
        />
      </div>
    </form>
  );
}

export function HeaderSearchForm() {
  return (
    <Suspense fallback={<HeaderSearchFormFallback />}>
      <HeaderSearchFormInner />
    </Suspense>
  );
}
