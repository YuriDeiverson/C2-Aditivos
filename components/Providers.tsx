"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ShopSettingsProvider } from "@/context/ShopSettingsContext";
import type { ShopSettingsRow } from "@/types/admin";
import type { ReactNode } from "react";

export default function Providers({
  children,
  shopSettings,
}: {
  children: ReactNode;
  shopSettings: ShopSettingsRow;
}) {
  return (
    <ShopSettingsProvider initial={shopSettings}>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ShopSettingsProvider>
  );
}
