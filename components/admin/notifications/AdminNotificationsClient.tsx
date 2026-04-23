"use client";

import { adminMarkAllNotificationsRead, adminMarkNotificationRead } from "@/app/actions/admin";
import type { AdminNotificationRow } from "@/types/admin";

export type StockAlert = { id: string; title: string; message: string; created_at: string; type: "stock_critical" };

export default function AdminNotificationsClient({
  rows,
  stockAlerts,
}: {
  rows: AdminNotificationRow[];
  stockAlerts: StockAlert[];
}) {
  const merged = [
    ...stockAlerts.map((s) => ({ ...s, read_at: null as string | null, payload: {} as Record<string, unknown> })),
    ...rows,
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="admin-notifications">
      <div className="admin-toolbar">
        <button type="button" className="admin-signout-btn" onClick={() => void adminMarkAllNotificationsRead().then(() => window.location.reload())}>
          Marcar todas como lidas
        </button>
      </div>
      <ul className="admin-notif-list">
        {merged.map((n) => (
          <li key={n.id} className={`admin-notif-item ${n.read_at ? "read" : ""} type-${n.type}`}>
            <div>
              <strong>{n.title}</strong>
              <p>{n.message}</p>
              <time dateTime={n.created_at}>{new Date(n.created_at).toLocaleString("pt-BR")}</time>
            </div>
            {!n.read_at && !String(n.id).startsWith("stock-") && (
              <button type="button" className="admin-btn-sm" onClick={() => void adminMarkNotificationRead(n.id).then(() => window.location.reload())}>
                Lida
              </button>
            )}
          </li>
        ))}
      </ul>
      {merged.length === 0 && <p className="auth-muted">Sem alertas.</p>}
    </div>
  );
}
