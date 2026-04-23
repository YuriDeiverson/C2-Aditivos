import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/home/FloatingWhatsApp";
import BannerSlider from "@/components/home/BannerSlider";
import TrustBadges from "@/components/home/TrustBadges";
import ProductsRow from "@/components/home/ProductsRow";
import CategoriesSection from "@/components/home/CategoriesSection";
import Testimonials from "@/components/home/Testimonials";
import { fetchStorefrontCatalog } from "@/lib/catalog-store";
import { getShopSettingsCached } from "@/lib/shop-settings-server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const shop = await getShopSettingsCached();
  const catalog = await fetchStorefrontCatalog();
  const freteSubtitle =
    shop.shipping_free_min_subtotal != null
      ? "Frete e condições sob consulta (via WhatsApp)"
      : "Frete e condições sob consulta (via WhatsApp)";
  let newProducts = catalog.filter((p) => p.badgeClass === "badge-new").slice(0, 4);
  if (newProducts.length === 0) newProducts = catalog.slice(0, 4);

  let topProducts = catalog.filter((p) => p.badgeClass === "badge-top" || p.badgeClass === "badge-pro").slice(0, 4);
  if (topProducts.length === 0) topProducts = catalog.slice(0, 4);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <BannerSlider />
      <TrustBadges freteSubtitle={freteSubtitle} />
      <ProductsRow
        title="Novidades"
        subtitle="Os produtos mais recentes da nossa linha"
        products={newProducts}
        viewMoreHref="/produtos"
        variant="light"
      />
      <ProductsRow
        title="Mais Vendidos"
        subtitle="Os favoritos dos nossos clientes"
        products={topProducts}
        viewMoreHref="/produtos"
        variant="smoke"
      />
      <CategoriesSection />
      <Testimonials />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
