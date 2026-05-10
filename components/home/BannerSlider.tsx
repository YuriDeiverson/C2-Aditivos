"use client";

import Link from "next/link";

export default function BannerSlider() {
  return (
    <>
      <style>{`
        .hero-banner {
          width: 100%;
          position: relative;
          overflow: hidden;
          background: #1a1008;
        }

        /* DESKTOP */
        .hero-track {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 6;
          display: flex;
          align-items: center;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .hero-track {
            aspect-ratio: 16 / 12;
            min-height: 320px;
            max-height: 450px;
          }
        }

        /* IMAGEM */
        .hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* OVERLAY ESCURO */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0,0,0,0.7) 0%,
            rgba(0,0,0,0.4) 50%,
            rgba(0,0,0,0.2) 100%
          );
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .hero-overlay {
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.8) 0%,
              rgba(0,0,0,0.5) 60%,
              rgba(0,0,0,0.3) 100%
            );
          }
        }

        /* CONTEÚDO */
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 4vw;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
        }

        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column;
            padding: 0 1.5rem;
            gap: 1.5rem;
            justify-content: flex-end;
            text-align: center;
            height: 100%;
          }
        }

        .hero-text {
          flex: 1;
          max-width: 600px;
        }

        @media (max-width: 768px) {
          .hero-text {
            max-width: 100%;
            margin-bottom: 1rem;
          }
        }

        /* BADGE CUPOM */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200, 137, 58, 0.9);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 20px rgba(200, 137, 58, 0.3);
        }

        .hero-badge svg {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 768px) {
          .hero-badge {
            font-size: 0.6rem;
            padding: 0.3rem 0.6rem;
            margin-bottom: 0.8rem;
          }
        }

        /* TÍTULO */
        .hero-title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 1rem;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(1.3rem, 4vw, 1.8rem);
            margin-bottom: 0.6rem;
            line-height: 1.1;
          }
        }

        /* DESCRIÇÃO */
        .hero-desc {
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          max-width: 500px;
        }

        @media (max-width: 768px) {
          .hero-desc {
            font-size: 0.8rem;
            margin-bottom: 1rem;
            max-width: 100%;
            line-height: 1.4;
          }
        }

        /* CTA BUTTONS */
        .hero-ctas {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero-ctas {
            flex-direction: column;
            width: 100%;
            gap: 0.8rem;
          }
        }

        .hero-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--caramel);
          color: #fff;
          padding: 0.875rem 1.75rem;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 30px rgba(200, 137, 58, 0.4);
          position: relative;
          overflow: hidden;
        }

        .hero-cta-primary:hover {
          background: #b8792f;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(200, 137, 58, 0.5);
        }

        .hero-cta-primary svg {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }

        .hero-cta-primary:hover svg {
          transform: translateX(2px);
        }

        @media (max-width: 768px) {
          .hero-cta-primary {
            width: 100%;
            justify-content: center;
            padding: 0.8rem 1rem;
            font-size: 0.85rem;
          }
        }

        .hero-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 0.875rem 1.75rem;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .hero-cta-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .hero-cta-secondary svg {
          width: 18px;
          height: 18px;
        }

        @media (max-width: 768px) {
          .hero-cta-secondary {
            width: 100%;
            justify-content: center;
            padding: 0.8rem 1rem;
            font-size: 0.85rem;
          }
        }

        /* BOX DE DESCONTO */
        .hero-discount-box {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 1.5rem;
          max-width: 280px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .hero-discount-box {
            max-width: 100%;
            padding: 1rem;
            margin-top: 0.5rem;
          }
        }

        .discount-title {
          font-family: var(--font-playfair), serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 0.4rem;
        }

        @media (max-width: 768px) {
          .discount-title {
            font-size: 0.95rem;
            margin-bottom: 0.3rem;
          }
        }

        .discount-desc {
          font-size: 0.8rem;
          color: var(--text-2);
          line-height: 1.4;
          margin-bottom: 0.8rem;
        }

        .discount-code {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-alt);
          padding: 0.6rem 0.8rem;
          border-radius: 10px;
          margin-bottom: 0.8rem;
          border: 2px dashed var(--caramel);
        }

        .discount-code-label {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-2);
          letter-spacing: 0.06em;
        }

        .discount-code-value {
          font-family: 'Courier New', monospace;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--caramel);
          letter-spacing: 0.05em;
        }

        .discount-cta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background: var(--caramel);
          color: #fff;
          padding: 0.6rem;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .discount-cta:hover {
          background: #b8792f;
          transform: translateY(-1px);
        }

        .discount-cta svg {
          width: 14px;
          height: 14px;
        }
      `}</style>

      <div className="hero-banner">
        <div className="hero-track">
          <img
            src="/different-types-bread-made-from-wheat-flour.jpg"
            alt="Padaria artesanal com produtos de alta qualidade"
            className="hero-img"
            loading="eager"
            decoding="sync"
          />
          <div className="hero-overlay" />
          
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                Cupom Exclusivo Primeira Compra
              </div>
              
              <h1 className="hero-title">
                Transforme Sua Panificação com Ingredientes Profissionais
              </h1>
              
              <p className="hero-desc">
                Aditivos e melhoradores de alta qualidade para elevar seus produtos a outro nível. Frete grátis para todo Brasil em compras acima de R$ 200.
              </p>
              
              <div className="hero-ctas">
                <Link href="/produtos" className="hero-cta-primary">
                  Ver Produtos
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                
                <Link href="#categories" className="hero-cta-secondary">
                  Explorar Categorias
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="hero-discount-box">
              <h3 className="discount-title">15% OFF</h3>
              <p className="discount-desc">
                Na sua primeira compra. Use o cupom abaixo e aproveite!
              </p>
              
              <div className="discount-code">
                <span className="discount-code-label">Cupom:</span>
                <span className="discount-code-value">PRIMEIRA15</span>
              </div>
              
              <Link href="/produtos" className="discount-cta">
                Aplicar Cupom
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

