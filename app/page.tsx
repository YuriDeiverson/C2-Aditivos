import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { TopBanner, Header } from '@/components/ecommerce/header'
import { Newsletter, Footer } from '@/components/ecommerce/footer'
import { ProductCard, StarRating } from '@/components/ecommerce/product-card'
import { products, customerReviews } from '@/lib/store'

export default function HomePage() {
  const newArrivals = products.slice(0, 4)
  const topSelling = products.slice(4, 8)

  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <Header />

      {/* Hero Section */}
      <section className="bg-[#F2F0F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-8 lg:py-0">
            <div className="py-12 lg:py-24">
              <h1 className="text-4xl lg:text-[64px] font-black leading-[1.1] mb-6 tracking-tight">
                ENCONTRE ROUPAS QUE COMBINAM COM SEU ESTILO
              </h1>
              <p className="text-gray-600 mb-8 max-w-lg leading-relaxed">
                Navegue por nossa coleção diversificada de roupas meticulosamente criadas, projetadas para destacar sua individualidade e atender ao seu senso de estilo.
              </p>
              <Link
                href="/categoria/casual"
                className="inline-block bg-black text-white px-14 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Comprar Agora
              </Link>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 lg:gap-0 mt-12">
                <div className="pr-6 lg:pr-8">
                  <div className="text-3xl lg:text-[40px] font-bold">200+</div>
                  <div className="text-gray-500 text-sm">Marcas Internacionais</div>
                </div>
                <div className="border-l border-gray-300 pl-6 lg:pl-8 pr-6 lg:pr-8">
                  <div className="text-3xl lg:text-[40px] font-bold">2.000+</div>
                  <div className="text-gray-500 text-sm">Produtos de Alta Qualidade</div>
                </div>
                <div className="border-l border-gray-300 pl-6 lg:pl-8">
                  <div className="text-3xl lg:text-[40px] font-bold">30.000+</div>
                  <div className="text-gray-500 text-sm">Clientes Satisfeitos</div>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[600px]">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop"
                alt="Casal estiloso"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Decorative stars */}
              <svg
                className="absolute top-8 right-8 w-16 h-16 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              <svg
                className="absolute bottom-32 left-8 w-10 h-10 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-8 lg:gap-12">
            <span className="text-white text-2xl lg:text-3xl font-bold tracking-wider">VERSACE</span>
            <span className="text-white text-2xl lg:text-3xl font-bold tracking-wider italic">ZARA</span>
            <span className="text-white text-2xl lg:text-3xl font-bold tracking-[0.2em]">GUCCI</span>
            <span className="text-white text-2xl lg:text-3xl font-serif tracking-[0.15em]">PRADA</span>
            <span className="text-white text-2xl lg:text-3xl font-light tracking-wider">Calvin Klein</span>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-black text-center mb-12 tracking-tight">NOVIDADES</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/categoria/casual?filter=new"
              className="inline-block border border-gray-200 px-16 py-4 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Ver Todos
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100 mx-auto max-w-6xl" />

      {/* Top Selling */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-black text-center mb-12 tracking-tight">MAIS VENDIDOS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {topSelling.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/categoria/casual?filter=bestseller"
              className="inline-block border border-gray-200 px-16 py-4 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Ver Todos
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Style */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F0F0F0] rounded-[40px] p-6 lg:p-16">
            <h2 className="text-3xl lg:text-5xl font-black text-center mb-10 lg:mb-16 tracking-tight">
              NAVEGUE POR ESTILO
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              <div className="grid grid-cols-2 gap-4 lg:gap-5">
                <Link
                  href="/categoria/casual"
                  className="relative bg-white rounded-[20px] overflow-hidden aspect-square group col-span-1"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop"
                    alt="Casual"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-5 left-5 text-2xl lg:text-4xl font-bold">Casual</span>
                </Link>
                <Link
                  href="/categoria/formal"
                  className="relative bg-white rounded-[20px] overflow-hidden aspect-square group col-span-1"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                    alt="Formal"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-5 left-5 text-2xl lg:text-4xl font-bold">Formal</span>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:gap-5">
                <Link
                  href="/categoria/party"
                  className="relative bg-white rounded-[20px] overflow-hidden aspect-square group col-span-1"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
                    alt="Festa"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-5 left-5 text-2xl lg:text-4xl font-bold">Festa</span>
                </Link>
                <Link
                  href="/categoria/gym"
                  className="relative bg-white rounded-[20px] overflow-hidden aspect-square group col-span-1"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"
                    alt="Academia"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-5 left-5 text-2xl lg:text-4xl font-bold">Academia</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 lg:mb-12">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight">NOSSOS CLIENTES FELIZES</h2>
            <div className="flex gap-2">
              <button
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Anterior"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Próximo"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {customerReviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-[20px] p-7">
                <StarRating rating={review.rating} size="md" />
                <div className="flex items-center gap-1.5 mt-5 mb-3">
                  <span className="font-bold text-lg">{review.name}</span>
                  {review.verified && (
                    <svg
                      className="w-6 h-6 text-green-500"
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
                <p className="text-gray-600 leading-relaxed">
                  {'"'}{review.comment}{'"'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}
