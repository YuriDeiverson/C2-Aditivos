"use client";

import { useState } from "react";
import { adminUpdateStock } from "@/app/actions/admin";

export default function StockRow({
  productId,
  name,
  initialStock,
}: {
  productId: string;
  name: string;
  initialStock: number;
}) {
  const [qty, setQty] = useState(String(initialStock));
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const save = async () => {
    setMsg(null);
    const n = parseInt(qty, 10);
    if (Number.isNaN(n) || n < 0) {
      setMsg("Número inválido");
      return;
    }
    setLoading(true);
    try {
      await adminUpdateStock(productId, n);
      setMsg("Guardado");
      setTimeout(() => setMsg(null), 2000);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>{productId}</td>
      <td>{name}</td>
      <td>
        <input
          className="admin-input-num"
          type="number"
          min={0}
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </td>
      <td>
        <button type="button" className="btn-dark admin-btn-sm" onClick={() => void save()} disabled={loading}>
          {loading ? "…" : "Atualizar"}
        </button>
        {msg && <span className="admin-inline-msg">{msg}</span>}
      </td>
    </tr>
  );
}
