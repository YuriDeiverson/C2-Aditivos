import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminKpiDelta, AdminOrdersPieChart, AdminRevenueBarChart } from "@/components/admin/dashboard/AdminCharts";
import {
  distinctClientsInRange,
  ordersByStatusCounts,
  ordersInRange,
  pctChange,
  revenueLast7DaysSeries,
  sumRevenue,
  type OrderLite,
} from "@/lib/admin-stats";
import type { AdminOrderRow } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const supabase = await createServerSupabaseClient();

  const since = new Date();
  since.setDate(since.getDate() - 60);

  const { data: orderRows, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, customer_email, status, subtotal, shipping, total, created_at, shipping_cep, shipping_city, shipping_recipient_name, order_items(product_name, quantity, unit_price)"
    )
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="admin-dashboard">
        <h1 className="admin-page-title">Visão geral</h1>
        <p className="auth-error">Erro ao carregar pedidos: {error.message}</p>
        <p className="auth-muted">Confirme que a migração 003 foi aplicada no Supabase.</p>
      </div>
    );
  }

  const orders = (orderRows ?? []) as AdminOrderRow[];
  const lite: OrderLite[] = orders.map((o) => ({
    total: Number(o.total),
    created_at: o.created_at,
    status: o.status,
    user_id: o.user_id,
  }));

  const now = new Date();
  const d30 = new Date(now);
  d30.setDate(d30.getDate() - 30);
  const d60 = new Date(now);
  d60.setDate(d60.getDate() - 60);

  const curSlice = ordersInRange(lite, d30, now);
  const prevSlice = ordersInRange(lite, d60, d30);

  const revCur = sumRevenue(curSlice);
  const revPrev = sumRevenue(prevSlice);
  const ordCur = curSlice.filter((o) => o.status !== "cancelled").length;
  const ordPrev = prevSlice.filter((o) => o.status !== "cancelled").length;
  const cliCur = distinctClientsInRange(lite, d30, now);
  const cliPrev = distinctClientsInRange(lite, d60, d30);
  const ticketCur = ordCur > 0 ? revCur / ordCur : 0;
  const ticketPrev = ordPrev > 0 ? revPrev / ordPrev : 0;

  const barData = revenueLast7DaysSeries(lite);
  const pieData = ordersByStatusCounts(lite);
  const recent = orders.slice(0, 8);

  return (
    <div className="admin-dashboard admin-dashboard--wide">
      <header className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Visão geral</h1>
          <p className="admin-page-desc">Indicadores da loja e atalhos para pedidos recentes.</p>
        </div>
      </header>

      <div className="admin-kpi-grid admin-kpi-grid--4">
        <div className="admin-kpi admin-kpi--card">
          <span className="admin-kpi-label">Receita (30 dias)</span>
          <strong className="admin-kpi-value">R$ {revCur.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</strong>
          <AdminKpiDelta value={pctChange(revCur, revPrev)} />
        </div>
        <div className="admin-kpi admin-kpi--card">
          <span className="admin-kpi-label">Pedidos (30 dias)</span>
          <strong className="admin-kpi-value">{ordCur}</strong>
          <AdminKpiDelta value={pctChange(ordCur, ordPrev)} />
        </div>
        <div className="admin-kpi admin-kpi--card">
          <span className="admin-kpi-label">Clientes activos (30 dias)</span>
          <strong className="admin-kpi-value">{cliCur}</strong>
          <AdminKpiDelta value={pctChange(cliCur, cliPrev)} />
        </div>
        <div className="admin-kpi admin-kpi--card">
          <span className="admin-kpi-label">Ticket médio (30 dias)</span>
          <strong className="admin-kpi-value">R$ {ticketCur.toFixed(2).replace(".", ",")}</strong>
          <AdminKpiDelta value={pctChange(ticketCur, ticketPrev)} />
        </div>
      </div>

      <div className="admin-charts-row">
        <AdminRevenueBarChart data={barData} />
        <AdminOrdersPieChart data={pieData} />
      </div>

      <section className="admin-section-card">
        <div className="admin-section-head">
          <h2 className="admin-section-title">Últimos pedidos</h2>
          <Link href="/admin/pedidos" className="admin-link-all">
            Ver todos →
          </Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table admin-table--dense">
            <thead>
              <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.id}>
                  <td>{new Date(o.created_at).toLocaleString("pt-BR")}</td>
                  <td>{o.customer_email ?? "—"}</td>
                  <td>R$ {Number(o.total).toFixed(2).replace(".", ",")}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${o.status}`}>{o.status}</span>
                  </td>
                  <td>
                    <Link href={`/admin/pedidos?detalhes=${o.id}`} className="admin-link-btn">
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recent.length === 0 && <p className="auth-muted admin-table-empty">Sem pedidos no período.</p>}
        </div>
      </section>
    </div>
  );
}
