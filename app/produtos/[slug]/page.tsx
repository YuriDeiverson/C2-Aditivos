import { notFound } from "next/navigation";
import { fetchStorefrontCatalog } from "@/lib/catalog-store";
import ProductDetailClient from "@/components/catalog/ProductDetailClient";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const catalog = await fetchStorefrontCatalog();
  const product = catalog.find((p) => p.slug === slug);
  if (!product) notFound();

  const sameCat = catalog.filter((p) => p.cat === product.cat && p.id !== product.id);
  const rest = catalog.filter((p) => p.id !== product.id && p.cat !== product.cat);
  const related = sameCat.concat(rest).slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
