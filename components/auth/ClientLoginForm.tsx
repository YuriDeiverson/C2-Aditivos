"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/browser";
import { formatAuthLoginError } from "@/lib/auth-errors";

export default function ClientLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const pendingConfirm = searchParams.get("pending") === "confirm-email";
  const justRegistered = searchParams.get("registered") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Supabase não configurado. Verifique o .env.local.");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(formatAuthLoginError(err.message));
      return;
    }
    router.push(redirect);
    router.refresh();
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {pendingConfirm && (
        <p className="auth-info" role="status">
          Conta criada. Confirme o e-mail através do link que enviámos antes de iniciar sessão com palavra-passe.
        </p>
      )}
      {justRegistered && !pendingConfirm && (
        <p className="auth-info" role="status">
          Conta criada. Já pode iniciar sessão.
        </p>
      )}
      {error && <p className="auth-error" role="alert">{error}</p>}
      <label className="auth-label">
        E-mail
        <input
          className="auth-input"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="auth-label">
        Senha
        <input
          className="auth-input"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="btn-dark auth-submit" type="submit" disabled={loading}>
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
