// Componente Header moderno e futurista
const Header = () => {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo e Título */}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 glow-blue">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Futuro do Trabalho
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block font-semibold">
                Plataforma de Conexão
              </p>
            </div>
          </a>

          {/* Navegação */}
          <nav className="hidden md:flex items-center gap-2">
            {[
              { id: 'profissionais', label: 'Profissionais' },
              { id: 'sobre', label: 'Sobre' },
              { id: 'contato', label: 'Contato' }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white font-bold rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
