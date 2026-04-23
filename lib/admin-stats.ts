import type { OrderStatus } from "@/types/admin";

export type OrderLite = {
  total: number;
  created_at: string;
  status: OrderStatus;
  user_id?: string;
};

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function sumRevenue(orders: OrderLite[]) {
  return orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + Number(o.total), 0);
}

export function pctChange(current: number, previous: number) {
  if (!Number.isFinite(previous) || previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export function ordersInRange(orders: OrderLite[], from: Date, to: Date) {
  const a = from.getTime();
  const b = to.getTime();
  return orders.filter((o) => {
    const t = new Date(o.created_at).getTime();
    return t >= a && t <= b;
  });
}

export function revenueLast7DaysSeries(orders: OrderLite[]) {
  const days: { label: string; value: number }[] = [];
  const now = startOfDay(new Date());
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" });
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const slice = ordersInRange(orders, d, new Date(next.getTime() - 1));
    const value = slice.filter((o) => o.status !== "cancelled").reduce((s, o) => s + Number(o.total), 0);
    days.push({ label, value });
  }
  return days;
}

export function ordersByStatusCounts(orders: OrderLite[]) {
  const map = new Map<string, number>();
  for (const o of orders) {
    map.set(o.status, (map.get(o.status) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

export function distinctClientsInRange(orders: OrderLite[], from: Date, to: Date) {
  const slice = ordersInRange(orders, from, to).filter((o) => o.status !== "cancelled");
  return new Set(slice.map((o) => o.user_id).filter(Boolean)).size;
}
