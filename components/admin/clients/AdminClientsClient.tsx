"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { adminArchiveClient } from "@/app/actions/admin";

export type ClientRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  created_at: string;
  order_count: number;
  total_spent: number;
};

function formatBRL(n: number) {
  return `R$ ${n.toFixed(2).replace(".", ",")}`;
}

export default function AdminClientsClient({ clients }: { clients: ClientRow[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "new" | "returning">("all");
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const now = Date.now();
    const d30 = 30 * 24 * 60 * 60 * 1000;
    return clients.filter((c) => {
      if (filter === "new") {
        return now - new Date(c.created_at).getTime() <= d30;
      }
      if (filter === "returning") {
        return c.order_count >= 2;
      }
      return true;
    });
  }, [clients, filter]);

  const onArchive = async (id: string) => {
    if (!confirm("Arquivar este cliente? Deixará de aparecer na lista.")) return;
    setBusy(id);
    try {
      await adminArchiveClient(id);
      router.refresh();
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <div className="admin-toolbar">
        <div className="admin-toolbar-field">
          <label htmlFor="client-filter">Segmento</label>
          <select id="client-filter" className="admin-select" value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
            <option value="all">Todos</option>
            <option value="new">Novos (últimos 30 dias)</option>
            <option value="returning">Recorrentes (2+ pedidos)</option>
          </select>
        </div>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table admin-table--dense">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Cidade</th>
              <th>Pedidos</th>
              <th>Total gasto</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>{c.full_name?.trim() || "—"}</td>
                <td>{c.email ?? "—"}</td>
                <td>{c.phone ?? "—"}</td>
                <td>{c.city ?? "—"}</td>
                <td>{c.order_count}</td>
                <td>{formatBRL(c.total_spent)}</td>
                <td>
                  <button type="button" className="admin-btn-sm admin-btn-sm--danger" disabled={busy === c.id} onClick={() => void onArchive(c.id)}>
                    {busy === c.id ? "…" : "Arquivar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="auth-muted admin-table-empty">Nenhum cliente neste filtro.</p>}
      </div>
    </>
  );
}
