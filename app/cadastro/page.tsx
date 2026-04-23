import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const WA = "https://wa.me/82987317923";

export default function CadastroPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="login-page">
        <div className="login-card login-card--signup">
          <h1 className="login-title">Orçamentos via WhatsApp</h1>
          <p className="login-lead">
            Por enquanto, o cadastro e login estão desativados.
            Para solicitar orçamento e tirar dúvidas, fale conosco no WhatsApp.
          </p>
          <a href={WA} target="_blank" rel="noreferrer" className="btn-dark" style={{ width: "100%", justifyContent: "center" }}>
            Solicitar orçamento no WhatsApp
          </a>
          <p className="auth-muted auth-muted--center" style={{ marginTop: "1rem" }}>
            <Link href="/produtos">Ver produtos</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
