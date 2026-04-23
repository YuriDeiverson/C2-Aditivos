"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function FloatingCart() {
  const { items, totalItems, addSignal } = useCart();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (addSignal === 0) return;
    setExpanded(true);
    const t = window.setTimeout(() => setExpanded(false), 4500);
    return () => window.clearTimeout(t);
  }, [addSignal]);

  if (totalItems === 0) return null;

  const preview = items.slice(0, 3);

  return (
    <div
      className={`floating-cart${expanded ? " floating-cart--expanded" : ""}`}
      role="region"
      aria-label="Carrinho"
    >
      <button
        type="button"
        className="floating-cart-toggle"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        aria-label={`Abrir carrinho — ${totalItems} itens`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span className="floating-cart-badge">{totalItems}</span>
      </button>

      <div className="floating-cart-panel">
        <div className="floating-cart-head">
          <strong>Carrinho</strong>
          <span className="floating-cart-sub">{totalItems} itens</span>
        </div>

        <ul className="floating-cart-list">
          {preview.map(({ product, quantity }) => (
            <li key={product.id} className="floating-cart-line">
              <div className="floating-cart-thumb">
                <img src={product.imageSrc} alt="" />
              </div>
              <div className="floating-cart-line-info">
                <span className="floating-cart-line-name">{product.name}</span>
                <span className="floating-cart-line-qty">× {quantity}</span>
              </div>
            </li>
          ))}
          {items.length > 3 && (
            <li className="floating-cart-more">+ {items.length - 3} outros</li>
          )}
        </ul>

        <Link href="/carrinho" className="floating-cart-cta">
          Ver carrinho completo
        </Link>
      </div>
    </div>
  );
}
