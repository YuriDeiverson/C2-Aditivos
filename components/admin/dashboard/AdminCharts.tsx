"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PIE_COLORS = ["#C8893A", "#4A7C59", "#7A4A1E", "#1C1208", "#888"];

export function AdminRevenueBarChart({ data }: { data: { label: string; value: number }[] }) {
  return (
    <div className="admin-chart-card">
      <h3 className="admin-chart-title">Receita (últimos 7 dias)</h3>
      <div className="admin-chart-body">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `R$${v}`} width={56} />
            <Tooltip
              formatter={(value) => {
                const n = typeof value === "number" ? value : Number(value);
                return [`R$ ${(Number.isFinite(n) ? n : 0).toFixed(2).replace(".", ",")}`, "Receita"];
              }}
              contentStyle={{ borderRadius: 10, border: "1px solid #e5e5e5" }}
            />
            <Bar dataKey="value" fill="#C8893A" radius={[6, 6, 0, 0]} name="Receita" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

export function AdminOrdersPieChart({ data }: { data: { name: string; value: number }[] }) {
  const chartData = data
    .filter((d) => d.value > 0)
    .map((d) => ({
      ...d,
      label: STATUS_LABEL[d.name] ?? d.name,
    }));
  if (chartData.length === 0) {
    return (
      <div className="admin-chart-card">
        <h3 className="admin-chart-title">Pedidos por estado</h3>
        <p className="auth-muted admin-chart-empty">Sem pedidos no período.</p>
      </div>
    );
  }
  return (
    <div className="admin-chart-card">
      <h3 className="admin-chart-title">Pedidos por estado</h3>
      <div className="admin-chart-body">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={88} label={false}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AdminKpiDelta({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const positive = value >= 0;
  return (
    <span className={`admin-kpi-delta ${positive ? "up" : "down"}`}>
      {positive ? "▲" : "▼"} {Math.abs(value).toFixed(1)}
      {suffix} vs período anterior
    </span>
  );
}
