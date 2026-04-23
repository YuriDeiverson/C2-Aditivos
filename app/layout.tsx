import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Providers from "@/components/Providers";
import { getShopSettingsCached } from "@/lib/shop-settings-server";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

const SITE_DEFAULT = {
  title: "C2 Aditivos",
  description:
    "Ingredientes técnicos e aditivos especializados para panificação brasileira desde 1992.",
};

export async function generateMetadata(): Promise<Metadata> {
  const s = await getShopSettingsCached();
  const title = s.seo_title.trim() || SITE_DEFAULT.title;
  const description = s.seo_description.trim() || SITE_DEFAULT.description;
  const keywords = s.seo_keywords.trim();
  return {
    title,
    description,
    ...(keywords ? { keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean) } : {}),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shopSettings = await getShopSettingsCached();

  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>
        <Providers shopSettings={shopSettings}>{children}</Providers>
      </body>
    </html>
  );
}
