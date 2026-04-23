import { createServerSupabaseClient } from "@/lib/supabase/server";
import { normalizeShopSettingsRow } from "@/lib/shop-settings";
import AdminInformacoesLojaClient from "@/components/admin/shop/AdminInformacoesLojaClient";

export const dynamic = "force-dynamic";

export default async function AdminInformacoesPage() {
  const supabase = await createServerSupabaseClient();
  const { data: shopRow, error: shopErr } = await supabase.from("shop_settings").select("*").eq("id", 1).maybeSingle();
  const shopSettings = normalizeShopSettingsRow((shopRow ?? undefined) as Record<string, unknown> | undefined);

  return (
    <div className="admin-dashboard admin-dashboard--wide">
      <header className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Informações</h1>
          <p className="admin-page-desc">
            Dados da loja (origem dos envios), pré-configuração dos Correios e meta tags do site. As regras de frete
            (mínimo para grátis e valor pago) ficam em <strong>Cupons e frete</strong>.
          </p>
        </div>
      </header>
      {shopErr && (
        <p className="auth-error" role="alert">
          Tabela shop_settings: {shopErr.message}. Aplique a migração 007_shop_settings.sql.
        </p>
      )}
      <AdminInformacoesLojaClient initial={shopSettings} />
    </div>
  );
}
