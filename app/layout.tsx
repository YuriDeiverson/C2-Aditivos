import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'SHOP.CO - Encontre Roupas que Combinam com Seu Estilo',
  description: 'Navegue por nossa coleção diversificada de roupas meticulosamente criadas, projetadas para destacar sua individualidade.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable} bg-white`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
