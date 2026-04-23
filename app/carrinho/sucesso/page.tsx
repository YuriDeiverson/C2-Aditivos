import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Props = { searchParams: Promise<{ pedido?: string; orcamento?: string }> };

export default async function CarrinhoSucessoPage({ searchParams }: Props) {
  const { pedido, orcamento } = await searchParams;
  const isOrcamento = orcamento === "1";

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="login-page">
        <div className="login-card login-card--wide">
          <h1 className="login-title">{isOrcamento ? "Orçamento solicitado" : "Pedido recebido"}</h1>
          <p className="login-lead">
            {isOrcamento ? (
              <>
                Pronto! Seu orçamento foi solicitado via WhatsApp. Agora é só aguardar nosso retorno.
              </>
            ) : (
              <>
                Obrigado pela sua compra.
                {pedido && (
                  <>
                    {" "}
                    Referência do pedido: <strong>{pedido}</strong>
                  </>
                )}
              </>
            )}
          </p>
          <div className="login-actions">
            <Link href="/produtos" className="btn-dark">
              Voltar aos produtos
            </Link>
            <Link href="/produtos" className="login-back">
              Continuar a comprar
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
