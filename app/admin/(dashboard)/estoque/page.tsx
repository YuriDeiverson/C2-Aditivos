import { createServerSupabaseClient } from "@/lib/supabase/server";
import StockRow from "@/components/admin/StockRow";

export const dynamic = "force-dynamic";

export default async function AdminEstoquePage() {
  const supabase = await createServerSupabaseClient();
  const [{ data: rows, error }, { data: catalog, error: cErr }] = await Promise.all([
    supabase.from("inventory").select("product_id, stock_quantity"),
    supabase.from("catalog_products").select("id, name").order("id"),
  ]);

  if (error) {
    return (
      <div className="admin-dashboard">
        <h1 className="admin-page-title">Estoque</h1>
        <p className="auth-error">{error.message}</p>
      </div>
    );
  }

  if (cErr) {
    return (
      <div className="admin-dashboard">
        <h1 className="admin-page-title">Estoque</h1>
        <p className="auth-error">{cErr.message}</p>
        <p className="auth-muted">Confirme que a tabela catalog_products existe (migração 003).</p>
      </div>
    );
  }

  const byId = new Map((rows ?? []).map((r) => [r.product_id, r.stock_quantity]));
  const products = catalog ?? [];

  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Estoque por produto</h1>
      <p className="admin-page-desc">
        Os IDs coincidem com o catálogo do site. Ao confirmar pedidos, o stock é debitado automaticamente.
      </p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <StockRow
                key={p.id}
                productId={p.id}
                name={p.name}
                initialStock={byId.get(p.id) ?? 0}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
