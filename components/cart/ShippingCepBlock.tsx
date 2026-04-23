"use client";

import { useState } from "react";
import { useShopSettings } from "@/context/ShopSettingsContext";
import { computeShipping } from "@/lib/shipping";
import { fetchViaCep } from "@/lib/viacep";

type Props = {
  /** Valor em produtos (após cupom) para aplicar a regra de frete grátis da loja. */
  subtotalForFreteRule: number;
  /** Opcional: guardar CEP/local no contexto do carrinho após consulta. */
  onLocated?: (cep: string, label: string) => void;
  className?: string;
};

export default function ShippingCepBlock({ subtotalForFreteRule, onLocated, className }: Props) {
  const shop = useShopSettings();
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const calcular = async () => {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const r = await fetchViaCep(cep);
      if (!r.ok) {
        setErr(r.message);
        return;
      }
      const label = `${r.localidade} – ${r.uf}`;
      const { cost, free } = computeShipping(subtotalForFreteRule, {
        shipping_free_min_subtotal: shop.shipping_free_min_subtotal,
        shipping_paid_cost: shop.shipping_paid_cost,
      });
      const min = shop.shipping_free_min_subtotal;
      const minHint =
        min != null && Number.isFinite(min)
          ? ` (grátis a partir de R$ ${min.toFixed(2).replace(".", ",")} em produtos após cupom).`
          : " (sem frete grátis por valor de pedido configurado na loja).";
      setMsg(
        free
          ? `${label}: frete grátis para este valor de compra.`
          : `${label}: frete estimado R$ ${cost.toFixed(2).replace(".", ",")}${minHint}`
      );
      onLocated?.(r.cep, label);
    } catch {
      setErr("Erro ao consultar o CEP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className ?? "cart-shipping-cep"}>
      <div className="cart-shipping-cep-row">
        <label className="auth-label cart-shipping-cep-label">
          Calcular frete (CEP)
          <input
            className="auth-input"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            maxLength={9}
          />
        </label>
        <button type="button" className="btn-dark cart-shipping-cep-btn" disabled={loading} onClick={() => void calcular()}>
          {loading ? "…" : "Calcular"}
        </button>
      </div>
      {err && <p className="auth-error cart-shipping-cep-msg" role="alert">{err}</p>}
      {msg && <p className="auth-muted cart-shipping-cep-msg">{msg}</p>}
    </div>
  );
}
