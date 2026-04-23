import type { Metadata } from "next";
import "./shop.css";

export const metadata: Metadata = {
  title: "SHOP.CO — Find Clothes That Match Your Style",
  description:
    "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
