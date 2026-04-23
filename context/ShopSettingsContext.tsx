"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { ShopSettingsRow } from "@/types/admin";

const ShopSettingsContext = createContext<ShopSettingsRow | null>(null);

export function ShopSettingsProvider({
  initial,
  children,
}: {
  initial: ShopSettingsRow;
  children: ReactNode;
}) {
  const value = useMemo(() => initial, [initial]);
  return <ShopSettingsContext.Provider value={value}>{children}</ShopSettingsContext.Provider>;
}

export function useShopSettings(): ShopSettingsRow {
  const ctx = useContext(ShopSettingsContext);
  if (!ctx) {
    throw new Error("useShopSettings must be used inside ShopSettingsProvider");
  }
  return ctx;
}
