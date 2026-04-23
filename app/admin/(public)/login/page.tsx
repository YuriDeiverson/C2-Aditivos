import { Suspense } from "react";
import Link from "next/link";
import AdminLoginForm from "@/components/auth/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="admin-auth-page">
      <div className="admin-auth-card">
        <Link href="/" className="admin-auth-brand">
          C2 Aditivos
        </Link>
        <h1>Painel administrativo</h1>
        <p className="admin-auth-lead">Acesso restrito a administradores.</p>
        <Suspense fallback={<p className="auth-muted">Carregando…</p>}>
          <AdminLoginForm />
        </Suspense>
        <p className="auth-muted auth-muted--center">
          <Link href="/">Voltar ao site</Link>
        </p>
      </div>
    </main>
  );
}
