import { products as staticProducts } from "@/lib/products";
import type { Product, ProductCategory } from "@/types";

type CatalogRow = {
  id: string;
  slug: string;
  cat: string;
  category_label: string;
  name: string;
  description: string | null;
  image_src: string | null;
  price_number: number | string | null;
  active?: boolean | null;
};

const VALID_CATS = new Set<string>(["fermento", "melhorador", "preparado", "conservante", "confeitaria", "ingrediente"]);

function formatPriceBRL(n: number): string {
  return `R$ ${n.toFixed(2).replace(".", ",")}`;
}

function normalizeCat(raw: string): Exclude<ProductCategory, "all"> {
  return VALID_CATS.has(raw) ? (raw as Exclude<ProductCategory, "all">) : "melhorador";
}

/** Junta linha da BD com metadados do catálogo estático (badges, specs, avaliações) quando o id/slug coincide. */
export function catalogRowToProduct(row: CatalogRow): Product {
  const staticMatch = staticProducts.find((p) => p.id === row.id || p.slug === row.slug);
  const priceNum = Number(row.price_number);
  const safePrice = Number.isFinite(priceNum) ? priceNum : 0;

  return {
    id: row.id,
    slug: row.slug,
    cat: normalizeCat(row.cat),
    categoryLabel: row.category_label?.trim() || row.cat,
    name: row.name?.trim() || "Produto",
    desc: (row.description ?? "").trim() || staticMatch?.desc || "",
    details: staticMatch?.details,
    imageSrc: (row.image_src ?? "").trim() || "/Logo.png",
    imageAlt: row.name?.trim() || staticMatch?.imageAlt || "Produto",
    price: formatPriceBRL(safePrice),
    priceNumber: safePrice,
    priceLabel: staticMatch?.priceLabel ?? "Consulte embalagem",
    specs1: staticMatch?.specs1 ?? "Detalhes técnicos: contacte-nos ou consulte a ficha do produto.",
    specs2: staticMatch?.specs2 ?? "",
    tags: staticMatch?.tags ?? [],
    badgeClass: staticMatch?.badgeClass,
    badgeText: staticMatch?.badgeText,
    rating: staticMatch?.rating ?? 4,
    reviewCount: staticMatch?.reviewCount ?? 0,
  };
}

/** Catálogo público (activo) a partir do Supabase; se falhar ou estiver vazio, usa `lib/products.ts`. */
export async function fetchStorefrontCatalog(): Promise<Product[]> {
  return staticProducts;
}
