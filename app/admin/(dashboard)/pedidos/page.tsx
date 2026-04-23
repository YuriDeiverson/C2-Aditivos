import { Suspense } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import AdminOrdersClient from "@/components/admin/orders/AdminOrdersClient";
import type { AdminOrderRow } from "@/types/admin";

export const dynamic = "force-dynamic";

async function OrdersData() {
  const supabase = await createServerSupabaseClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, customer_email, status, subtotal, shipping, total, created_at, shipping_cep, shipping_city, shipping_state, shipping_street, shipping_number, shipping_complement, shipping_recipient_name, shipping_phone, order_items(product_id, product_name, quantity, unit_price)"
    )
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return (
      <div className="admin-dashboard">
        <p className="auth-error">Erro ao carregar: {error.message}</p>
      </div>
    );
  }

  return <AdminOrdersClient orders={(orders ?? []) as AdminOrderRow[]} />;
}

export default function AdminPedidosPage() {
  return (
    <div className="admin-dashboard admin-dashboard--wide">
      <header className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Pedidos</h1>
          <p className="admin-page-desc">Filtros, totais com frete e detalhe completo do cliente e envio.</p>
        </div>
      </header>
      <Suspense fallback={<p className="auth-muted">A carregar pedidos…</p>}>
        <OrdersData />
      </Suspense>
    </div>
  );
}
