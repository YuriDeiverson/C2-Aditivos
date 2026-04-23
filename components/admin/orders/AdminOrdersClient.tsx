"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { adminUpdateOrderStatus } from "@/app/actions/admin";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import type { AdminOrderRow, OrderStatus } from "@/types/admin";

function formatBRL(n: number) {
  return `R$ ${Number(n).toFixed(2).replace(".", ",")}`;
}

function OrderDetailModal({
  order,
  onClose,
}: {
  order: AdminOrderRow;
  onClose: () => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const setStatus = async (status: OrderStatus) => {
    setErr(null);
    setBusy(status);
    try {
      await adminUpdateOrderStatus(order.id, status);
      onClose();
      router.replace("/admin/pedidos");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-label="Detalhes do pedido" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-head">
          <h2>Pedido {order.id.slice(0, 8)}…</h2>
          <button type="button" className="admin-modal-close" aria-label="Fechar" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="admin-modal-body">
          {err && <p className="auth-error">{err}</p>}
          <section className="admin-modal-section">
            <h3>Cliente</h3>
            <p>
              <strong>E-mail:</strong> {order.customer_email ?? "—"}
            </p>
            <p>
              <strong>Nome (entrega):</strong> {order.shipping_recipient_name ?? "—"}
            </p>
            <p>
              <strong>Telefone:</strong> {order.shipping_phone ?? "—"}
            </p>
          </section>
          <section className="admin-modal-section">
            <h3>Endereço</h3>
            <p>
              {order.shipping_street ?? "—"}, {order.shipping_number ?? "—"}{" "}
              {order.shipping_complement ? `— ${order.shipping_complement}` : ""}
            </p>
            <p>
              {order.shipping_city ?? "—"} / {order.shipping_state ?? "—"} — CEP {order.shipping_cep ?? "—"}
            </p>
          </section>
          <section className="admin-modal-section">
            <h3>Itens</h3>
            <ul className="admin-modal-lines">
              {(order.order_items ?? []).map((it, i) => (
                <li key={i}>
                  <span>{it.product_name}</span>
                  <span>
                    × {it.quantity} @ {formatBRL(it.unit_price)}
                  </span>
                  <strong>{formatBRL(it.unit_price * it.quantity)}</strong>
                </li>
              ))}
            </ul>
            <div className="admin-modal-totals">
              <div>
                <span>Subtotal</span>
                <span>{formatBRL(order.subtotal)}</span>
              </div>
              <div>
                <span>Frete</span>
                <span>{formatBRL(order.shipping)}</span>
              </div>
              <div className="admin-modal-total-row">
                <span>Total</span>
                <span>{formatBRL(order.total)}</span>
              </div>
            </div>
          </section>
          <section className="admin-modal-section">
            <h3>Estado do pedido</h3>
            <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
            <div className="admin-modal-quick-actions">
              <button type="button" className="admin-btn-sm" disabled={!!busy} onClick={() => void setStatus("confirmed")}>
                Confirmado
              </button>
              <button type="button" className="admin-btn-sm" disabled={!!busy} onClick={() => void setStatus("shipped")}>
                Enviado
              </button>
              <button type="button" className="admin-btn-sm" disabled={!!busy} onClick={() => void setStatus("delivered")}>
                Entregue
              </button>
              <button type="button" className="admin-btn-sm admin-btn-sm--danger" disabled={!!busy} onClick={() => void setStatus("cancelled")}>
                Cancelar
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrdersClient({ orders }: { orders: AdminOrderRow[] }) {
  const searchParams = useSearchParams();
  const detailId = searchParams.get("detalhes");

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = orders;
    if (statusFilter !== "all") list = list.filter((o) => o.status === statusFilter);
    const s = q.trim().toLowerCase();
    if (s) {
      list = list.filter((o) => {
        const hay = [
          o.id,
          o.customer_email,
          o.shipping_cep,
          o.shipping_city,
          o.shipping_recipient_name,
          ...(o.order_items ?? []).map((i) => i.product_name),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(s);
      });
    }
    return list;
  }, [orders, statusFilter, q]);

  const detailOrder = useMemo(() => orders.find((o) => o.id === detailId) ?? null, [orders, detailId]);

  const router = useRouter();
  const closeModal = useCallback(() => {
    router.replace("/admin/pedidos");
  }, [router]);

  return (
    <>
      <div className="admin-toolbar">
        <div className="admin-toolbar-field">
          <label htmlFor="order-search">Buscar</label>
          <input
            id="order-search"
            className="admin-input-search"
            placeholder="ID, e-mail, CEP, cidade, nome…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="admin-toolbar-field">
          <label htmlFor="order-status">Estado</label>
          <select id="order-status" className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="pending">Pendente</option>
            <option value="confirmed">Confirmado</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregue</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table admin-table--dense">
          <thead>
            <tr>
              <th>Data</th>
              <th>Cliente</th>
              <th>Local</th>
              <th>Itens</th>
              <th>Frete</th>
              <th>Total</th>
              <th>Estado</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td>{new Date(o.created_at).toLocaleString("pt-BR")}</td>
                <td>{o.customer_email ?? "—"}</td>
                <td>
                  <small>
                    {o.shipping_city ?? "—"} — CEP {o.shipping_cep ?? "—"}
                  </small>
                </td>
                <td>
                  <ul className="admin-order-items">
                    {(o.order_items ?? []).map((it, i) => (
                      <li key={i}>
                        {it.product_name} × {it.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{formatBRL(o.shipping)}</td>
                <td>
                  <strong>{formatBRL(o.total)}</strong>
                </td>
                <td>
                  <OrderStatusSelect orderId={o.id} initialStatus={o.status} />
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
        {filtered.length === 0 && <p className="auth-muted admin-table-empty">Nenhum pedido encontrado.</p>}
      </div>

      {detailOrder && <OrderDetailModal order={detailOrder} onClose={closeModal} />}
    </>
  );
}
