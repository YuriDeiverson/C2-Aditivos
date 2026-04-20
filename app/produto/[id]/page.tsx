'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Minus, Plus, Check, MoreHorizontal, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { TopBanner, Header } from '@/components/ecommerce/header'
import { Newsletter, Footer } from '@/components/ecommerce/footer'
import { ProductCard, StarRating } from '@/components/ecommerce/product-card'
import { products, reviews, useCartStore } from '@/lib/store'
import { useParams, useRouter } from 'next/navigation'

const tabs = ['Detalhes do Produto', 'Avaliações', 'FAQs']

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const product = products.find((p) => p.id === id)
  const addItem = useCartStore((state) => state.addItem)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '')
  const [selectedSize, setSelectedSize] = useState('Large')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState(1) // Reviews tab
  const [reviewSort, setReviewSort] = useState('Latest')

  const relatedProducts = useMemo(() => {
    return products.filter((p) => p.id !== id).slice(0, 4)
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link href="/" className="text-black underline">
            Voltar para a loja
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images || [product.image]

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedSize)
    router.push('/carrinho')
  }

  const colorMap: Record<string, string> = {
    white: '#FFFFFF',
    black: '#000000',
    gray: '#808080',
    blue: '#063AF5',
    navy: '#000080',
    pink: '#FFC0CB',
    red: '#FF0000',
    green: '#008000',
    orange: '#FFA500',
    khaki: '#C3B091',
    'light-blue': '#ADD8E6',
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/categoria/casual" className="hover:text-black">
            Shop
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-black">Men</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black">{product.category}</span>
        </div>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 lg:w-[106px] lg:h-[106px] rounded-[14px] overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    width={106}
                    height={106}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-[#F0EEED] rounded-[20px] overflow-hidden aspect-square">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl lg:text-[40px] font-black leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-gray-500">
                {product.rating}/5
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl font-bold">R${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-3xl text-gray-400 line-through">
                    R${product.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 pb-6 border-b border-gray-200 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-sm text-gray-500 mb-3">Selecionar Cores</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      color === 'white' ? 'border border-gray-200' : ''
                    }`}
                    style={{ backgroundColor: colorMap[color] || color }}
                    aria-label={color}
                  >
                    {selectedColor === color && (
                      <Check className={`w-5 h-5 ${color === 'white' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-sm text-gray-500 mb-3">Escolha o Tamanho</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center bg-[#F0F0F0] rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-black"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-black"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === i
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Reviews Tab Content */}
          {activeTab === 1 && (
            <div className="py-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold">
                  Todas as Avaliações <span className="text-gray-400 font-normal">({reviews.length})</span>
                </h2>
                <div className="flex items-center gap-3">
                  <button className="p-2 bg-[#F0F0F0] rounded-full">
                    <SlidersHorizontal className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2 bg-[#F0F0F0] px-4 py-2 rounded-full">
                    <span className="text-sm">{reviewSort}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    Escrever Avaliação
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-[20px] p-6">
                    <div className="flex items-start justify-between mb-3">
                      <StarRating rating={review.rating} size="md" />
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="font-bold">{review.name}</span>
                      {review.verified && (
                        <svg
                          className="w-5 h-5 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {'"'}{review.comment}{'"'}
                    </p>
                    <p className="text-sm text-gray-400">Postado em {review.date}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="border border-gray-200 px-12 py-4 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                  Carregar Mais Avaliações
                </button>
              </div>
            </div>
          )}

          {/* Product Details Tab Content */}
          {activeTab === 0 && (
            <div className="py-8">
              <div className="prose max-w-none">
                <h3 className="text-lg font-bold mb-4">Descrição</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
                <h3 className="text-lg font-bold mb-4">Características</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Material de alta qualidade</li>
                  <li>Confortável para uso diário</li>
                  <li>Fácil de lavar e manter</li>
                  <li>Disponível em várias cores e tamanhos</li>
                </ul>
              </div>
            </div>
          )}

          {/* FAQs Tab Content */}
          {activeTab === 2 && (
            <div className="py-8">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-[20px] p-6">
                  <h3 className="font-bold mb-2">Qual é o prazo de entrega?</h3>
                  <p className="text-gray-600">O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização.</p>
                </div>
                <div className="border border-gray-200 rounded-[20px] p-6">
                  <h3 className="font-bold mb-2">Posso trocar o produto?</h3>
                  <p className="text-gray-600">Sim, você tem até 30 dias para solicitar a troca do produto, desde que esteja em perfeitas condições.</p>
                </div>
                <div className="border border-gray-200 rounded-[20px] p-6">
                  <h3 className="font-bold mb-2">Como faço para rastrear meu pedido?</h3>
                  <p className="text-gray-600">Após a confirmação do envio, você receberá um código de rastreamento por e-mail.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* You Might Also Like */}
        <section className="mt-16">
          <h2 className="text-3xl lg:text-4xl font-black text-center mb-10">
            VOCÊ TAMBÉM PODE GOSTAR
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
