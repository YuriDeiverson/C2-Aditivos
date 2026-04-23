"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminDeleteCoupon, adminUpsertCoupon } from "@/app/actions/admin";
import type { CouponRow } from "@/types/admin";

function formatBRL(n: number) {
  return `R$ ${n.toFixed(2).replace(".", ",")}`;
}

export default function AdminCouponsClient({ coupons }: { coupons: CouponRow[] }) {
  const router = useRouter();
  const [modal, setModal] = useState<null | { mode: "add" } | { mode: "edit"; row: CouponRow }>(null);

  const refresh = () => {
    router.refresh();
  };

  return (
    <>
      <div className="admin-toolbar">
        <button type="button" className="btn-dark admin-toolbar-btn" onClick={() => setModal({ mode: "add" })}>
          + Novo cupom
        </button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table admin-table--dense">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Uso</th>
              <th>Validade</th>
              <th>Activo</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id}>
                <td>
                  <code>{c.code}</code>
                </td>
                <td>{c.name}</td>
                <td>{c.discount_type === "percent" ? "%" : "Fixo"}</td>
                <td>{c.discount_type === "percent" ? `${c.discount_value}%` : formatBRL(c.discount_value)}</td>
                <td>
                  {c.used_count}
                  {c.max_uses != null ? ` / ${c.max_uses}` : ""}
                </td>
                <td>
                  <small>
                    {c.valid_from ? new Date(c.valid_from).toLocaleDateString("pt-BR") : "—"} —{" "}
                    {c.valid_until ? new Date(c.valid_until).toLocaleDateString("pt-BR") : "—"}
                  </small>
                </td>
                <td>{c.active ? "Sim" : "Não"}</td>
                <td className="admin-cell-actions">
                  <button type="button" className="admin-btn-sm" onClick={() => setModal({ mode: "edit", row: c })}>
                    Editar
                  </button>
                  <button
                    type="button"
                    className="admin-btn-sm admin-btn-sm--danger"
                    onClick={() => {
                      if (confirm("Excluir cupom?")) void adminDeleteCoupon(c.id).then(() => refresh());
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {coupons.length === 0 && <p className="auth-muted admin-table-empty">Nenhum cupom. Crie o primeiro.</p>}
      </div>

      {modal && (
        <CouponModal
          initial={modal.mode === "edit" ? modal.row : undefined}
          onClose={() => setModal(null)}
          onSave={() => refresh()}
        />
      )}
    </>
  );
}

function CouponModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: CouponRow;
  onClose: () => void;
  onSave: () => void;
}) {
  const [code, setCode] = useState(initial?.code ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">(initial?.discount_type ?? "percent");
  const [discountValue, setDiscountValue] = useState(initial ? String(initial.discount_value) : "10");
  const [maxUses, setMaxUses] = useState(initial?.max_uses != null ? String(initial.max_uses) : "");
  const [validFrom, setValidFrom] = useState(initial?.valid_from ? initial.valid_from.slice(0, 10) : "");
  const [validUntil, setValidUntil] = useState(initial?.valid_until ? initial.valid_until.slice(0, 10) : "");
  const [active, setActive] = useState(initial?.active ?? true);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const dv = parseFloat(discountValue.replace(",", "."));
      if (!Number.isFinite(dv) || dv <= 0) throw new Error("Valor inválido.");
      await adminUpsertCoupon({
        id: initial?.id,
        code,
        name,
        discount_type: discountType,
        discount_value: dv,
        max_uses: maxUses.trim() ? parseInt(maxUses, 10) : null,
        valid_from: validFrom ? new Date(validFrom + "T12:00:00").toISOString() : null,
        valid_until: validUntil ? new Date(validUntil + "T12:00:00").toISOString() : null,
        active,
      });
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
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-head">
          <h2>{initial ? "Editar cupom" : "Novo cupom"}</h2>
          <button type="button" className="admin-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form className="admin-modal-body admin-form-grid" onSubmit={(e) => void onSubmit(e)}>
          {err && <p className="auth-error">{err}</p>}
          <label className="auth-label">
            Código
            <input className="auth-input" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} required />
          </label>
          <label className="auth-label">
            Nome interno
            <input className="auth-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="auth-label">
            Tipo
            <select className="auth-input" value={discountType} onChange={(e) => setDiscountType(e.target.value as "percent" | "fixed")}>
              <option value="percent">Percentual (%)</option>
              <option value="fixed">Valor fixo (R$)</option>
            </select>
          </label>
          <label className="auth-label">
            Valor
            <input className="auth-input" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} required />
          </label>
          <label className="auth-label">
            Máx. usos (vazio = ilimitado)
            <input className="auth-input" value={maxUses} onChange={(e) => setMaxUses(e.target.value)} />
          </label>
          <label className="auth-label">
            Válido de
            <input className="auth-input" type="date" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} />
          </label>
          <label className="auth-label">
            Até
            <input className="auth-input" type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
          </label>
          <label className="auth-label admin-form-span2">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> Cupom activo
          </label>
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
