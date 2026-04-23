"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { clearCartStorage, loadCartFromStorage, saveCartToStorage } from "@/lib/cart-persistence";
import type { Product } from "@/types";
import { previewCartCoupon } from "@/app/actions/coupon";
import { useShopSettings } from "@/context/ShopSettingsContext";
import { computeShipping } from "@/lib/shipping";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addSignal: number;
  couponCode: string | null;
  couponDiscountAmount: number;
  couponName: string | null;
  shippingCep: string | null;
  shippingLocationLabel: string | null;
};

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "SET_COUPON"; code: string | null; discountAmount: number; name: string | null }
  | { type: "SET_SHIPPING_PREVIEW"; cep: string | null; label: string | null }
  | {
      type: "HYDRATE";
      payload: {
        items: CartItem[];
        couponCode: string | null;
        couponDiscountAmount: number;
        couponName: string | null;
        shippingCep: string | null;
        shippingLocationLabel: string | null;
      };
    };

function reducer(state: CartState, action: CartAction): CartState {
  const clearCoupon = (s: CartState): CartState => ({
    ...s,
    couponCode: null,
    couponDiscountAmount: 0,
    couponName: null,
  });

  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.product.id === action.product.id);
      let items: CartItem[];
      if (exists) {
        items = state.items.map((i) =>
          i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        items = [...state.items, { product: action.product, quantity: 1 }];
      }
      return { ...clearCoupon({ ...state, items }), addSignal: state.addSignal + 1 };
    }
    case "REMOVE":
      return clearCoupon({ ...state, items: state.items.filter((i) => i.product.id !== action.id) });
    case "SET_QTY":
      if (action.qty <= 0) {
        return clearCoupon({ ...state, items: state.items.filter((i) => i.product.id !== action.id) });
      }
      return clearCoupon({
        ...state,
        items: state.items.map((i) => (i.product.id === action.id ? { ...i, quantity: action.qty } : i)),
      });
    case "CLEAR":
      return {
        items: [],
        addSignal: state.addSignal,
        couponCode: null,
        couponDiscountAmount: 0,
        couponName: null,
        shippingCep: null,
        shippingLocationLabel: null,
      };
    case "SET_COUPON":
      return {
        ...state,
        couponCode: action.code,
        couponDiscountAmount: action.discountAmount,
        couponName: action.name,
      };
    case "SET_SHIPPING_PREVIEW":
      return {
        ...state,
        shippingCep: action.cep,
        shippingLocationLabel: action.label,
      };
    case "HYDRATE":
      return {
        ...state,
        items: action.payload.items,
        couponCode: action.payload.couponCode,
        couponDiscountAmount: action.payload.couponDiscountAmount,
        couponName: action.payload.couponName,
        shippingCep: action.payload.shippingCep,
        shippingLocationLabel: action.payload.shippingLocationLabel,
      };
  }
}

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  merchandiseSubtotal: number;
  couponCode: string | null;
  couponDiscountAmount: number;
  couponName: string | null;
  subtotalAfterDiscount: number;
  shippingCost: number;
  shippingFree: boolean;
  grandTotal: number;
  shippingCep: string | null;
  shippingLocationLabel: string | null;
  addSignal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  setCoupon: (code: string | null, discountAmount: number, name: string | null) => void;
  applyCouponCode: (code: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  clearCoupon: () => void;
  setShippingPreview: (cep: string | null, label: string | null) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = {
  items: [],
  addSignal: 0,
  couponCode: null,
  couponDiscountAmount: 0,
  couponName: null,
  shippingCep: null,
  shippingLocationLabel: null,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const shop = useShopSettings();
  const [state, dispatch] = useReducer(reducer, initialState);
  const skipPersistRef = useRef(true);

  useLayoutEffect(() => {
    const saved = loadCartFromStorage();
    if (saved && (saved.items.length > 0 || saved.couponCode)) {
      dispatch({
        type: "HYDRATE",
        payload: {
          items: saved.items,
          couponCode: saved.couponCode,
          couponDiscountAmount: saved.couponDiscountAmount,
          couponName: saved.couponName,
          shippingCep: saved.shippingCep,
          shippingLocationLabel: saved.shippingLocationLabel,
        },
      });
    }
    skipPersistRef.current = true;
  }, []);

  useEffect(() => {
    if (skipPersistRef.current) {
      skipPersistRef.current = false;
      return;
    }
    if (state.items.length === 0 && !state.couponCode) {
      clearCartStorage();
      return;
    }
    saveCartToStorage({
      items: state.items,
      couponCode: state.couponCode,
      couponDiscountAmount: state.couponDiscountAmount,
      couponName: state.couponName,
      shippingCep: state.shippingCep,
      shippingLocationLabel: state.shippingLocationLabel,
    });
  }, [
    state.items,
    state.couponCode,
    state.couponDiscountAmount,
    state.couponName,
    state.shippingCep,
    state.shippingLocationLabel,
  ]);

  const merchandiseSubtotal = useMemo(
    () => state.items.reduce((s, i) => s + i.product.priceNumber * i.quantity, 0),
    [state.items]
  );

  const totalItems = useMemo(() => state.items.reduce((s, i) => s + i.quantity, 0), [state.items]);

  const subtotalAfterDiscount = useMemo(
    () => Math.max(0, roundMoney(merchandiseSubtotal - state.couponDiscountAmount)),
    [merchandiseSubtotal, state.couponDiscountAmount]
  );

  const { cost: shippingCost, free: shippingFree } = useMemo(
    () =>
      computeShipping(subtotalAfterDiscount, {
        shipping_free_min_subtotal: shop.shipping_free_min_subtotal,
        shipping_paid_cost: shop.shipping_paid_cost,
      }),
    [subtotalAfterDiscount, shop.shipping_free_min_subtotal, shop.shipping_paid_cost]
  );

  const grandTotal = useMemo(
    () => roundMoney(subtotalAfterDiscount + shippingCost),
    [subtotalAfterDiscount, shippingCost]
  );

  const applyCouponCode = useCallback(
    async (code: string) => {
      const trimmed = code.trim();
      if (!trimmed) {
        return { ok: false as const, message: "Informe o código." };
      }
      const r = await previewCartCoupon(trimmed, merchandiseSubtotal);
      if (!r.ok) {
        return { ok: false as const, message: r.message };
      }
      dispatch({
        type: "SET_COUPON",
        code: r.code,
        discountAmount: r.discountAmount,
        name: r.name,
      });
      return { ok: true as const };
    },
    [merchandiseSubtotal]
  );

  const clearCoupon = useCallback(() => {
    dispatch({ type: "SET_COUPON", code: null, discountAmount: 0, name: null });
  }, []);

  const setShippingPreview = useCallback((cep: string | null, label: string | null) => {
    dispatch({ type: "SET_SHIPPING_PREVIEW", cep, label });
  }, []);

  const setCoupon = useCallback((code: string | null, discountAmount: number, name: string | null) => {
    dispatch({ type: "SET_COUPON", code, discountAmount, name });
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        merchandiseSubtotal,
        couponCode: state.couponCode,
        couponDiscountAmount: state.couponDiscountAmount,
        couponName: state.couponName,
        subtotalAfterDiscount,
        shippingCost,
        shippingFree,
        grandTotal,
        shippingCep: state.shippingCep,
        shippingLocationLabel: state.shippingLocationLabel,
        addSignal: state.addSignal,
        addToCart: (p) => dispatch({ type: "ADD", product: p }),
        removeFromCart: (id) => dispatch({ type: "REMOVE", id }),
        setQuantity: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        setCoupon,
        applyCouponCode,
        clearCoupon,
        setShippingPreview,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
