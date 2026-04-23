import type { Product } from "@/types";

const STORAGE_KEY = "c2aditivos.cart.v1";

export type PersistedLine = { product: Product; quantity: number };

export type PersistedCartSlice = {
  items: PersistedLine[];
  couponCode: string | null;
  couponDiscountAmount: number;
  couponName: string | null;
  shippingCep: string | null;
  shippingLocationLabel: string | null;
};

function reviveProduct(raw: unknown): Product | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.id !== "string" || typeof o.slug !== "string" || typeof o.name !== "string") return null;
  const priceNumber = typeof o.priceNumber === "number" && Number.isFinite(o.priceNumber) ? o.priceNumber : NaN;
  if (!Number.isFinite(priceNumber)) return null;

  const cat = typeof o.cat === "string" ? o.cat : "melhorador";
  const validCat = ["melhorador", "base", "enzima", "fermentacao", "gordura"].includes(cat) ? cat : "melhorador";

  return {
    id: o.id,
    slug: o.slug,
    cat: validCat as Product["cat"],
    categoryLabel: typeof o.categoryLabel === "string" ? o.categoryLabel : "",
    name: o.name,
    desc: typeof o.desc === "string" ? o.desc : "",
    imageSrc: typeof o.imageSrc === "string" ? o.imageSrc : "/Logo.png",
    imageAlt: typeof o.imageAlt === "string" ? o.imageAlt : o.name,
    price: typeof o.price === "string" ? o.price : `R$ ${priceNumber.toFixed(2).replace(".", ",")}`,
    priceNumber,
    priceLabel: typeof o.priceLabel === "string" ? o.priceLabel : "",
    specs1: typeof o.specs1 === "string" ? o.specs1 : "",
    specs2: typeof o.specs2 === "string" ? o.specs2 : "",
    tags: Array.isArray(o.tags) ? o.tags.filter((t): t is string => typeof t === "string") : [],
    badgeClass:
      o.badgeClass === "badge-new" || o.badgeClass === "badge-top" || o.badgeClass === "badge-pro"
        ? o.badgeClass
        : undefined,
    badgeText: typeof o.badgeText === "string" ? o.badgeText : undefined,
    rating: typeof o.rating === "number" && Number.isFinite(o.rating) ? o.rating : 5,
    reviewCount: typeof o.reviewCount === "number" && Number.isFinite(o.reviewCount) ? Math.max(0, o.reviewCount) : 0,
  };
}

function reviveCartItem(raw: unknown): PersistedLine | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const product = reviveProduct(o.product);
  const qty = typeof o.quantity === "number" && Number.isFinite(o.quantity) ? Math.floor(o.quantity) : 0;
  if (!product || qty < 1) return null;
  return { product, quantity: qty };
}

export function loadCartFromStorage(): PersistedCartSlice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object") return null;
    const d = data as Record<string, unknown>;
    if (d.v !== 1 || !Array.isArray(d.items)) return null;
    const items: PersistedLine[] = [];
    for (const el of d.items) {
      const item = reviveCartItem(el);
      if (item) items.push(item);
    }
    return {
      items,
      couponCode: typeof d.couponCode === "string" && d.couponCode ? d.couponCode : null,
      couponDiscountAmount:
        typeof d.couponDiscountAmount === "number" && Number.isFinite(d.couponDiscountAmount)
          ? Math.max(0, d.couponDiscountAmount)
          : 0,
      couponName: typeof d.couponName === "string" ? d.couponName : null,
      shippingCep: typeof d.shippingCep === "string" ? d.shippingCep : null,
      shippingLocationLabel: typeof d.shippingLocationLabel === "string" ? d.shippingLocationLabel : null,
    };
  } catch {
    return null;
  }
}

export function saveCartToStorage(slice: PersistedCartSlice): void {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      v: 1 as const,
      items: slice.items,
      couponCode: slice.couponCode,
      couponDiscountAmount: slice.couponDiscountAmount,
      couponName: slice.couponName,
      shippingCep: slice.shippingCep,
      shippingLocationLabel: slice.shippingLocationLabel,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}

export function clearCartStorage(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
