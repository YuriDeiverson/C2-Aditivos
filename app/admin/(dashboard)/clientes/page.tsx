import { createServerSupabaseClient } from "@/lib/supabase/server";
import AdminClientsClient, { type ClientRow } from "@/components/admin/clients/AdminClientsClient";

export const dynamic = "force-dynamic";

export default async function AdminClientesPage() {
  const supabase = await createServerSupabaseClient();

  const { data: profiles, error: pErr } = await supabase
    .from("profiles")
    .select("id,email,full_name,phone,city,created_at,archived_at,role")
    .eq("role", "client")
    .is("archived_at", null);

  const { data: orders, error: oErr } = await supabase.from("orders").select("user_id,total,status");

  if (pErr || oErr) {
    return (
      <div className="admin-dashboard">
        <h1 className="admin-page-title">Clientes</h1>
        <p className="auth-error">{pErr?.message ?? oErr?.message}</p>
      </div>
    );
  }

  const byUser = new Map<string, { count: number; spent: number }>();
  for (const o of orders ?? []) {
    if (!o.user_id || o.status === "cancelled") continue;
    const cur = byUser.get(o.user_id) ?? { count: 0, spent: 0 };
    cur.count += 1;
    cur.spent += Number(o.total);
    byUser.set(o.user_id, cur);
  }

  const clients: ClientRow[] = (profiles ?? []).map((p) => {
    const agg = byUser.get(p.id) ?? { count: 0, spent: 0 };
    return {
      id: p.id,
      email: p.email,
      full_name: p.full_name,
      phone: p.phone,
      city: p.city,
      created_at: p.created_at,
      order_count: agg.count,
      total_spent: agg.spent,
    };
  });

  clients.sort((a, b) => b.total_spent - a.total_spent);

  return (
    <div className="admin-dashboard admin-dashboard--wide">
      <header className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Clientes</h1>
          <p className="admin-page-desc">E-mail, contacto, cidade e valor acumulado por cliente.</p>
        </div>
      </header>
      <AdminClientsClient clients={clients} />
    </div>
  );
}
