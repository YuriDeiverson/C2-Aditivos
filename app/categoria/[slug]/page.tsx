'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, ChevronDown, ChevronUp, SlidersHorizontal, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { TopBanner, Header } from '@/components/ecommerce/header'
import { Newsletter, Footer } from '@/components/ecommerce/footer'
import { ProductCard, StarRating } from '@/components/ecommerce/product-card'
import { products, type Product } from '@/lib/store'
import { useParams } from 'next/navigation'

const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']
const colors = [
  { name: 'green', hex: '#00C12B' },
  { name: 'red', hex: '#F50606' },
  { name: 'yellow', hex: '#F5DD06' },
  { name: 'orange', hex: '#F57906' },
  { name: 'cyan', hex: '#06CAF5' },
  { name: 'blue', hex: '#063AF5' },
  { name: 'purple', hex: '#7D06F5' },
  { name: 'pink', hex: '#F506A4' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'black', hex: '#000000' },
]
const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large']
const styles = ['Casual', 'Formal', 'Party', 'Gym']

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)

  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['Large'])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Most Popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Filter sections open state
  const [openSections, setOpenSections] = useState({
    categories: false,
    price: true,
    colors: true,
    size: true,
    style: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
  }

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    )
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false
      
      // Color filter
      if (selectedColors.length > 0 && !product.colors.some((c) => selectedColors.includes(c))) {
        return false
      }
      
      // Size filter
      if (selectedSizes.length > 0 && !product.sizes.some((s) => selectedSizes.includes(s))) {
        return false
      }
      
      // Style filter
      if (selectedStyles.length > 0 && !selectedStyles.includes(product.style)) {
        return false
      }

      return true
    })
  }, [priceRange, selectedColors, selectedSizes, selectedStyles])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case 'Price: Low to High':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'Price: High to Low':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'Newest':
        sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id))
        break
      default:
        // Most Popular - by review count
        sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    }
    return sorted
  }, [filteredProducts, sortBy])

  const productsPerPage = 9
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const FilterSidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={mobile ? '' : 'w-64 flex-shrink-0'}>
      <div className={`bg-white ${mobile ? '' : 'border border-gray-200 rounded-[20px] p-5'}`}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-xl">Filtros</h3>
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
        </div>

        <div className="border-t border-gray-100" />

        {/* Categories */}
        <div className="py-5 border-b border-gray-100">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categoria/${category.toLowerCase()}`}
              className="flex items-center justify-between py-1.5 text-gray-600 hover:text-black transition-colors"
            >
              <span>{category}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ))}
        </div>

        {/* Price Filter */}
        <div className="py-5 border-b border-gray-100">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-4"
          >
            <span className="font-bold">Preço</span>
            {openSections.price ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {openSections.price && (
            <div>
              <input
                type="range"
                min="50"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>R${priceRange[0]}</span>
                <span>R${priceRange[1]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Colors Filter */}
        <div className="py-5 border-b border-gray-100">
          <button
            onClick={() => toggleSection('colors')}
            className="flex items-center justify-between w-full mb-4"
          >
            <span className="font-bold">Cores</span>
            {openSections.colors ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {openSections.colors && (
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => toggleColor(color.name)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    color.name === 'white' ? 'border border-gray-200' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                >
                  {selectedColors.includes(color.name) && (
                    <Check className={`w-4 h-4 ${color.name === 'white' || color.name === 'yellow' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Size Filter */}
        <div className="py-5 border-b border-gray-100">
          <button
            onClick={() => toggleSection('size')}
            className="flex items-center justify-between w-full mb-4"
          >
            <span className="font-bold">Tamanho</span>
            {openSections.size ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {openSections.size && (
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedSizes.includes(size)
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dress Style Filter */}
        <div className="py-5">
          <button
            onClick={() => toggleSection('style')}
            className="flex items-center justify-between w-full mb-4"
          >
            <span className="font-bold">Estilo</span>
            {openSections.style ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {openSections.style && (
            <div className="space-y-1">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => toggleStyle(style)}
                  className={`flex items-center justify-between w-full py-2 px-0 text-left ${
                    selectedStyles.includes(style) ? 'text-black font-medium' : 'text-gray-600'
                  }`}
                >
                  <span>{style}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors mt-4">
          Aplicar Filtro
        </button>
      </div>
    </div>
  )

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
          <span className="text-black">{categoryName}</span>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold">{categoryName}</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 hidden sm:block">
                  Mostrando {(currentPage - 1) * productsPerPage + 1}-
                  {Math.min(currentPage * productsPerPage, sortedProducts.length)} de{' '}
                  {sortedProducts.length} Produtos
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Ordenar por:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm font-medium bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 mb-6 px-4 py-2 border border-gray-200 rounded-full text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1
                  if (totalPages > 5) {
                    if (currentPage > 3) {
                      pageNum = currentPage - 2 + i
                    }
                    if (currentPage > totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    }
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-gray-100 text-black'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="px-2 text-gray-400">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="w-10 h-10 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Próximo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filtros</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  Fechar
                </button>
              </div>
              <FilterSidebar mobile />
            </div>
          </div>
        </div>
      )}

      <Newsletter />
      <Footer />
    </div>
  )
}
