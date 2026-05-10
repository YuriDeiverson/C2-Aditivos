"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VendorSelectModal, { Vendor, buildVendorWhatsAppHref } from "@/components/cart/VendorSelectModal";
import { useCart } from "@/context/CartContext";

export const dynamic = "force-dynamic";

export default function FinalizarPedidoPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

  const handleSelectVendor = (vendor: Vendor) => {
    const waHref = buildVendorWhatsAppHref(vendor.phone, items);
    window.open(waHref, "_blank", "noopener,noreferrer");
    clearCart();
    router.push("/carrinho/sucesso?orcamento=1");
  };

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
          Revise os itens e escolha seu vendedor para finalizar o orçamento.
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
            <button
              type="button"
              className="cart-checkout-btn"
              onClick={() => setIsVendorModalOpen(true)}
            >
              Escolher vendedor
            </button>
            <Link href="/carrinho" className="cart-continue-link">
              ← Voltar ao carrinho
            </Link>
          </div>
        </div>
      </div>

      <VendorSelectModal
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        items={items}
        onSelectVendor={handleSelectVendor}
      />

      <Footer />
    </>
  );
}
