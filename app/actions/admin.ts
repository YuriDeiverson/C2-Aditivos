"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ShopSettingsRow } from "@/types/admin";

async function requireAdminSupabase() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr || !user) throw new Error("Sessão inválida.");

  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (pErr || profile?.role !== "admin") {
    throw new Error("Acesso reservado a administradores.");
  }

  return supabase;
}

const ORDER_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

export async function adminUpdateOrderStatus(orderId: string, status: string) {
  if (!ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) {
    throw new Error("Estado inválido.");
  }

  const supabase = await requireAdminSupabase();
  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/pedidos");
  revalidatePath("/admin/notificacoes");
  revalidatePath("/conta/pedidos");
}

export async function adminUpdateStock(productId: string, stockQuantity: number) {
  if (!Number.isFinite(stockQuantity) || stockQuantity < 0) {
    throw new Error("Quantidade inválida.");
  }

  const supabase = await requireAdminSupabase();
  const { data: prod } = await supabase.from("catalog_products").select("slug").eq("id", productId).maybeSingle();
  const { error } = await supabase
    .from("inventory")
    .update({ stock_quantity: Math.floor(stockQuantity), updated_at: new Date().toISOString() })
    .eq("product_id", productId);

  if (error) throw new Error(error.message);
  try {
    revalidatePath("/admin");
    revalidatePath("/admin/estoque");
    revalidatePath("/admin/produtos");
    revalidatePath("/produtos");
    if (prod?.slug) revalidatePath(`/produtos/${prod.slug}`);
    revalidatePath("/");
  } catch {
    /* ignore */
  }
}

export async function adminArchiveClient(userId: string) {
  const supabase = await requireAdminSupabase();
  const { error } = await supabase.from("profiles").update({ archived_at: new Date().toISOString() }).eq("id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/clientes");
}

export async function adminMarkNotificationRead(id: string) {
  const supabase = await requireAdminSupabase();
  const { error } = await supabase.from("admin_notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/notificacoes");
}

export async function adminMarkAllNotificationsRead() {
  const supabase = await requireAdminSupabase();
  const { error } = await supabase
    .from("admin_notifications")
    .update({ read_at: new Date().toISOString() })
    .is("read_at", null);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/notificacoes");
}

export async function adminUpsertCoupon(input: {
  id?: string;
  code: string;
  name: string;
  discount_type: "percent" | "fixed";
  discount_value: number;
  max_uses: number | null;
  valid_from: string | null;
  valid_until: string | null;
  active: boolean;
}) {
  const supabase = await requireAdminSupabase();
  const row = {
    code: input.code.trim().toUpperCase(),
    name: input.name.trim(),
    discount_type: input.discount_type,
    discount_value: input.discount_value,
    max_uses: input.max_uses,
    valid_from: input.valid_from || null,
    valid_until: input.valid_until || null,
    active: input.active,
    updated_at: new Date().toISOString(),
  };

  if (input.id) {
    const { error } = await supabase.from("coupons").update(row).eq("id", input.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("coupons").insert(row);
    if (error) throw new Error(error.message);
  }
  try {
    revalidatePath("/admin/cupons");
  } catch {
    /* evita erro de stream no cliente com medidas de performance */
  }
}

export async function adminDeleteCoupon(id: string) {
  const supabase = await requireAdminSupabase();
  const { error } = await supabase.from("coupons").delete().eq("id", id);
  if (error) throw new Error(error.message);
  try {
    revalidatePath("/admin/cupons");
  } catch {
    /* ignore */
  }
}

export async function adminUpdateShopFrete(input: {
  shipping_free_min_subtotal: number | null;
  shipping_paid_cost: number;
}) {
  const supabase = await requireAdminSupabase();
  const paid = Number(input.shipping_paid_cost);
  if (!Number.isFinite(paid) || paid < 0) {
    throw new Error("Valor de frete pago inválido.");
  }
  const freeMinRaw = input.shipping_free_min_subtotal;
  const freeMin =
    freeMinRaw === null || freeMinRaw === undefined
      ? null
      : typeof freeMinRaw === "number" && Number.isFinite(freeMinRaw) && freeMinRaw >= 0
        ? freeMinRaw
        : null;

  const { error } = await supabase
    .from("shop_settings")
    .update({
      shipping_free_min_subtotal: freeMin,
      shipping_paid_cost: paid,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) throw new Error(error.message);

  try {
    revalidatePath("/admin/cupons");
    revalidatePath("/");
    revalidatePath("/carrinho");
    revalidatePath("/carrinho/finalizar");
    revalidatePath("/produtos");
  } catch {
    /* ignore */
  }
}

export type ShopInformacoesInput = Omit<
  ShopSettingsRow,
  "id" | "shipping_free_min_subtotal" | "shipping_paid_cost" | "updated_at"
>;

export async function adminUpdateShopInformacoes(input: ShopInformacoesInput) {
  const supabase = await requireAdminSupabase();
  const row = {
    store_legal_name: input.store_legal_name.trim(),
    store_trade_name: input.store_trade_name.trim(),
    store_email: input.store_email.trim(),
    store_phone: input.store_phone.trim(),
    store_cep: input.store_cep.replace(/\D/g, ""),
    store_logradouro: input.store_logradouro.trim(),
    store_numero: input.store_numero.trim(),
    store_complemento: input.store_complemento.trim(),
    store_bairro: input.store_bairro.trim(),
    store_cidade: input.store_cidade.trim(),
    store_uf: input.store_uf.trim().slice(0, 2).toUpperCase(),
    correios_codigo_servico: input.correios_codigo_servico.trim(),
    correios_cnpj_contrato: input.correios_cnpj_contrato.replace(/\D/g, ""),
    correios_numero_cartao: input.correios_numero_cartao.trim(),
    correios_ambiente: input.correios_ambiente === "producao" ? "producao" : "homologacao",
    seo_title: input.seo_title.trim(),
    seo_description: input.seo_description.trim(),
    seo_keywords: input.seo_keywords.trim(),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("shop_settings").update(row).eq("id", 1);
  if (error) throw new Error(error.message);

  try {
    revalidatePath("/admin/informacoes");
    revalidatePath("/");
    revalidatePath("/cadastro");
    revalidatePath("/produtos");
  } catch {
    /* ignore */
  }
}

export async function adminUpsertCatalogProduct(input: {
  id: string;
  slug: string;
  cat: string;
  category_label: string;
  name: string;
  description: string;
  image_src: string;
  price_number: number;
  active: boolean;
  /** Se definido, actualiza stock na mesma acção (menos idas ao servidor). */
  stock_quantity?: number;
}) {
  const supabase = await requireAdminSupabase();
  const { error } = await supabase.from("catalog_products").upsert(
    {
      id: input.id,
      slug: input.slug.trim(),
      cat: input.cat,
      category_label: input.category_label,
      name: input.name.trim(),
      description: input.description,
      image_src: input.image_src.trim(),
      price_number: input.price_number,
      active: input.active,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );
  if (error) throw new Error(error.message);

  if (input.stock_quantity !== undefined && Number.isFinite(input.stock_quantity) && input.stock_quantity >= 0) {
    const { error: invErr } = await supabase
      .from("inventory")
      .update({ stock_quantity: Math.floor(input.stock_quantity), updated_at: new Date().toISOString() })
      .eq("product_id", input.id);
    if (invErr) throw new Error(invErr.message);
  }

  try {
    revalidatePath("/admin/produtos");
    revalidatePath("/admin/estoque");
    revalidatePath("/produtos");
    revalidatePath(`/produtos/${input.slug.trim()}`);
    revalidatePath("/");
  } catch {
    /* revalidatePath não deve falhar a acção */
  }
}

export async function adminDeleteCatalogProduct(id: string) {
  const supabase = await requireAdminSupabase();
  const { data: row } = await supabase.from("catalog_products").select("slug").eq("id", id).maybeSingle();
  const { error: invErr } = await supabase.from("inventory").delete().eq("product_id", id);
  if (invErr) throw new Error(invErr.message);
  const { error } = await supabase.from("catalog_products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  try {
    revalidatePath("/admin/produtos");
    revalidatePath("/admin/estoque");
    revalidatePath("/produtos");
    if (row?.slug) revalidatePath(`/produtos/${row.slug}`);
    revalidatePath("/");
  } catch {
    /* ignore */
  }
}

export async function adminInsertCatalogProduct(input: {
  slug: string;
  cat: string;
  category_label: string;
  name: string;
  description: string;
  image_src: string;
  price_number: number;
  initial_stock: number;
}) {
  const supabase = await requireAdminSupabase();
  const id = String(Date.now());
  const slug = input.slug.trim() || `produto-${id}`;
  const { error } = await supabase.from("catalog_products").insert({
    id,
    slug,
    cat: input.cat,
    category_label: input.category_label,
    name: input.name.trim(),
    description: input.description,
    image_src: input.image_src.trim() || "/Logo.png",
    price_number: input.price_number,
    active: true,
  });
  if (error) throw new Error(error.message);
  const { error: invE } = await supabase.from("inventory").insert({
    product_id: id,
    stock_quantity: Math.max(0, Math.floor(input.initial_stock)),
  });
  if (invE) throw new Error(invE.message);
  try {
    revalidatePath("/admin/produtos");
    revalidatePath("/admin/estoque");
    revalidatePath("/produtos");
    revalidatePath(`/produtos/${slug}`);
    revalidatePath("/");
  } catch {
    /* ignore */
  }
}
