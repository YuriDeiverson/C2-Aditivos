"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/browser";
import { formatAuthLoginError } from "@/lib/auth-errors";

export default function AdminLoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin";
  const urlAccessError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Supabase não configurado.");
      return;
    }
    setLoading(true);
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err || !data.user) {
      setLoading(false);
      setError(err ? formatAuthLoginError(err.message) : "Falha no login.");
      return;
    }

    await supabase.auth.getSession();

    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileErr) {
      await supabase.auth.signOut();
      setLoading(false);
      setError(`Não foi possível verificar o perfil: ${profileErr.message}`);
      return;
    }

    if (!profile || profile.role !== "admin") {
      await supabase.auth.signOut();
      setLoading(false);
      setError("Esta conta não tem role «admin» em public.profiles para o utilizador autenticado.");
      return;
    }

    const target = redirect.startsWith("/admin") ? redirect : "/admin";
    window.location.assign(target);
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {urlAccessError === "not_admin" && !error && (
        <p className="auth-error" role="alert">
          O servidor não reconheceu sessão de administrador (cookies ou perfil). Tente entrar de novo abaixo; se persistir, confirme que o projeto Supabase nas variáveis de ambiente é o mesmo onde correu o SQL.
        </p>
      )}
      {error && <p className="auth-error" role="alert">{error}</p>}
      <label className="auth-label">
        E-mail administrador
        <input
          className="auth-input"
          type="email"
          autoComplete="username"
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
        {loading ? "Entrando…" : "Entrar no painel"}
      </button>
    </form>
  );
}
