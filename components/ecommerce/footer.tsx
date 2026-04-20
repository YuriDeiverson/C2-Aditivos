import Link from 'next/link'

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

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
                <TwitterIcon className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50"
                aria-label="Github"
              >
                <GithubIcon className="w-4 h-4" />
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
