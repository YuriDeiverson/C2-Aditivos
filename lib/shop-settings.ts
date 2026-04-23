import type { ShopSettingsRow } from "@/types/admin";

export const FALLBACK_SHOP_SETTINGS: ShopSettingsRow = {
  id: 1,
  shipping_free_min_subtotal: 500,
  shipping_paid_cost: 35,
  store_legal_name: "",
  store_trade_name: "",
  store_email: "",
  store_phone: "",
  store_cep: "",
  store_logradouro: "",
  store_numero: "",
  store_complemento: "",
  store_bairro: "",
  store_cidade: "",
  store_uf: "",
  correios_codigo_servico: "",
  correios_cnpj_contrato: "",
  correios_numero_cartao: "",
  correios_ambiente: "homologacao",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  updated_at: new Date().toISOString(),
};

export function normalizeShopSettingsRow(raw: Record<string, unknown> | null | undefined): ShopSettingsRow {
  if (!raw) return { ...FALLBACK_SHOP_SETTINGS };
  const n = (v: unknown, d: number) => (typeof v === "number" && Number.isFinite(v) ? v : d);
  const s = (v: unknown, d = "") => (typeof v === "string" ? v : d);
  const rawFree = raw.shipping_free_min_subtotal;
  let shippingFreeMin: number | null;
  if (rawFree === null) {
    shippingFreeMin = null;
  } else if (typeof rawFree === "number" && Number.isFinite(rawFree)) {
    shippingFreeMin = rawFree;
  } else {
    shippingFreeMin = FALLBACK_SHOP_SETTINGS.shipping_free_min_subtotal;
  }
  return {
    id: 1,
    shipping_free_min_subtotal: shippingFreeMin,
    shipping_paid_cost: n(raw.shipping_paid_cost, FALLBACK_SHOP_SETTINGS.shipping_paid_cost),
    store_legal_name: s(raw.store_legal_name),
    store_trade_name: s(raw.store_trade_name),
    store_email: s(raw.store_email),
    store_phone: s(raw.store_phone),
    store_cep: s(raw.store_cep),
    store_logradouro: s(raw.store_logradouro),
    store_numero: s(raw.store_numero),
    store_complemento: s(raw.store_complemento),
    store_bairro: s(raw.store_bairro),
    store_cidade: s(raw.store_cidade),
    store_uf: s(raw.store_uf).slice(0, 2),
    correios_codigo_servico: s(raw.correios_codigo_servico),
    correios_cnpj_contrato: s(raw.correios_cnpj_contrato),
    correios_numero_cartao: s(raw.correios_numero_cartao),
    correios_ambiente: raw.correios_ambiente === "producao" ? "producao" : "homologacao",
    seo_title: s(raw.seo_title),
    seo_description: s(raw.seo_description),
    seo_keywords: s(raw.seo_keywords),
    updated_at: s(raw.updated_at, FALLBACK_SHOP_SETTINGS.updated_at),
  };
}
