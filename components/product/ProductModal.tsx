"use client";

import { useEffect, useMemo } from "react";
import type { Product } from "@/types";
import { buildWhatsAppHref } from "../../lib/whatsapp";

function splitSpecs(specs: string) {
  return specs
    .split(" | ")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [label, ...rest] = s.split(":");
      return { label: label.trim(), value: rest.join(":").trim() };
    });
}

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const specs = useMemo(() => {
    if (!product) return [];
    return [...splitSpecs(product.specs1), ...splitSpecs(product.specs2)];
  }, [product]);

  return (
    <div
      className={`modal-overlay ${product ? "open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label={product?.name}>
        <button
          className="modal-close"
          onClick={onClose}
          type="button"
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="modal-img">
          {product && (
            <img
              src={product.imageSrc}
              alt={product.imageAlt || product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}
        </div>

        <div className="modal-body">
          <div className="modal-cat">{product?.categoryLabel}</div>
          <div className="modal-name">{product?.name}</div>
          <div className="modal-desc">{product?.desc}</div>

          <div className="modal-specs">
            {specs.map((s, idx) => (
              <div className="spec" key={`${s.label}-${idx}`}>
                <label>{s.label}</label>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <a
              href={
                product
                  ? buildWhatsAppHref(`Olá! Gostaria de solicitar um orçamento.\n\nProduto: ${product.name}`)
                  : buildWhatsAppHref()
              }
              className="btn-primary"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
            >
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
