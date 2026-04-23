"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppHref } from "../../lib/whatsapp";

export const dynamic = "force-dynamic";

export default function CarrinhoPage() {
  const router = useRouter();
  const {
    items,
    setQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const waHref = buildWhatsAppHref(
    `Olá! Gostaria de solicitar um orçamento.\n\nItens:\n${items
      .map(({ product, quantity }) => `- ${quantity}x ${product.name}`)
      .join("\n")}`
  );

  if (items.length === 0) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <div className="cart-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--border)", marginBottom: "1rem" }}>
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h2>Seu carrinho está vazio</h2>
          <p>Explore nossos produtos e adicione ao carrinho.</p>
          <Link href="/produtos" className="btn-dark">Ver Produtos</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Header />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>›</span>
        <span>Carrinho</span>
      </nav>

      <div className="cart-page">
        <h1 className="cart-page-title">Seu Carrinho</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item">
                <div className="cart-item-img">
                  <img src={product.imageSrc} alt={product.name} />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-cat">{product.categoryLabel}</div>
                  <Link href={`/produtos/${product.slug}`} className="cart-item-name">
                    {product.name}
                  </Link>
                  <div className="cart-item-meta">Quantidade: {quantity}</div>
                </div>
                <div className="cart-item-controls">
                  <div className="qty-control">
                    <button type="button" onClick={() => setQuantity(product.id, quantity - 1)} aria-label="Diminuir">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(product.id, quantity + 1)} aria-label="Aumentar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </button>
                    <button className="cart-item-remove" type="button" onClick={() => removeFromCart(product.id)} aria-label="Remover">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="cart-summary-title">Finalizar Pedido</h3>

            <button
              type="button"
              className="cart-checkout-btn"
              onClick={() => {
                window.open(waHref, "_blank", "noopener,noreferrer");
                clearCart();
                router.push("/carrinho/sucesso?orcamento=1");
              }}
            >
              Solicitar orçamento
            </button>
            <p className="cart-checkout-hint">Você envia a lista de itens no WhatsApp e retornamos com o orçamento.</p>

            <Link href="/produtos" className="cart-continue-link">
              ← Continuar Comprando
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
