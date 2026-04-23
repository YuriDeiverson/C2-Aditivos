"use client";

const REVIEWS = [
  {
    id: "1",
    stars: "★★★★★",
    text: "Desde que adotamos o Melhorador Premium da C2 Aditivos, nossos pães franceses ganharam volume e padronização absurdos. A vida útil aumentou e as reclamações acabaram.",
    name: "Marcelo Ferreira",
    role: "Padaria Ferreira & Filhos — São Paulo, SP",
    initial: "M",
  },
  {
    id: "2",
    stars: "★★★★★",
    text: "O suporte técnico é diferenciado. Quando tivemos dúvidas sobre dosagem para longa fermentação, o time da C2 Aditivos veio até nossa fábrica e ajustou a fórmula sem custo adicional.",
    name: "Ana Lima",
    role: "Diretora Industrial — Grupo Trigão — Campinas, SP",
    initial: "A",
  },
  {
    id: "3",
    stars: "★★★★★",
    text: "Trabalhamos com 15 fornecedores de melhoradores ao longo dos anos. C2 Aditivos é o único que entrega consistência lote a lote e documentação completa sem precisar pedir.",
    name: "Ricardo Alves",
    role: "Gestor de Qualidade — Rede Ouro Pão — Belo Horizonte, MG",
    initial: "R",
  },
  {
    id: "4",
    stars: "★★★★★",
    text: "A base multigrãos reduziu nosso tempo de produção e o feedback dos clientes sobre sabor e textura foi excelente. Recomendo fortemente.",
    name: "Patricia Souza",
    role: "Proprietária — Pão & Arte — Curitiba, PR",
    initial: "P",
  },
  {
    id: "5",
    stars: "★★★★★",
    text: "Entrega rápida e produtos sempre com o mesmo padrão. Isso faz toda a diferença na nossa linha de produção diária.",
    name: "Carlos Mendes",
    role: "Gerente de Compras — Indústria Trigo Dourado — RS",
    initial: "C",
  },
];

function ReviewCard({
  stars,
  text,
  name,
  role,
  initial,
}: (typeof REVIEWS)[0]) {
  return (
    <article className="testimonial-marquee-card">
      <div className="stars">{stars}</div>
      <p className="testimonial-text">&quot;{text}&quot;</p>
      <div className="testimonial-author">
        <div className="author-avatar">{initial}</div>
        <div>
          <div className="author-name">{name}</div>
          <div className="author-role">{role}</div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const belt = [...REVIEWS, ...REVIEWS];

  return (
    <section className="testimonials" id="clientes">
      <div className="testimonials-header">
        <div className="section-label">Depoimentos</div>
        <h2 className="section-title">
          O que dizem nossos <em>clientes</em>
        </h2>
      </div>

      <div className="testimonials-marquee-outer" aria-label="Depoimentos em rolagem">
        <div className="testimonials-marquee-track">
          {belt.map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
