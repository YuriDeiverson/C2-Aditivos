import type { ShopSettingsRow } from "@/types/admin";

export type ShippingRule = Pick<ShopSettingsRow, "shipping_free_min_subtotal" | "shipping_paid_cost">;

/** Subtotal em produtos já com cupom aplicado (como na loja). */
export function computeShipping(subtotalAfterDiscount: number, rule: ShippingRule): { cost: number; free: boolean } {
  const paid = Math.max(0, roundMoney(Number(rule.shipping_paid_cost) || 35));
  if (rule.shipping_free_min_subtotal == null) {
    return { cost: paid, free: false };
  }
  const min = Number(rule.shipping_free_min_subtotal);
  if (!Number.isFinite(min) || min < 0) {
    return { cost: paid, free: false };
  }
  const free = subtotalAfterDiscount >= min;
  return { cost: free ? 0 : paid, free };
}

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}
