import Link from "next/link";

const CATS = [
  {
    key: "melhores",
    label: "Melhores",
    img: "/melhorador-massa.jpg",
    href: "/produtos?sort=popular",
  },
  {
    key: "base",
    label: "Bases prontas",
    img: "/base-multigraos.jpg",
    href: "/produtos?cat=base",
  },
  {
    key: "enzima",
    label: "Enzimas",
    img: "/enzima-amilamix.jpg",
    href: "/produtos?cat=enzima",
  },
  {
    key: "fermentacao",
    label: "Fermentação",
    img: "/fermento-seco.jpg",
    href: "/produtos?cat=fermentacao",
  },
];

export default function CategoriesSection() {
  return (
    <section className="cats-section" aria-labelledby="cats-heading">
      <div className="cats-header">
        <p className="cats-kicker">Explore por</p>
        <h2 id="cats-heading" className="cats-title">
          Categoria
        </h2>
      </div>

      <div className="cats-grid">
        {CATS.map((cat) => (
          <Link key={cat.key} href={cat.href} className="cat-card">
            <div
              className="cat-card-bg"
              style={{ backgroundImage: `url(${cat.img})` }}
            />
            <div className="cat-card-overlay" />
            <div className="cat-card-content">
              <span className="cat-card-label">{cat.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
