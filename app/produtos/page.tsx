import { fetchStorefrontCatalog } from "@/lib/catalog-store";
import ProdutosCatalogClient from "@/components/catalog/ProdutosCatalogClient";

export const dynamic = "force-dynamic";

export default async function ProdutosPage() {
  const products = await fetchStorefrontCatalog();
  return <ProdutosCatalogClient products={products} />;
}
