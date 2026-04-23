"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { adminDeleteCatalogProduct, adminInsertCatalogProduct, adminUpsertCatalogProduct } from "@/app/actions/admin";
import type { CatalogProductRow } from "@/types/admin";

export type ProductAdminRow = CatalogProductRow & { stock: number; sold: number };

const CATS = [
  { key: "melhorador", label: "Melhorador" },
  { key: "base", label: "Base Pronta" },
  { key: "enzima", label: "Enzima" },
  { key: "fermentacao", label: "Fermentação" },
  { key: "gordura", label: "Gordura" },
];

function StockBar({ qty, max = 200 }: { qty: number; max?: number }) {
  const pct = Math.min(100, Math.round((qty / max) * 100));
  return (
    <div className="admin-stock-bar" title={`${qty} un.`}>
      <div className="admin-stock-bar-fill" style={{ width: `${pct}%` }} data-low={qty <= 10 ? "1" : undefined} />
      <span>{qty}</span>
    </div>
  );
}

export default function AdminProductsClient({ rows }: { rows: ProductAdminRow[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "low" | "zero">("all");
  const [modal, setModal] = useState<null | { mode: "add" } | { mode: "edit"; row: ProductAdminRow }>(null);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filter === "low") return r.stock > 0 && r.stock <= 10;
      if (filter === "zero") return r.stock === 0;
      return true;
    });
  }, [rows, filter]);

  return (
    <>
      <div className="admin-toolbar">
        <div className="admin-toolbar-field">
          <label htmlFor="stock-filter">Estoque</label>
          <select id="stock-filter" className="admin-select" value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
            <option value="all">Todos</option>
            <option value="low">Baixo (≤10)</option>
            <option value="zero">Zerado</option>
          </select>
        </div>
        <button type="button" className="btn-dark admin-toolbar-btn" onClick={() => setModal({ mode: "add" })}>
          + Novo produto
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table admin-table--dense">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Vendido</th>
              <th>Activo</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>
                  <strong>{r.name}</strong>
                  <div className="admin-muted-id">#{r.id}</div>
                </td>
                <td>{r.category_label}</td>
                <td>R$ {Number(r.price_number).toFixed(2).replace(".", ",")}</td>
                <td>
                  <StockBar qty={r.stock} />
                </td>
                <td>{r.sold}</td>
                <td>{r.active ? "Sim" : "Não"}</td>
                <td className="admin-cell-actions">
                  <button type="button" className="admin-btn-sm" onClick={() => setModal({ mode: "edit", row: r })}>
                    Editar
                  </button>
                  <button
                    type="button"
                    className="admin-btn-sm admin-btn-sm--danger"
                    onClick={() => {
                      if (confirm("Remover produto e linha de stock?")) void adminDeleteCatalogProduct(r.id).then(() => router.refresh());
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="auth-muted admin-table-empty">Nenhum produto neste filtro.</p>}
      </div>

      {modal?.mode === "add" && <ProductFormModal title="Novo produto" onClose={() => setModal(null)} onSave={() => router.refresh()} />}
      {modal?.mode === "edit" && (
        <ProductFormModal title="Editar produto" initial={modal.row} onClose={() => setModal(null)} onSave={() => router.refresh()} />
      )}
    </>
  );
}

function ProductFormModal({
  title,
  initial,
  onClose,
  onSave,
}: {
  title: string;
  initial?: ProductAdminRow;
  onClose: () => void;
  onSave: () => void;
}) {
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [cat, setCat] = useState(initial?.cat ?? "melhorador");
  const [categoryLabel, setCategoryLabel] = useState(initial?.category_label ?? "Melhorador");
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imageSrc, setImageSrc] = useState(initial?.image_src ?? "");
  const [price, setPrice] = useState(initial ? String(initial.price_number) : "");
  const [stock, setStock] = useState(initial ? String(initial.stock) : "0");
  const [active, setActive] = useState(initial?.active ?? true);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const priceNum = parseFloat(price.replace(",", "."));
      if (!Number.isFinite(priceNum) || priceNum < 0) throw new Error("Preço inválido.");
      const catMeta = CATS.find((c) => c.key === cat) ?? CATS[0];
      if (initial) {
        const st = parseInt(stock, 10);
        await adminUpsertCatalogProduct({
          id: initial.id,
          slug: slug || initial.slug,
          cat,
          category_label: categoryLabel || catMeta.label,
          name,
          description,
          image_src: imageSrc,
          price_number: priceNum,
          active,
          stock_quantity: Number.isFinite(st) ? st : undefined,
        });
      } else {
        const st = parseInt(stock, 10);
        await adminInsertCatalogProduct({
          slug,
          cat,
          category_label: categoryLabel || catMeta.label,
          name,
          description,
          image_src: imageSrc,
          price_number: priceNum,
          initial_stock: Number.isFinite(st) ? st : 0,
        });
      }
      onSave();
      onClose();
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal--wide" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-head">
          <h2>{title}</h2>
          <button type="button" className="admin-modal-close" aria-label="Fechar" onClick={onClose}>
            ✕
          </button>
        </div>
        <form className="admin-modal-body admin-form-grid" onSubmit={(e) => void onSubmit(e)}>
          {err && <p className="auth-error">{err}</p>}
          <label className="auth-label">
            Slug (URL)
            <input className="auth-input" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="meu-produto" required />
          </label>
          <label className="auth-label">
            Categoria
            <select className="auth-input" value={cat} onChange={(e) => setCat(e.target.value)}>
              {CATS.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="auth-label">
            Rótulo categoria
            <input className="auth-input" value={categoryLabel} onChange={(e) => setCategoryLabel(e.target.value)} />
          </label>
          <label className="auth-label">
            Nome
            <input className="auth-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="auth-label admin-form-span2">
            Descrição
            <textarea className="auth-input" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label className="auth-label">
            Imagem (path)
            <input className="auth-input" value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} placeholder="/foto.jpg" />
          </label>
          <label className="auth-label">
            Preço (R$)
            <input className="auth-input" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </label>
          <label className="auth-label">
            Estoque (un.)
            <input className="auth-input" type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} />
          </label>
          {initial && (
            <label className="auth-label admin-form-span2">
              <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> Produto activo na loja
            </label>
          )}
          <div className="admin-form-actions">
            <button type="button" className="admin-signout-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-dark" disabled={loading}>
              {loading ? "A guardar…" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
