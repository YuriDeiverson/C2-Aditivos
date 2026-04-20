import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import type { Product } from '@/lib/store'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.id}`} className="group">
      <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square mb-3">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h3>
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : i < product.rating
                  ? 'fill-yellow-400/50 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">
          {product.rating}/{5}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold">R${product.price}</span>
        {product.originalPrice && (
          <>
            <span className="text-gray-400 line-through text-sm">
              R${product.originalPrice}
            </span>
            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          </>
        )}
      </div>
    </Link>
  )
}

export function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size]

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : i < rating
              ? 'fill-yellow-400/50 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  )
}
