"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppHref } from "../../../lib/whatsapp";

export const dynamic = "force-dynamic";

export default function FinalizarPedidoPage() {
  const { items } = useCart();

  const waHref = buildWhatsAppHref(
    `Olá! Gostaria de solicitar um orçamento.\n\nItens:\n${items
      .map(({ product, quantity }) => `- ${quantity}x ${product.name}`)
      .join("\n")}`
  );

  return (
    <>
      <AnnouncementBar />
      <Header />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/carrinho">Carrinho</Link>
        <span>›</span>
        <span>Finalizar</span>
      </nav>

      <div className="cart-page">
        <h1 className="cart-page-title">Solicitar orçamento</h1>
        <p className="login-lead" style={{ maxWidth: "560px", marginBottom: "1.5rem" }}>
          Revise os itens e envie no WhatsApp para receber o orçamento.
        </p>

        <div className="checkout-grid checkout-grid--wide">
          <div className="checkout-items">
            <h2 className="checkout-block-title">Itens</h2>
            {items.length === 0 ? (
              <p className="auth-muted">Seu carrinho está vazio.</p>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="checkout-line">
                  <span>{product.name}</span>
                  <span>× {quantity}</span>
                </div>
              ))
            )}
          </div>

          <div className="checkout-summary">
            <h3 className="cart-summary-title">WhatsApp</h3>
            <a href={waHref} target="_blank" rel="noreferrer" className="cart-checkout-btn">
              Solicitar orçamento no WhatsApp
            </a>
            <Link href="/carrinho" className="cart-continue-link">
              ← Voltar ao carrinho
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
