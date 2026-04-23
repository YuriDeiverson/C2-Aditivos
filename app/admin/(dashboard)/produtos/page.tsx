import { createServerSupabaseClient } from "@/lib/supabase/server";
import AdminProductsClient, { type ProductAdminRow } from "@/components/admin/products/AdminProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProdutosPage() {
  const supabase = await createServerSupabaseClient();

  const [{ data: catalog, error: cErr }, { data: inv, error: iErr }, { data: items, error: itErr }] = await Promise.all([
    supabase.from("catalog_products").select("*").order("id"),
    supabase.from("inventory").select("product_id, stock_quantity"),
    supabase.from("order_items").select("product_id, quantity"),
  ]);

  if (cErr) {
    return (
      <div className="admin-dashboard">
        <h1 className="admin-page-title">Produtos</h1>
        <p className="auth-error">{cErr.message}</p>
        <p className="auth-muted">Execute a migração 003 no Supabase (tabela catalog_products).</p>
      </div>
    );
  }

  const stockMap = new Map((inv ?? []).map((r) => [r.product_id, r.stock_quantity]));
  const soldMap = new Map<string, number>();
  for (const it of items ?? []) {
    const pid = it.product_id as string;
    soldMap.set(pid, (soldMap.get(pid) ?? 0) + (it.quantity as number));
  }

  const rows: ProductAdminRow[] = (catalog ?? []).map((p) => ({
    ...(p as ProductAdminRow),
    stock: stockMap.get(p.id) ?? 0,
    sold: soldMap.get(p.id) ?? 0,
  }));

  return (
    <div className="admin-dashboard admin-dashboard--wide">
      <header className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Produtos</h1>
          <p className="admin-page-desc">Catálogo, preço, stock e unidades vendidas (somadas nos pedidos).</p>
        </div>
      </header>
      <AdminProductsClient rows={rows} />
    </div>
  );
}
