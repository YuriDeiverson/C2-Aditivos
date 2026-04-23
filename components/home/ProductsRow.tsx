import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  viewMoreHref: string;
  variant?: "light" | "smoke";
};

export default function ProductsRow({ title, subtitle, products, viewMoreHref, variant = "light" }: Props) {
  const centerGrid = products.length > 0 && products.length < 4;

  return (
    <section className={`products-row-section${variant === "smoke" ? " products-row-smoke" : ""}`}>
      <div className="products-row-header">
        <h2 className="products-row-title">{title}</h2>
        {subtitle && <p className="products-row-subtitle">{subtitle}</p>}
        <div className="products-row-divider" aria-hidden="true" />
      </div>

      <div className={`products-row-grid${centerGrid ? " products-row-grid--center" : ""}`}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="products-row-footer">
        <Link href={viewMoreHref} className="btn-outline">Ver Mais</Link>
      </div>
    </section>
  );
}
