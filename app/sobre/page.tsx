import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { buildWhatsAppHref } from "../../lib/whatsapp";

export const metadata = {
  title: "Sobre Nós — C2 Aditivos",
  description: "Conheça a história da C2 Aditivos, mais de 32 anos fornecendo ingredientes de qualidade para a panificação brasileira.",
};

const STATS = [
  { value: "32+", label: "Anos de mercado" },
  { value: "1.200+", label: "Clientes ativos" },
  { value: "48", label: "Produtos no portfólio" },
  { value: "18", label: "Estados atendidos" },
];

const VALUES = [
  { icon: "🏆", title: "Qualidade", desc: "Cada produto passa por rigorosos controles de qualidade antes de chegar às suas mãos." },
  { icon: "🔬", title: "Inovação", desc: "Investimos continuamente em pesquisa e desenvolvimento para trazer as melhores soluções." },
  { icon: "🤝", title: "Confiança", desc: "Construímos relações duradouras com nossos clientes baseadas em transparência e consistência." },
  { icon: "🚀", title: "Performance", desc: "Nossos produtos são desenvolvidos para maximizar a produtividade e qualidade da sua produção." },
];

export default function SobrePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="section-label">Nossa História</div>
          <h1 className="about-hero-title">
            Tradição e Inovação na<br />
            <em>Panificação Brasileira</em>
          </h1>
          <p className="about-hero-desc">
            Desde 1992, fornecemos ingredientes técnicos de alta qualidade para padarias,
            confeitarias e indústrias alimentícias em todo o Brasil.
          </p>
        </div>
        <div className="about-hero-img">
          <img src="/different-types-bread-made-from-wheat-flour.jpg" alt="Pães C2 Aditivos" />
        </div>
      </section>

      {/* Stats */}
      <div className="about-stats-bar">
        {STATS.map((s) => (
          <div key={s.label} className="about-stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Story */}
      <section className="about-story">
        <div className="about-story-text">
          <div className="section-label">Quem Somos</div>
          <h2 className="section-title">Três décadas entregando o melhor para sua <em>panificação</em></h2>
          <p className="about-body">
            Nascida da visão de profissionais da área de alimentos, a C2 Aditivos construiu sua trajetória
            atendendo diferentes perfis de clientes, desde pequenas padarias artesanais até grandes
            indústrias alimentícias com operação em escala nacional.
          </p>
          <p className="about-body">
            Trabalhamos com a comercialização e desenvolvimento de produtos alimentícios, incluindo aditivos,
            melhoradores e bases para pães, doces e massas — sempre com foco em desempenho, padronização e
            segurança alimentar.
          </p>
          <p className="about-body">
            Atendemos desde padarias e confeitarias até comércios e operações alimentícias que buscam
            regularidade no resultado e confiança no fornecimento.
          </p>
        </div>
        <div className="about-story-img">
          <img src="/close-up-challah-dish-hanukkah.jpg" alt="Produção artesanal" />
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values-header">
          <div className="section-label" style={{ justifyContent: "center" }}>Nossos Valores</div>
          <h2 className="section-title">O que nos move</h2>
        </div>
        <div className="about-values-grid">
          {VALUES.map((v) => (
            <div key={v.title} className="about-value-card">
              <span className="about-value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Pronto para elevar sua produção?</h2>
        <p>Fale conosco e descubra como nossos produtos podem transformar sua panificação.</p>
        <div className="about-cta-btns">
          <a href="/produtos" className="btn-dark">Ver Produtos</a>
          <a href={buildWhatsAppHref("Olá! Vim pela página Sobre e gostaria de solicitar um orçamento.")} target="_blank" rel="noreferrer" className="btn-outline-dark">
            Falar no WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
