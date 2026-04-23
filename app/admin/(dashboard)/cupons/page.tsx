import { createServerSupabaseClient } from "@/lib/supabase/server";
import { normalizeShopSettingsRow } from "@/lib/shop-settings";
import AdminCouponsClient from "@/components/admin/coupons/AdminCouponsClient";
import AdminFreteSettingsClient from "@/components/admin/shop/AdminFreteSettingsClient";
import type { CouponRow } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function AdminCuponsPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
  const { data: shopRow, error: shopErr } = await supabase
    .from("shop_settings")
    .select("shipping_free_min_subtotal, shipping_paid_cost")
    .eq("id", 1)
    .maybeSingle();

  const shopNorm = normalizeShopSettingsRow((shopRow ?? undefined) as Record<string, unknown> | undefined);

  if (error) {
    return (
      <div className="admin-dashboard">
        <h1 className="admin-page-title">Cupons e frete</h1>
        <p className="auth-error">{error.message}</p>
        <p className="auth-muted">Aplique a migração 003 (tabela coupons).</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard admin-dashboard--wide">
      <header className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Cupons e frete</h1>
          <p className="admin-page-desc">
            Códigos promocionais e regras de frete (mínimo em produtos após cupom para grátis e valor de frete pago).
            Dados da loja e SEO estão em <strong>Informações</strong>.
          </p>
        </div>
      </header>
      <AdminCouponsClient coupons={(data ?? []) as CouponRow[]} />
      {shopErr && (
        <p className="auth-error" role="alert">
          Tabela shop_settings: {shopErr.message}. Aplique a migração 007_shop_settings.sql.
        </p>
      )}
      <AdminFreteSettingsClient
        initial={{
          shipping_free_min_subtotal: shopNorm.shipping_free_min_subtotal,
          shipping_paid_cost: shopNorm.shipping_paid_cost,
        }}
      />
    </div>
  );
}
