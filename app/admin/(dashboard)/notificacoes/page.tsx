import { createServerSupabaseClient } from "@/lib/supabase/server";
import AdminNotificationsClient, { type StockAlert } from "@/components/admin/notifications/AdminNotificationsClient";
import type { AdminNotificationRow } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function AdminNotificacoesPage() {
  const supabase = await createServerSupabaseClient();

  const [{ data: notifs, error: nErr }, { data: low, error: lErr }] = await Promise.all([
    supabase.from("admin_notifications").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("inventory").select("product_id, stock_quantity, updated_at").lte("stock_quantity", 10).order("stock_quantity"),
  ]);

  if (nErr) {
    return (
      <div className="admin-dashboard">
        <h1 className="admin-page-title">Notificações</h1>
        <p className="auth-error">{nErr.message}</p>
        <p className="auth-muted">Aplique a migração 003 (tabela admin_notifications).</p>
      </div>
    );
  }

  const stockAlerts: StockAlert[] = (low ?? []).map((r) => ({
    id: `stock-${r.product_id}`,
    type: "stock_critical" as const,
    title: "Estoque crítico",
    message: `Produto ${r.product_id} com apenas ${r.stock_quantity} un.`,
    created_at: (r as { updated_at?: string }).updated_at ?? new Date().toISOString(),
  }));

  return (
    <div className="admin-dashboard admin-dashboard--wide">
      <header className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Notificações</h1>
          <p className="admin-page-desc">Novos pedidos, mudanças de estado e alertas de stock baixo.</p>
        </div>
      </header>
      <AdminNotificationsClient rows={(notifs ?? []) as AdminNotificationRow[]} stockAlerts={lErr ? [] : stockAlerts} />
    </div>
  );
}
