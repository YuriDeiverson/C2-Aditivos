"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type PreviewCouponResult =
  | { ok: true; code: string; discountAmount: number; name: string }
  | { ok: false; message: string };

export async function previewCartCoupon(code: string, merchandiseSubtotal: number): Promise<PreviewCouponResult> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("preview_cart_coupon", {
    p_code: code.trim(),
    p_merchandise_subtotal: merchandiseSubtotal,
  });
  if (error) {
    return { ok: false, message: error.message };
  }
  const j = data as { ok?: boolean; message?: string; code?: string; discount_amount?: number; name?: string };
  if (!j?.ok) {
    return { ok: false, message: j?.message ?? "Cupom inválido" };
  }
  return {
    ok: true,
    code: String(j.code ?? ""),
    discountAmount: Number(j.discount_amount ?? 0),
    name: String(j.name ?? ""),
  };
}
