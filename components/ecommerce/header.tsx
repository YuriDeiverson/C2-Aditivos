'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, ChevronDown, X } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-black text-white text-center py-2.5 px-4 text-sm relative">
      <span>
        Cadastre-se e ganhe 20% de desconto no primeiro pedido.{' '}
        <Link href="/cadastro" className="underline font-medium">
          Cadastre-se Agora
        </Link>
      </span>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
        aria-label="Fechar banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function Header() {
  const itemCount = useCartStore((state) => state.getItemCount())
  const [isShopOpen, setIsShopOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="font-black text-2xl tracking-tight">
            SHOP.CO
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button
                className="flex items-center gap-1 text-sm hover:text-gray-600"
                onClick={() => setIsShopOpen(!isShopOpen)}
              >
                Shop <ChevronDown className="w-4 h-4" />
              </button>
              {isShopOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <Link
                    href="/categoria/casual"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Casual
                  </Link>
                  <Link
                    href="/categoria/formal"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Formal
                  </Link>
                  <Link
                    href="/categoria/party"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Festa
                  </Link>
                  <Link
                    href="/categoria/gym"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Academia
                  </Link>
                </div>
              )}
            </div>
            <Link href="/categoria/casual?filter=sale" className="text-sm hover:text-gray-600">
              Em Oferta
            </Link>
            <Link href="/categoria/casual?filter=new" className="text-sm hover:text-gray-600">
              Novidades
            </Link>
            <Link href="/categoria/casual" className="text-sm hover:text-gray-600">
              Marcas
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden" aria-label="Buscar">
              <Search className="w-6 h-6" />
            </button>
            <Link href="/carrinho" className="relative" aria-label="Carrinho">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button aria-label="Conta">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
