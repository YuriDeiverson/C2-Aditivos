"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  );
}

export default function NavAccount() {
  const { user, profile, loading, configured } = useAuth();

  /* Sem variáveis NEXT_PUBLIC_* o login no browser não funciona, mas o ícone deve aparecer sempre. */
  if (!configured) {
    return (
      <div className="nav-ref-account-slot">
        <Link href="/login" className="nav-ref-icon-btn" aria-label="Entrar">
          <UserIcon />
        </Link>
      </div>
    );
  }

  if (!loading && user) {
    return (
      <div className="nav-ref-account-slot">
        <Link href="/conta/pedidos" className="nav-ref-icon-btn nav-account-compact" aria-label="Minha conta">
          <UserIcon />
        </Link>
        <div className="nav-account nav-account-wide">
          <span className="nav-account-name" title={user.email ?? ""}>
            {profile?.full_name?.trim() || user.email?.split("@")[0]}
          </span>
          <Link href="/conta/pedidos" className="nav-ref-text-link">
            Pedidos
          </Link>
          <form method="post" action="/auth/signout" className="nav-account-signout-form">
            <input type="hidden" name="next" value="/login" />
            <button type="submit" className="nav-ref-text-btn">
              Sair
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* Durante o carregamento da sessão mantém o link clicável (evita “ícone bloqueado”). */
  return (
    <div className="nav-ref-account-slot">
      <Link
        href="/login"
        className={`nav-ref-icon-btn${loading ? " nav-account-loading" : ""}`}
        aria-label="Entrar"
        aria-busy={loading}
      >
        <UserIcon />
      </Link>
    </div>
  );
}
