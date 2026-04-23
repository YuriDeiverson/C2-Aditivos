"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  enabled?: boolean;
  className?: string;
};

export default function CouponField({ enabled = true, className }: Props) {
  const { couponCode, couponDiscountAmount, couponName, applyCouponCode, clearCoupon } = useCart();
  const [local, setLocal] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!enabled) return null;

  const aplicar = async () => {
    setErr(null);
    setLoading(true);
    try {
      const r = await applyCouponCode(local);
      if (!r.ok) {
        setErr(r.message);
        return;
      }
      setLocal("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className ?? "cart-coupon-block"}>
      <label className="auth-label cart-coupon-label">Cupom de desconto</label>
      <div className="cart-coupon-row">
        <input
          className="auth-input"
          value={couponCode ?? local}
          onChange={(e) => {
            if (couponCode) return;
            setLocal(e.target.value.toUpperCase());
          }}
          placeholder="CÓDIGO"
          disabled={Boolean(couponCode)}
        />
        {!couponCode ? (
          <button type="button" className="btn-dark cart-coupon-btn" disabled={loading || !local.trim()} onClick={() => void aplicar()}>
            {loading ? "…" : "Aplicar"}
          </button>
        ) : (
          <button
            type="button"
            className="admin-signout-btn cart-coupon-btn"
            onClick={() => {
              clearCoupon();
              setLocal("");
            }}
          >
            Remover
          </button>
        )}
      </div>
      {err && <p className="auth-error" role="alert">{err}</p>}
      {couponCode && (
        <p className="auth-muted cart-coupon-applied">
          Cupom <strong>{couponCode}</strong>
          {couponName ? ` (${couponName})` : ""} — desconto R$ {couponDiscountAmount.toFixed(2).replace(".", ",")}
        </p>
      )}
    </div>
  );
}
