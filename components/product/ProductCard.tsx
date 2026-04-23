"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="pcard">
      <Link href={`/produtos/${product.slug}`} className="pcard-img-link">
        <div className="pcard-img">
          <img src={product.imageSrc} alt={product.imageAlt || product.name} />
        </div>
        {product.badgeText && (
          <span className={`product-badge ${product.badgeClass}`}>
            {product.badgeText}
          </span>
        )}
      </Link>

      <div className="pcard-body">
        <div className="pcard-cat">{product.categoryLabel}</div>
        <Link href={`/produtos/${product.slug}`} className="pcard-name">
          {product.name}
        </Link>
        <button
          className="pcard-add-btn"
          type="button"
          onClick={() => addToCart(product)}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
