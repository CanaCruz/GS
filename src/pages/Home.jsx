import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'

// Página principal que gerencia o estado da aplicação
// Carrega os dados do JSON, implementa busca e filtros, e gerencia a modal
const Home = () => {
  const [profiles, setProfiles] = useState([])
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    area: '',
    localizacao: '',
    tecnologia: '',
  })

  // Carrega os dados do arquivo JSON quando o componente monta
  useEffect(() => {
    fetch('/profiles.json')
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data)
        setFilteredProfiles(data)
      })
      .catch((error) => {
        console.error('Erro ao carregar perfis:', error)
      })
  }, [])

  // Aplica os filtros e busca sempre que searchTerm ou filters mudarem
  useEffect(() => {
    let filtered = [...profiles]

    if (searchTerm) {
      filtered = filtered.filter((profile) =>
        profile.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filters.area) {
      filtered = filtered.filter((profile) => profile.area === filters.area)
    }

    if (filters.localizacao) {
      filtered = filtered.filter(
        (profile) => profile.localizacao === filters.localizacao
      )
    }

    if (filters.tecnologia) {
      filtered = filtered.filter((profile) =>
        profile.habilidadesTecnicas.includes(filters.tecnologia)
      )
    }

    setFilteredProfiles(filtered)
  }, [searchTerm, filters, profiles])

  const handleCardClick = (profile) => {
    setSelectedProfile(profile)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProfile(null)
  }

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-4 lg:px-8 relative overflow-hidden">
      {/* Background shapes decorativos */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-slate-500/10 dark:bg-slate-400/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section Moderna */}
      <div className="max-w-7xl mx-auto mb-20 text-center relative z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-indigo-500/10 via-indigo-500/10 to-slate-500/10 dark:from-indigo-500/20 dark:via-indigo-500/20 dark:to-slate-500/20 backdrop-blur-glass rounded-full border border-indigo-500/20 dark:border-indigo-400/20">
          <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-slate-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-slate-600 bg-clip-text text-transparent">
            Plataforma de Conexão Profissional
          </span>
        </div>
        
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 via-slate-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
            O Futuro do Trabalho
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-10">
          Conectando pessoas, competências e propósito
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-600 font-medium">
            por meio da tecnologia
          </span>
        </p>

        {/* Stats com ícones modernos */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-12">
          <div className="group flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1000+</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Profissionais</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">10+</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Áreas</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24/7</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Atualizado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de busca e filtros */}
      <div className="max-w-7xl mx-auto mb-10 animate-slide-up">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Filters
          profiles={profiles}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Contador de resultados */}
      <div className="max-w-7xl mx-auto mb-8 animate-fade-in">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Resultados encontrados</p>
              <p className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-slate-600 bg-clip-text text-transparent">
                {filteredProfiles.length} {filteredProfiles.length === 1 ? 'profissional' : 'profissionais'}
              </p>
            </div>
            {(searchTerm || filters.area || filters.localizacao || filters.tecnologia) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilters({ area: '', localizacao: '', tecnologia: '' })
                }}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
              >
                Limpar Filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grade de cards */}
      <div id="profissionais" className="max-w-7xl mx-auto scroll-mt-20">
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.map((profile, index) => (
              <div key={profile.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <Card
                  profile={profile}
                  onClick={() => handleCardClick(profile)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-slate-500/20 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
              Nenhum profissional encontrado
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Tente ajustar os filtros de busca
            </p>
          </div>
        )}
      </div>

      {/* Seção Sobre */}
      <section id="sobre" className="max-w-7xl mx-auto mt-32 mb-20 scroll-mt-20">
        <div className="bg-gradient-to-br from-indigo-50/80 via-indigo-50/80 to-slate-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-md rounded-3xl p-10 md:p-16 border border-indigo-200/50 dark:border-gray-700/50 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-600 via-indigo-500 to-slate-600 bg-clip-text text-transparent">
              Sobre a Plataforma
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-slate-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 mt-12">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Nossa Missão
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                Conectar profissionais talentosos com oportunidades que transformam o futuro do trabalho. 
                Acreditamos que a tecnologia é o meio para unir pessoas, competências e propósito, 
                criando um ecossistema profissional mais inclusivo e inovador.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                O Que Oferecemos
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                {[
                  'Plataforma moderna e intuitiva para descobrir talentos',
                  'Busca e filtros avançados para encontrar o profissional ideal',
                  'Perfis detalhados com experiências, habilidades e projetos',
                  'Interface responsiva e acessível em todos os dispositivos'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Contato */}
      <section id="contato" className="max-w-7xl mx-auto mt-20 mb-20 scroll-mt-20">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-10 md:p-16 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-600 via-indigo-500 to-slate-600 bg-clip-text text-transparent">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              Estamos aqui para ajudar você a encontrar o profissional ideal
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-slate-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: 'email', title: 'Email', content: 'contato@futurodotrabalho.com', color: 'from-indigo-500 to-indigo-600', link: 'mailto:contato@futurodotrabalho.com' },
              { icon: 'phone', title: 'Telefone', content: '(11) 9999-9999', color: 'from-indigo-500 to-slate-600', link: 'tel:+5511999999999' },
              { icon: 'location', title: 'Localização', content: 'São Paulo, SP\nBrasil', color: 'from-slate-500 to-indigo-600', link: null }
            ].map((item, index) => (
              <div key={index} className="text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                  {item.icon === 'email' && (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {item.icon === 'phone' && (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )}
                  {item.icon === 'location' && (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                {item.link ? (
                  <a href={item.link} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Ou envie uma mensagem através do formulário abaixo:
            </p>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <textarea
                  placeholder="Sua mensagem"
                  rows="5"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-all"
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-slate-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-lg"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modal com detalhes do profissional */}
      <Modal
        profile={selectedProfile}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Home
