type Props = {
  /** Texto secundário do selo de frete (ex.: mínimo configurável ou mensagem fixa). */
  freteSubtitle: string;
};

export default function TrustBadges({ freteSubtitle }: Props) {
  return (
    <div className="trust-badges">
      <div className="trust-badge">
        <svg className="trust-icon" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="1.5" />
          <path d="M16 8h4l3 4v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
        <div className="trust-text">
          <strong>Frete Grátis</strong>
          <span>{freteSubtitle}</span>
        </div>
      </div>

      <div className="trust-sep" aria-hidden="true" />

      <div className="trust-badge">
        <svg className="trust-icon" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <div className="trust-text">
          <strong>Envio Rápido</strong>
          <span>Até 5 dias úteis</span>
        </div>
      </div>

      <div className="trust-sep" aria-hidden="true" />

      <div className="trust-badge">
        <svg className="trust-icon" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <div className="trust-text">
          <strong>6x Sem Juros</strong>
          <span>No cartão de crédito</span>
        </div>
      </div>

      <div className="trust-sep" aria-hidden="true" />

      <div className="trust-badge">
        <svg className="trust-icon" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <div className="trust-text">
          <strong>Compra Segura</strong>
          <span>100% protegido</span>
        </div>
      </div>
    </div>
  );
}
