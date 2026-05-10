"use client";

import { useEffect } from "react";

export type Vendor = {
  id: string;
  name: string;
  role: string;
  phone: string;
  avatar: string;
  color: string;
};

const VENDORS: Vendor[] = [
  {
    id: "pedro",
    name: "Pedro",
    role: "Consultor Técnico",
    phone: "5511999999991",
    avatar: "👨‍💼",
    color: "#C8893A",
  },
  {
    id: "junior",
    name: "Junior",
    role: "Especialista em Vendas",
    phone: "5511999999992",
    avatar: "👨‍💻",
    color: "#4A7C59",
  },
  {
    id: "thiago",
    name: "Thiago",
    role: "Gerente Comercial",
    phone: "5511999999993",
    avatar: "👔",
    color: "#1C1208",
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items: { product: { name: string }; quantity: number }[];
  onSelectVendor: (vendor: Vendor) => void;
};

export function buildVendorWhatsAppHref(vendorPhone: string, items: { product: { name: string }; quantity: number }[]) {
  const itemsText = items.map(({ product, quantity }) => `- ${quantity}x ${product.name}`).join("\n");
  const message = `Olá! Gostaria de solicitar um orçamento.\n\nItens:\n${itemsText}`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${vendorPhone}?text=${encoded}`;
}

export default function VendorSelectModal({ isOpen, onClose, items, onSelectVendor }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="vendor-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vendor-modal-title"
    >
      <div className="vendor-modal">
        <button className="vendor-modal-close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className="vendor-modal-header">
          <h2 id="vendor-modal-title" className="vendor-modal-title">
            Escolha seu vendedor
          </h2>
          <p className="vendor-modal-subtitle">
            Selecione com quem deseja falar para finalizar seu orçamento
          </p>
        </div>

        <div className="vendor-list">
          {VENDORS.map((vendor) => (
            <button
              key={vendor.id}
              className="vendor-card"
              onClick={() => onSelectVendor(vendor)}
              style={{ "--vendor-color": vendor.color } as React.CSSProperties}
            >
              <div className="vendor-avatar" style={{ background: vendor.color }}>
                <span>{vendor.avatar}</span>
              </div>
              <div className="vendor-info">
                <span className="vendor-name">{vendor.name}</span>
                <span className="vendor-role">{vendor.role}</span>
              </div>
              <div className="vendor-action">
                <span className="vendor-btn">Falar com vendedor</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className="vendor-modal-footer">
          <p>💬 Você será redirecionado para o WhatsApp</p>
        </div>
      </div>
    </div>
  );
}
