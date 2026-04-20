'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Minus, Plus, Trash2, Tag, ArrowRight } from 'lucide-react'
import { TopBanner, Header } from '@/components/ecommerce/header'
import { Newsletter, Footer } from '@/components/ecommerce/footer'
import { useCartStore } from '@/lib/store'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const subtotal = getSubtotal()
  const discount = subtotal * 0.2
  const deliveryFee = 15
  const total = subtotal - discount + deliveryFee

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <TopBanner />
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
            <p className="text-gray-600 mb-8">Adicione alguns produtos para começar!</p>
            <Link
              href="/categoria/casual"
              className="inline-block bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </main>
        <Newsletter />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black">Carrinho</span>
        </div>

        <h1 className="text-3xl lg:text-[40px] font-black mb-8">SEU CARRINHO</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-[20px] divide-y divide-gray-100">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="p-4 lg:p-6 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#F0EEED] rounded-[12px] overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{item.product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Tamanho: <span className="text-black">{item.selectedSize}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Cor: <span className="text-black capitalize">{item.selectedColor}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                        className="text-red-500 hover:text-red-600 self-start"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold">R${item.product.price}</span>
                      <div className="flex items-center bg-[#F0F0F0] rounded-full">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="border border-gray-200 rounded-[20px] p-5 lg:p-6">
              <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 pb-6 border-b border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">R${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Desconto (-20%)</span>
                  <span className="font-bold text-red-500">-R${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Taxa de Entrega</span>
                  <span className="font-bold">R${deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between py-6">
                <span className="text-lg">Total</span>
                <span className="text-2xl font-bold">R${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="flex gap-3 mb-6">
                <div className="flex-1 relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Adicionar código promocional"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F0F0F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-6 py-3.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Aplicar
                </button>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Ir para o Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
