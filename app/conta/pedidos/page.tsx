import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ContaPedidosPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/conta/pedidos");

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, status, total, created_at, order_items(product_name, quantity)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="cart-page">
        <p className="auth-error">{error.message}</p>
      </main>
    );
  }

  const rows = orders ?? [];

  return (
    <main className="cart-page">
      <h1 className="cart-page-title">Meus pedidos</h1>
      {rows.length === 0 ? (
        <p className="auth-muted">Ainda não tem pedidos.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Estado</th>
                <th>Itens</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o: { id: string; status: string; total: number; created_at: string; order_items: { product_name: string; quantity: number }[] }) => (
                <tr key={o.id}>
                  <td>{new Date(o.created_at).toLocaleString("pt-BR")}</td>
                  <td>{o.status}</td>
                  <td>
                    <ul className="admin-order-items">
                      {(o.order_items ?? []).map((it, i) => (
                        <li key={i}>
                          {it.product_name} × {it.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>R$ {Number(o.total).toFixed(2).replace(".", ",")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/produtos" className="cart-continue-link">
          ← Voltar à loja
        </Link>
      </p>
    </main>
  );
}
