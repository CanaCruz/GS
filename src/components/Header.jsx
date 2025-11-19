import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

// Componente Header moderno e futurista com login/cadastro
const Header = ({ onOpenLogin, onOpenSignup, currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const menuRef = useRef(null)
  const mobileMenuRef = useRef(null)

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

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false)
      }
    }

    if (showUserMenu || showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu, showMobileMenu])

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo e Título */}
          <button
            onClick={() => {
              setCurrentPage('home')
              setShowMobileMenu(false)
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }, 100)
            }}
            className="flex items-center gap-2 sm:gap-4 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-600 via-indigo-500 to-slate-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 glow-blue">
                <svg
                  className="w-5 h-5 sm:w-8 sm:h-8 text-white"
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
              <h1 className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-600 via-indigo-500 to-slate-600 bg-clip-text text-transparent">
                Futuro do Trabalho
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block font-semibold">
                Plataforma de Conexão
              </p>
            </div>
          </button>

          {/* Navegação Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Navegação */}
            <nav className="hidden md:flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage('home')
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }, 100)
                }}
                className={`px-5 py-2.5 font-bold rounded-xl transition-all duration-300 hover:scale-105 ${
                  currentPage === 'home'
                    ? 'text-white bg-gradient-to-r from-indigo-600 to-slate-600'
                    : 'text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-slate-600'
                }`}
              >
                Profissionais
              </button>
              <button
                onClick={() => {
                  setCurrentPage('vagas')
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }, 100)
                }}
                className={`px-5 py-2.5 font-bold rounded-xl transition-all duration-300 hover:scale-105 ${
                  currentPage === 'vagas'
                    ? 'text-white bg-gradient-to-r from-indigo-600 to-slate-600'
                    : 'text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-slate-600'
                }`}
              >
                Vagas
              </button>
              <a
                href="#sobre"
                onClick={(e) => {
                  if (currentPage !== 'home') {
                    e.preventDefault()
                    setCurrentPage('home')
                    setTimeout(() => {
                      handleScrollTo(e, 'sobre')
                    }, 100)
                  } else {
                    handleScrollTo(e, 'sobre')
                  }
                }}
                className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white font-bold rounded-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:to-slate-600 transition-all duration-300 hover:scale-105"
              >
                Sobre
              </a>
              <a
                href="#contato"
                onClick={(e) => {
                  if (currentPage !== 'home') {
                    e.preventDefault()
                    setCurrentPage('home')
                    setTimeout(() => {
                      handleScrollTo(e, 'contato')
                    }, 100)
                  } else {
                    handleScrollTo(e, 'contato')
                  }
                }}
                className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white font-bold rounded-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:to-slate-600 transition-all duration-300 hover:scale-105"
              >
                Contato
              </a>
            </nav>

            {/* Divisor */}
            <div className="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-700"></div>

            {/* Se usuário está logado, mostra menu do perfil, senão mostra botões de login */}
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-slate-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="hidden sm:block">{user.name.split(' ')[0]}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Menu dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden animate-scale-in">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors font-semibold">
                        Meu Perfil
                      </button>
                      <button className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors font-semibold">
                        Configurações
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-semibold"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={onOpenLogin}
                  className="px-4 lg:px-6 py-2.5 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105 text-sm lg:text-base"
                >
                  Entrar
                </button>
                <button
                  onClick={onOpenSignup}
                  className="px-4 lg:px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-slate-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm lg:text-base whitespace-nowrap"
                >
                  <span className="hidden lg:inline">Cadastre-se agora</span>
                  <span className="lg:hidden">Cadastrar</span>
                </button>
              </div>
            )}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-slate-600 text-white font-bold flex items-center justify-center"
              >
                <span className="text-sm">{user.name.charAt(0).toUpperCase()}</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-3 py-2 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold rounded-lg text-xs"
              >
                Entrar
              </button>
            )}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {showMobileMenu ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {showMobileMenu && (
          <div ref={mobileMenuRef} className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => {
                  setCurrentPage('home')
                  setShowMobileMenu(false)
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }, 100)
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                  currentPage === 'home'
                    ? 'bg-gradient-to-r from-indigo-600 to-slate-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Profissionais
              </button>
              <button
                onClick={() => {
                  setCurrentPage('vagas')
                  setShowMobileMenu(false)
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }, 100)
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                  currentPage === 'vagas'
                    ? 'bg-gradient-to-r from-indigo-600 to-slate-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Vagas
              </button>
              <a
                href="#sobre"
                onClick={(e) => {
                  setShowMobileMenu(false)
                  if (currentPage !== 'home') {
                    e.preventDefault()
                    setCurrentPage('home')
                    setTimeout(() => {
                      handleScrollTo(e, 'sobre')
                    }, 100)
                  } else {
                    handleScrollTo(e, 'sobre')
                  }
                }}
                className="block w-full text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold transition-all"
              >
                Sobre
              </a>
              <a
                href="#contato"
                onClick={(e) => {
                  setShowMobileMenu(false)
                  if (currentPage !== 'home') {
                    e.preventDefault()
                    setCurrentPage('home')
                    setTimeout(() => {
                      handleScrollTo(e, 'contato')
                    }, 100)
                  } else {
                    handleScrollTo(e, 'contato')
                  }
                }}
                className="block w-full text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold transition-all"
              >
                Contato
              </a>
              {!user && (
                <button
                  onClick={() => {
                    onOpenSignup()
                    setShowMobileMenu(false)
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-slate-600 text-white font-bold rounded-xl"
                >
                  Cadastre-se
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
