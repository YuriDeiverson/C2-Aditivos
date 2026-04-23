"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpdateShopFrete } from "@/app/actions/admin";

function parseMoney(s: string): number | null {
  const t = s.trim().replace(",", ".");
  if (!t) return null;
  const n = parseFloat(t);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

type FreteInitial = {
  shipping_free_min_subtotal: number | null;
  shipping_paid_cost: number;
};

export default function AdminFreteSettingsClient({ initial }: { initial: FreteInitial }) {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [shippingFreeMinStr, setShippingFreeMinStr] = useState(
    initial.shipping_free_min_subtotal != null ? String(initial.shipping_free_min_subtotal) : ""
  );
  const [shippingPaidStr, setShippingPaidStr] = useState(String(initial.shipping_paid_cost));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const paid = parseMoney(shippingPaidStr);
    if (paid === null) {
      setErr("Informe o valor do frete padrão (pago).");
      return;
    }
    const freeParsed = parseMoney(shippingFreeMinStr);
    const shipping_free_min_subtotal = shippingFreeMinStr.trim() === "" ? null : freeParsed;
    if (shippingFreeMinStr.trim() !== "" && (freeParsed === null || freeParsed < 0)) {
      setErr("Valor mínimo para frete grátis inválido (deixe em branco para desactivar).");
      return;
    }

    setLoading(true);
    try {
      await adminUpdateShopFrete({ shipping_free_min_subtotal, shipping_paid_cost: paid });
      router.refresh();
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Erro ao guardar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="admin-shop-form admin-form-grid" onSubmit={(e) => void onSubmit(e)}>
      <h2 className="admin-shop-section-title admin-form-span2">Frete</h2>
      <p className="auth-muted admin-form-span2" style={{ marginTop: "-0.5rem" }}>
        O frete grátis compara o subtotal de <strong>produtos após o cupom</strong>. Deixe o mínimo em branco para nunca
        oferecer frete grátis por valor de pedido. Os dados da loja (origem dos envios, SEO) estão em{" "}
        <strong>Informações</strong>.
      </p>
      {err && (
        <p className="auth-error admin-form-span2" role="alert">
          {err}
        </p>
      )}
      <label className="auth-label">
        Mínimo em produtos (após cupom) para frete grátis (R$)
        <input
          className="auth-input"
          value={shippingFreeMinStr}
          onChange={(e) => setShippingFreeMinStr(e.target.value)}
          placeholder="Ex.: 500 ou vazio"
        />
      </label>
      <label className="auth-label">
        Frete pago padrão (R$)
        <input className="auth-input" value={shippingPaidStr} onChange={(e) => setShippingPaidStr(e.target.value)} required />
      </label>

      <div className="admin-form-actions admin-form-span2">
        <button type="submit" className="btn-dark" disabled={loading}>
          {loading ? "A guardar…" : "Guardar regras de frete"}
        </button>
      </div>
    </form>
  );
}
