"use client";

import { useState } from "react";
import { adminUpdateOrderStatus } from "@/app/actions/admin";

type Status = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

const LABELS: Record<Status, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

export default function OrderStatusSelect({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: Status;
}) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Status;
    setErr(null);
    setLoading(true);
    try {
      await adminUpdateOrderStatus(orderId, next);
      setStatus(next);
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-order-status">
      <select
        className="admin-select"
        value={status}
        onChange={(e) => void onChange(e)}
        disabled={loading}
        aria-label="Estado do pedido"
      >
        {(Object.keys(LABELS) as Status[]).map((k) => (
          <option key={k} value={k}>
            {LABELS[k]}
          </option>
        ))}
      </select>
      {err && <span className="admin-inline-error">{err}</span>}
    </div>
  );
}
