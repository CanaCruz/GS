import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Modal from '../components/Modal'
import profilesData from '../data/profiles.json'

const Perfil = () => {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState([])
  const [recommendedProfiles, setRecommendedProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (user) {
      loadRecommendations()
    }
  }, [user])

  const loadRecommendations = () => {
    try {
      const userId = user.id || user.email
      const allRecommendations = JSON.parse(localStorage.getItem('recommendations') || '[]')
      const userRecommendations = allRecommendations.filter(
        r => r.userId === userId
      )
      setRecommendations(userRecommendations)

      // Buscar os perfis completos dos profissionais recomendados
      const profiles = userRecommendations.map(rec => {
        const profile = profilesData.find(
          p => (p.id && p.id.toString() === rec.profileId) || 
               (p.nome === rec.profileName)
        )
        return profile ? { ...profile, recommendedAt: rec.timestamp } : null
      }).filter(Boolean)

      // Ordenar por data de recomendação (mais recente primeiro)
      profiles.sort((a, b) => new Date(b.recommendedAt) - new Date(a.recommendedAt))
      setRecommendedProfiles(profiles)
    } catch (error) {
      console.error('Erro ao carregar recomendações:', error)
    }
  }

  const handleCardClick = (profile) => {
    setSelectedProfile(profile)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProfile(null)
    // Recarregar recomendações após fechar o modal (caso tenha removido alguma)
    loadRecommendations()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Faça login para ver suas recomendações
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header da Página */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-indigo-600 to-slate-600 bg-clip-text text-transparent">
            Meu Perfil
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Gerencie suas recomendações e atividades
          </p>
        </div>

        {/* Informações do Usuário */}
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-slate-600 flex items-center justify-center shadow-xl">
              <span className="text-white text-3xl font-black">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Seção de Recomendações */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              Profissionais Recomendados
            </h2>
            <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full text-sm font-bold shadow-lg">
              {recommendedProfiles.length} {recommendedProfiles.length === 1 ? 'recomendação' : 'recomendações'}
            </span>
          </div>

          {recommendedProfiles.length === 0 ? (
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Nenhuma recomendação ainda
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comece a recomendar profissionais que você conhece e admira!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProfiles.map((profile) => (
                <div
                  key={profile.id || profile.nome}
                  onClick={() => handleCardClick(profile)}
                  className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-slate-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                      {profile.foto ? (
                        <img
                          src={profile.foto}
                          alt={profile.nome}
                          className="w-full h-full rounded-xl object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.parentElement.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center text-white text-2xl font-black rounded-xl">
                                ${profile.nome.charAt(0).toUpperCase()}
                              </div>
                            `
                          }}
                        />
                      ) : (
                        <span className="text-white text-2xl font-black">
                          {profile.nome.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1 truncate">
                        {profile.nome}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2 truncate">
                        {profile.cargo}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {profile.localizacao}
                        </span>
                      </div>
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500 to-slate-600 text-white rounded-full text-xs font-bold">
                        {profile.area}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                        Recomendado
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {formatDate(profile.recommendedAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal com detalhes do profissional */}
      <Modal
        profile={selectedProfile}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Perfil

