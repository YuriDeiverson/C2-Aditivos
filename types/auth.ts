export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "client" | "admin";
  created_at: string;
  phone?: string | null;
  city?: string | null;
  archived_at?: string | null;
};

export type OrderRow = {
  id: string;
  user_id: string;
  customer_email: string | null;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shipping: number;
  total: number;
  created_at: string;
  shipping_cep?: string | null;
  shipping_city?: string | null;
  shipping_state?: string | null;
  shipping_street?: string | null;
  shipping_number?: string | null;
  shipping_complement?: string | null;
  shipping_recipient_name?: string | null;
  shipping_phone?: string | null;
};

export type OrderItemRow = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
};

export type InventoryRow = {
  product_id: string;
  stock_quantity: number;
  updated_at: string;
};
