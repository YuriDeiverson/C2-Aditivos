export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type ShippingAddressInput = {
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  complement?: string;
  recipient_name: string;
  phone: string;
};

export type AdminOrderRow = {
  id: string;
  user_id: string;
  customer_email: string | null;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  created_at: string;
  shipping_cep: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_street: string | null;
  shipping_number: string | null;
  shipping_complement: string | null;
  shipping_recipient_name: string | null;
  shipping_phone: string | null;
  order_items: {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
  }[];
};

export type CatalogProductRow = {
  id: string;
  slug: string;
  cat: string;
  category_label: string;
  name: string;
  description: string;
  image_src: string;
  price_number: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type ShopSettingsRow = {
  id: number;
  /** Valor mínimo (produtos após cupom) para frete grátis; null = sem frete grátis por valor. */
  shipping_free_min_subtotal: number | null;
  shipping_paid_cost: number;
  store_legal_name: string;
  store_trade_name: string;
  store_email: string;
  store_phone: string;
  store_cep: string;
  store_logradouro: string;
  store_numero: string;
  store_complemento: string;
  store_bairro: string;
  store_cidade: string;
  store_uf: string;
  correios_codigo_servico: string;
  correios_cnpj_contrato: string;
  correios_numero_cartao: string;
  correios_ambiente: "homologacao" | "producao";
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  updated_at: string;
};

export type CouponRow = {
  id: string;
  code: string;
  name: string;
  discount_type: "percent" | "fixed";
  discount_value: number;
  max_uses: number | null;
  used_count: number;
  valid_from: string | null;
  valid_until: string | null;
  active: boolean;
  created_at: string;
};

export type AdminNotificationRow = {
  id: string;
  type: string;
  title: string;
  message: string;
  payload: Record<string, unknown>;
  read_at: string | null;
  created_at: string;
};
