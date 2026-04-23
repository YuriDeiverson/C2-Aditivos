"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { HeaderCategorySelect, HeaderSearchForm } from "@/components/layout/HeaderControls";
import { buildWhatsAppHref } from "../../lib/whatsapp";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className="nav-shell">
        <nav className="nav-ref" aria-label="Principal">
          <div className="nav-ref-left">
            <Link href="/" className="nav-ref-logo" aria-label="C2 Aditivos — Início">
              <img src="/Logo.png" alt="" width={52} height={52} />
            </Link>
            <HeaderCategorySelect />
          </div>

          <div className="nav-ref-center">
            <HeaderSearchForm />
          </div>

          <div className="nav-ref-actions">
            <Link href="/carrinho" className="nav-ref-icon-btn" aria-label={`Carrinho — ${totalItems} itens`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>

            <a
              href={buildWhatsAppHref("Olá! Gostaria de solicitar um orçamento.")}
              className="nav-ref-icon-btn"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </a>

            <button type="button" className="nav-toggle" aria-label="Abrir menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`mobile-nav-overlay ${mobileOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileOpen(false);
        }}
      >
        <div className="mobile-nav">
          <button type="button" className="mobile-nav-close" aria-label="Fechar menu" onClick={() => setMobileOpen(false)}>
            ✕
          </button>
          <div className="mobile-nav-search">
            <HeaderSearchForm />
          </div>
          <div className="mobile-nav-cat">
            <HeaderCategorySelect />
          </div>
          <Link href="/" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            Início
          </Link>
          <Link href="/produtos" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            Todos os produtos
          </Link>
          <Link href="/produtos?sort=newest" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            Novidades
          </Link>
          <Link href="/sobre" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            Sobre nós
          </Link>
          <Link href="/carrinho" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            Carrinho {totalItems > 0 && `(${totalItems})`}
          </Link>
          <a href={buildWhatsAppHref("Olá! Gostaria de solicitar um orçamento.")} className="mobile-nav-cta" target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
