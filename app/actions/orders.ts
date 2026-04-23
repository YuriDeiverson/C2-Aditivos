"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ShippingAddressInput } from "@/types/admin";

export type CartLineInput = {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
};

export async function submitOrderFromCart(input: {
  items: CartLineInput[];
  subtotal: number;
  shipping: number;
  total: number;
  shipping_address?: ShippingAddressInput | null;
  coupon_code?: string | null;
  coupon_discount?: number;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr || !user) {
    throw new Error("Faça login para finalizar o pedido.");
  }

  const addr = input.shipping_address;
  const p_shipping_address = addr
    ? {
        cep: addr.cep,
        city: addr.city,
        state: addr.state,
        street: addr.street,
        number: addr.number,
        complement: addr.complement ?? "",
        recipient_name: addr.recipient_name,
        phone: addr.phone,
      }
    : {};

  const { data: orderId, error } = await supabase.rpc("create_order_from_cart", {
    p_customer_email: user.email ?? "",
    p_subtotal: input.subtotal,
    p_shipping: input.shipping,
    p_total: input.total,
    p_items: input.items,
    p_shipping_address: p_shipping_address,
    p_coupon_code: input.coupon_code?.trim() || null,
    p_coupon_discount: input.coupon_discount ?? 0,
  });

  if (error) {
    const msg = error.message || "";
    if (msg.includes("shipping_mismatch")) {
      throw new Error("O valor do frete não confere com as regras actuais da loja. Actualize a página e tente novamente.");
    }
    if (msg.includes("total_mismatch")) {
      throw new Error("O total do pedido mudou. Actualize o carrinho e tente novamente.");
    }
    throw new Error(error.message || "Não foi possível criar o pedido.");
  }

  if (addr?.phone || addr?.city) {
    const { error: profErr } = await supabase
      .from("profiles")
      .update({
        phone: addr.phone || null,
        city: addr.city || null,
      })
      .eq("id", user.id);
    if (profErr) {
      console.warn("profiles update:", profErr.message);
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/pedidos");
  revalidatePath("/admin/notificacoes");
  revalidatePath("/conta/pedidos");
  return { orderId: orderId as string };
}
