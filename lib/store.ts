import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  images?: string[]
  rating: number
  reviewCount: number
  category: string
  style: string
  colors: string[]
  sizes: string[]
  description?: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor: string
  selectedSize: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, color: string, size: string) => void
  removeItem: (productId: string, color: string, size: string) => void
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getSubtotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, color, size) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === color &&
              item.selectedSize === size
          )
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.selectedColor === color &&
                item.selectedSize === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          return {
            items: [...state.items, { product, quantity: 1, selectedColor: color, selectedSize: size }],
          }
        })
      },
      removeItem: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.product.id === productId &&
                item.selectedColor === color &&
                item.selectedSize === size)
          ),
        }))
      },
      updateQuantity: (productId, color, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, color, size)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        }))
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },
      getTotal: () => {
        const subtotal = get().getSubtotal()
        const discount = subtotal * 0.2
        const delivery = 15
        return subtotal - discount + delivery
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

// Mock products data
export const products: Product[] = [
  {
    id: '1',
    name: 'Camiseta Gráfica Gradiente',
    price: 145,
    originalPrice: 180,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&sat=-100',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&hue=90',
    ],
    rating: 3.5,
    reviewCount: 65,
    category: 'T-shirts',
    style: 'Casual',
    colors: ['white', 'black', 'gray'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Esta camiseta gráfica é perfeita para qualquer ocasião. Feita de um tecido macio e respirável, oferece conforto e estilo superiores.',
  },
  {
    id: '2',
    name: 'Polo com Detalhes',
    price: 180,
    image: 'https://images.unsplash.com/photo-1625910513413-5fc5f5e3b167?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1625910513413-5fc5f5e3b167?w=600&h=600&fit=crop',
    ],
    rating: 4.5,
    reviewCount: 89,
    category: 'T-shirts',
    style: 'Formal',
    colors: ['pink', 'blue', 'white'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Polo elegante com detalhes refinados, perfeita para ocasiões casuais e formais.',
  },
  {
    id: '3',
    name: 'Camiseta Listrada Preta',
    price: 120,
    originalPrice: 150,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop',
    ],
    rating: 5.0,
    reviewCount: 120,
    category: 'T-shirts',
    style: 'Casual',
    colors: ['black', 'white', 'navy'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Camiseta listrada clássica em preto e branco, versátil para qualquer ocasião.',
  },
  {
    id: '4',
    name: 'Calça Jeans Skinny',
    price: 240,
    originalPrice: 260,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop',
    ],
    rating: 3.5,
    reviewCount: 45,
    category: 'Jeans',
    style: 'Casual',
    colors: ['blue', 'black', 'gray'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Jeans skinny fit de alta qualidade, confortável e durável.',
  },
  {
    id: '5',
    name: 'Camisa Xadrez',
    price: 180,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
    ],
    rating: 4.5,
    reviewCount: 78,
    category: 'Shirts',
    style: 'Casual',
    colors: ['red', 'blue', 'green'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Camisa xadrez clássica, perfeita para looks casuais e descontraídos.',
  },
  {
    id: '6',
    name: 'Camiseta Listrada Laranja',
    price: 130,
    originalPrice: 160,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
    ],
    rating: 4.5,
    reviewCount: 92,
    category: 'T-shirts',
    style: 'Casual',
    colors: ['orange', 'black', 'white'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Camiseta vibrante com listras em laranja, estilo desportivo.',
  },
  {
    id: '7',
    name: 'Camiseta com Detalhes em Fita',
    price: 120,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop',
    ],
    rating: 4.5,
    reviewCount: 56,
    category: 'T-shirts',
    style: 'Casual',
    colors: ['black', 'white', 'gray'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Camiseta moderna com detalhes únicos em fita.',
  },
  {
    id: '8',
    name: 'Camisa Listrada Vertical',
    price: 212,
    originalPrice: 232,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&h=600&fit=crop',
    ],
    rating: 5.0,
    reviewCount: 87,
    category: 'Shirts',
    style: 'Formal',
    colors: ['white', 'blue', 'pink'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Camisa elegante com listras verticais, perfeita para o trabalho.',
  },
  {
    id: '9',
    name: 'Camiseta Gráfica Courage',
    price: 145,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=600&fit=crop',
    ],
    rating: 4.0,
    reviewCount: 63,
    category: 'T-shirts',
    style: 'Casual',
    colors: ['green', 'black', 'white'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Camiseta com estampa gráfica exclusiva.',
  },
  {
    id: '10',
    name: 'Bermuda Fit Solta',
    price: 80,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop',
    ],
    rating: 3.0,
    reviewCount: 34,
    category: 'Shorts',
    style: 'Casual',
    colors: ['blue', 'khaki', 'black'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Bermuda confortável de fit solto, ideal para o dia a dia.',
  },
  {
    id: '11',
    name: 'Calça Jeans Desbotada',
    price: 210,
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&h=600&fit=crop',
    ],
    rating: 4.5,
    reviewCount: 71,
    category: 'Jeans',
    style: 'Casual',
    colors: ['blue', 'light-blue', 'black'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Jeans skinny com lavagem desbotada moderna.',
  },
  {
    id: '12',
    name: 'Polo com Contraste',
    price: 212,
    originalPrice: 242,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=600&fit=crop',
    ],
    rating: 4.0,
    reviewCount: 45,
    category: 'T-shirts',
    style: 'Formal',
    colors: ['navy', 'white', 'black'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Polo sofisticada com detalhes em contraste.',
  },
]

export const reviews = [
  {
    id: '1',
    name: 'Samantha D.',
    rating: 4.5,
    date: '14 de Agosto, 2023',
    comment: 'Eu absolutamente amei esta camiseta! O design é único e o tecido é muito confortável. Como designer, aprecio a atenção aos detalhes. Tornou-se minha peça favorita.',
    verified: true,
  },
  {
    id: '2',
    name: 'Alex M.',
    rating: 4,
    date: '15 de Agosto, 2023',
    comment: 'A camiseta superou minhas expectativas! As cores são vibrantes e a qualidade de impressão é excelente. Como designer UI/UX, sou exigente com estética, e esta camiseta definitivamente ganhou minha aprovação.',
    verified: true,
  },
  {
    id: '3',
    name: 'Ethan R.',
    rating: 3.5,
    date: '16 de Agosto, 2023',
    comment: 'Esta camiseta é indispensável para quem aprecia bom design. O padrão minimalista mas estiloso chamou minha atenção, e o caimento é perfeito.',
    verified: true,
  },
  {
    id: '4',
    name: 'Olivia P.',
    rating: 4,
    date: '17 de Agosto, 2023',
    comment: 'Como entusiasta de UI/UX, valorizo simplicidade e funcionalidade. Esta camiseta não apenas representa esses princípios, mas também é muito confortável de usar.',
    verified: true,
  },
  {
    id: '5',
    name: 'Liam K.',
    rating: 4,
    date: '18 de Agosto, 2023',
    comment: 'Esta camiseta é uma fusão de conforto e criatividade. O tecido é macio, e o design fala muito sobre a habilidade do designer.',
    verified: true,
  },
  {
    id: '6',
    name: 'Ava H.',
    rating: 4.5,
    date: '19 de Agosto, 2023',
    comment: 'Não estou apenas vestindo uma camiseta; estou vestindo uma peça de filosofia de design. Os detalhes intrincados e o layout pensativo fazem desta camisa um início de conversa.',
    verified: true,
  },
]

export const customerReviews = [
  {
    id: '1',
    name: 'Sarah M.',
    rating: 5,
    comment: 'Estou impressionada com a qualidade e estilo das roupas que recebi da Shop.co. De casual a elegante, cada peça que comprei superou minhas expectativas.',
    verified: true,
  },
  {
    id: '2',
    name: 'Alex K.',
    rating: 5,
    comment: 'Encontrar roupas que combinam com meu estilo pessoal costumava ser um desafio até descobrir a Shop.co. A variedade de opções que oferecem é verdadeiramente notável.',
    verified: true,
  },
  {
    id: '3',
    name: 'James L.',
    rating: 5,
    comment: 'Como alguém que está sempre procurando por peças únicas de moda, estou emocionado por ter encontrado a Shop.co. A seleção de roupas é não apenas diversa, mas também atual.',
    verified: true,
  },
  {
    id: '4',
    name: 'Mooen',
    rating: 5,
    comment: 'Estou sempre impressionado com a qualidade e variedade que encontro aqui. Cada compra foi uma experiência incrível.',
    verified: true,
  },
]
