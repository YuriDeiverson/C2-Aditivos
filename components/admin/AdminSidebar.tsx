import Link from "next/link";

const LINKS = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/informacoes", label: "Informações" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/notificacoes", label: "Notificações" },
  { href: "/admin/cupons", label: "Cupons e frete" },
  { href: "/admin/estoque", label: "Estoque rápido" },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-sidebar-brand">
        Admin C2
      </Link>
      <nav className="admin-sidebar-nav">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="admin-sidebar-link">
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="admin-sidebar-foot">
        <form method="post" action="/auth/signout" className="admin-sidebar-signout-form">
          <input type="hidden" name="next" value="/admin/login" />
          <button type="submit" className="admin-sidebar-signout-btn">
            Sair
          </button>
        </form>
      </div>
    </aside>
  );
}
