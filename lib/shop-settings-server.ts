import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { FALLBACK_SHOP_SETTINGS, normalizeShopSettingsRow } from "@/lib/shop-settings";
import type { ShopSettingsRow } from "@/types/admin";

/** Uma leitura por request (layout + metadata + páginas). */
export const getShopSettingsCached = cache(async (): Promise<ShopSettingsRow> => {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("shop_settings").select("*").eq("id", 1).maybeSingle();
    if (error || !data) {
      return { ...FALLBACK_SHOP_SETTINGS };
    }
    return normalizeShopSettingsRow(data as Record<string, unknown>);
  } catch {
    return { ...FALLBACK_SHOP_SETTINGS };
  }
});
