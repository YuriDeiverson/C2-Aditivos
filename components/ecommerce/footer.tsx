import Link from 'next/link'
import { Twitter, Facebook, Instagram, Github } from 'lucide-react'

export function Newsletter() {
  return (
    <section className="bg-black text-white rounded-3xl mx-4 lg:mx-8 p-8 lg:p-12 -mb-20 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <h2 className="text-3xl lg:text-4xl font-black max-w-md text-balance">
          FIQUE POR DENTRO DAS NOSSAS ÚLTIMAS OFERTAS
        </h2>
        <div className="flex flex-col gap-3 w-full max-w-md">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <input
              type="email"
              placeholder="Digite seu endereço de email"
              className="w-full pl-12 pr-4 py-3 rounded-full text-black text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <button className="w-full bg-white text-black font-medium py-3 rounded-full hover:bg-gray-100 transition-colors">
            Inscrever-se na Newsletter
          </button>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-gray-100 pt-32 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-gray-200">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-black text-2xl tracking-tight">
              SHOP.CO
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Temos roupas que combinam com seu estilo e das quais você se orgulha de vestir. De mulheres a homens.
            </p>
            <div className="flex gap-3 mt-6">
              <Link
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50"
                aria-label="Github"
              >
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-sm tracking-wider mb-4">EMPRESA</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Trabalhos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Carreira
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-medium text-sm tracking-wider mb-4">AJUDA</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Suporte ao Cliente
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Detalhes de Entrega
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Termos e Condições
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="font-medium text-sm tracking-wider mb-4">FAQ</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Conta
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Gerenciar Entregas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Pedidos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Pagamentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-sm tracking-wider mb-4">RECURSOS</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  eBooks Gratuitos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Tutorial de Desenvolvimento
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Como fazer - Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Playlist do Youtube
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-4">
          <p className="text-sm text-gray-600">Shop.co © 2000-2023, Todos os Direitos Reservados</p>
          <div className="flex items-center gap-3">
            <div className="bg-white rounded px-2 py-1 border">
              <svg viewBox="0 0 50 16" className="h-4 w-auto">
                <path
                  fill="#1434CB"
                  d="M19.5 2.5h-4l-2.5 11h4l2.5-11zm10.5 0l-4.5 11h-4l2-6-1.5 6h-4l4.5-11h4l-2 6 1.5-6h4zm-16 0h-4l-2.5 11h4l2.5-11z"
                />
              </svg>
            </div>
            <div className="bg-white rounded px-2 py-1 border">
              <svg viewBox="0 0 50 30" className="h-5 w-auto">
                <circle cx="20" cy="15" r="10" fill="#EB001B" />
                <circle cx="30" cy="15" r="10" fill="#F79E1B" />
                <path
                  d="M25 8a10 10 0 010 14 10 10 0 000-14z"
                  fill="#FF5F00"
                />
              </svg>
            </div>
            <div className="bg-white rounded px-2 py-1 border">
              <span className="text-xs font-bold text-[#003087]">PayPal</span>
            </div>
            <div className="bg-white rounded px-2 py-1 border">
              <span className="text-xs font-medium">Apple Pay</span>
            </div>
            <div className="bg-white rounded px-2 py-1 border">
              <span className="text-xs font-medium">G Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
