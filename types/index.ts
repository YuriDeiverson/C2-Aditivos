export type ProductCategory =
  | "all"
  | "fermento"
  | "melhorador"
  | "preparado"
  | "conservante"
  | "confeitaria"
  | "ingrediente";

export type Product = {
  id: string;
  slug: string;
  cat: Exclude<ProductCategory, "all">;
  categoryLabel: string;
  name: string;
  desc: string;
  details?: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  priceNumber: number;
  priceLabel: string;
  specs1: string;
  specs2: string;
  tags: string[];
  badgeClass?: "badge-new" | "badge-top" | "badge-pro";
  badgeText?: string;
  rating: number;
  reviewCount: number;
};
