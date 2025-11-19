import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Toast from './Toast'
import MessageModal from './MessageModal'

// Componente Modal Premium com design futurista
const Modal = ({ profile, isOpen, onClose }) => {
  const { user } = useAuth()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [isRecommended, setIsRecommended] = useState(false)

  // Verificar se o perfil já foi recomendado quando o modal abre
  useEffect(() => {
    if (isOpen && profile && user) {
      try {
        const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]')
        const userId = user.id || user.email
        const profileId = profile.id || profile.nome
        const alreadyRecommended = recommendations.find(
          r => r.userId === userId && r.profileId === profileId
        )
        setIsRecommended(!!alreadyRecommended)

        // Registrar visualização do perfil
        const viewHistory = JSON.parse(localStorage.getItem('viewHistory') || '[]')
        const userIdForView = user.id || user.email
        const profileIdForView = profile.id || profile.nome
        
        // Verificar se já foi visualizado hoje (evitar duplicatas)
        const today = new Date().toDateString()
        const alreadyViewed = viewHistory.find(
          v => v.userId === userIdForView && 
               v.profileId === profileIdForView &&
               new Date(v.timestamp).toDateString() === today
        )

        if (!alreadyViewed) {
          const newView = {
            id: Date.now(),
            userId: userIdForView,
            profileId: profileIdForView,
            profileName: profile.nome,
            timestamp: new Date().toISOString()
          }
          viewHistory.unshift(newView)
          // Manter apenas os últimos 100 visualizações
          const limitedHistory = viewHistory.slice(0, 100)
          localStorage.setItem('viewHistory', JSON.stringify(limitedHistory))
        }
      } catch (error) {
        console.error('Erro ao verificar recomendação:', error)
        setIsRecommended(false)
      }
    } else {
      setIsRecommended(false)
    }
  }, [isOpen, profile, user])

  if (!isOpen || !profile) return null

  const handleRecommend = () => {
    if (!user) {
      setToastMessage('Por favor, faça login para recomendar profissionais.')
      setToastType('error')
      setShowToast(true)
      return
    }

    // Salvar recomendação no localStorage
    try {
      const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]')
      const newRecommendation = {
        id: Date.now(),
        userId: user.id || user.email,
        userName: user.name || user.email,
        profileId: profile.id || profile.nome,
        profileName: profile.nome,
        timestamp: new Date().toISOString()
      }
      
      // Verificar se já recomendou este perfil
      const alreadyRecommendedIndex = recommendations.findIndex(
        r => r.userId === newRecommendation.userId && 
             r.profileId === newRecommendation.profileId
      )
      
      if (alreadyRecommendedIndex !== -1) {
        // Remover recomendação
        recommendations.splice(alreadyRecommendedIndex, 1)
        localStorage.setItem('recommendations', JSON.stringify(recommendations))
        setToastMessage(`Recomendação de ${profile.nome} removida com sucesso!`)
        setToastType('success')
        setIsRecommended(false)
      } else {
        // Adicionar recomendação
        recommendations.push(newRecommendation)
        localStorage.setItem('recommendations', JSON.stringify(recommendations))
        setToastMessage(`${profile.nome} foi recomendado com sucesso!`)
        setToastType('success')
        setIsRecommended(true)
      }
      setShowToast(true)
    } catch (error) {
      console.error('Erro ao recomendar:', error)
      setToastMessage('Erro ao recomendar. Tente novamente.')
      setToastType('error')
      setShowToast(true)
    }
  }

  const handleSendMessage = () => {
    if (!user) {
      setToastMessage('Por favor, faça login para enviar mensagens.')
      setToastType('error')
      setShowToast(true)
      return
    }
    setIsMessageModalOpen(true)
  }

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}${window.location.pathname}#profile-${profile.id || profile.nome}`
    
    try {
      // Tentar usar a API de compartilhamento nativa (se disponível)
      if (navigator.share) {
        await navigator.share({
          title: `Perfil de ${profile.nome}`,
          text: `Confira o perfil de ${profile.nome} - ${profile.cargo} na plataforma Futuro do Trabalho`,
          url: profileUrl
        })
        setToastMessage('Perfil compartilhado com sucesso!')
        setToastType('success')
        setShowToast(true)
      } else {
        // Fallback: copiar para a área de transferência
        await navigator.clipboard.writeText(profileUrl)
        setToastMessage('Link do perfil copiado para a área de transferência!')
        setToastType('success')
        setShowToast(true)
      }
    } catch (error) {
      // Se o usuário cancelar o compartilhamento, não mostrar erro
      if (error.name !== 'AbortError') {
        // Fallback: copiar para a área de transferência
        try {
          await navigator.clipboard.writeText(profileUrl)
          setToastMessage('Link do perfil copiado para a área de transferência!')
          setToastType('success')
          setShowToast(true)
        } catch (clipboardError) {
          setToastMessage('Erro ao compartilhar. Tente novamente.')
          setToastType('error')
          setShowToast(true)
        }
      }
    }
  }

  const handleExportPDF = () => {
    // Criar conteúdo HTML para impressão/PDF
    const printWindow = window.open('', '_blank')
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Perfil - ${profile.nome}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            h1 { color: #4f46e5; border-bottom: 3px solid #4f46e5; padding-bottom: 10px; }
            h2 { color: #6366f1; margin-top: 30px; }
            .section { margin-bottom: 30px; }
            .info { margin: 10px 0; }
            .skills { display: flex; flex-wrap: wrap; gap: 10px; margin: 10px 0; }
            .skill { background: #e0e7ff; padding: 5px 15px; border-radius: 20px; }
            .experience, .education { background: #f3f4f6; padding: 15px; margin: 10px 0; border-radius: 8px; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <h1>${profile.nome}</h1>
          <div class="info"><strong>Cargo:</strong> ${profile.cargo}</div>
          <div class="info"><strong>Localização:</strong> ${profile.localizacao}</div>
          <div class="info"><strong>Área:</strong> ${profile.area}</div>
          
          ${profile.resumo ? `<div class="section"><h2>Sobre</h2><p>${profile.resumo}</p></div>` : ''}
          
          <div class="section">
            <h2>Habilidades Técnicas</h2>
            <div class="skills">
              ${profile.habilidadesTecnicas.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
          </div>
          
          ${profile.softSkills && profile.softSkills.length > 0 ? `
            <div class="section">
              <h2>Soft Skills</h2>
              <div class="skills">
                ${profile.softSkills.map(skill => `<span class="skill">${skill}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          
          ${profile.experiencias && profile.experiencias.length > 0 ? `
            <div class="section">
              <h2>Experiências Profissionais</h2>
              ${profile.experiencias.map(exp => `
                <div class="experience">
                  <strong>${exp.cargo}</strong> - ${exp.empresa}<br>
                  <small>${exp.inicio} - ${exp.fim || 'Atual'}</small>
                  ${exp.descricao ? `<p>${exp.descricao}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${profile.formacao && profile.formacao.length > 0 ? `
            <div class="section">
              <h2>Formação Acadêmica</h2>
              ${profile.formacao.map(form => `
                <div class="education">
                  <strong>${form.curso}</strong><br>
                  <small>${form.instituicao} • ${form.ano}</small>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
            Gerado pela plataforma Futuro do Trabalho - ${new Date().toLocaleDateString('pt-BR')}
          </div>
        </body>
      </html>
    `
    
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()
    
    // Aguardar um pouco antes de imprimir para garantir que o conteúdo foi carregado
    setTimeout(() => {
      printWindow.print()
    }, 250)
    
    setToastMessage('Abrindo opções de impressão/PDF...')
    setToastType('success')
    setShowToast(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl max-w-6xl w-full mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-gray-200/50 dark:border-gray-700/50 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Premium do Modal */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600/10 via-indigo-500/10 to-slate-600/10 dark:from-indigo-900/20 dark:via-indigo-900/20 dark:to-slate-900/20 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 p-8 flex justify-between items-start z-10">
          <div className="flex items-start gap-6 flex-1">
            {/* Foto maior com glow */}
            <div className="relative">
              <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-slate-600 flex items-center justify-center flex-shrink-0 shadow-2xl glow-blue">
                {profile.foto ? (
                  <img
                    src={profile.foto}
                    alt={profile.nome}
                    className="w-full h-full rounded-3xl object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-white text-5xl font-black rounded-3xl">
                          ${profile.nome.charAt(0).toUpperCase()}
                        </div>
                      `
                    }}
                  />
                ) : (
                  <div className="text-white text-5xl font-black">
                    {profile.nome.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            
            {/* Informações básicas */}
            <div className="flex-1">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-indigo-600 to-slate-600 bg-clip-text text-transparent">
                {profile.nome}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4 font-bold">
                {profile.cargo}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 font-semibold">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profile.localizacao}
                </p>
                <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-slate-600 text-white rounded-full text-sm font-bold shadow-lg">
                  {profile.area}
                </span>
              </div>
              
              {/* Botões de ação */}
              <div className="flex gap-4 flex-wrap">
                <button 
                  onClick={handleRecommend}
                  className={`px-6 py-3 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 ${
                    isRecommended 
                      ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white' 
                      : 'bg-gradient-to-r from-indigo-600 to-slate-600 text-white'
                  }`}
                >
                  <svg className={`w-5 h-5 ${isRecommended ? 'fill-current' : ''}`} fill={isRecommended ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Recomendar
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-slate-600 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Enviar Mensagem
                </button>
                <button 
                  onClick={handleShare}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartilhar
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Exportar PDF
                </button>
              </div>
            </div>
          </div>
          
          {/* Botão de fechar */}
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-3 transition-all duration-200 hover:scale-110"
            aria-label="Fechar"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-10 space-y-10">
          {/* Resumo */}
          {profile.resumo && (
            <div className="bg-gradient-to-br from-indigo-50/80 to-slate-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-indigo-200/50 dark:border-gray-700/50 shadow-xl">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-slate-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Sobre
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{profile.resumo}</p>
            </div>
          )}

          {/* Habilidades Técnicas */}
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-slate-600 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              Habilidades Técnicas
            </h3>
            <div className="flex flex-wrap gap-3">
              {profile.habilidadesTecnicas.map((skill, index) => (
                <span
                  key={index}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-50 to-slate-50 dark:from-indigo-900/40 dark:to-slate-900/40 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-bold border-2 border-indigo-200 dark:border-indigo-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          {profile.softSkills && profile.softSkills.length > 0 && (
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {profile.softSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-5 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-300 rounded-xl text-sm font-bold border-2 border-green-200 dark:border-green-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experiências */}
          {profile.experiencias && profile.experiencias.length > 0 && (
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Experiências Profissionais
              </h3>
              <div className="space-y-5">
                {profile.experiencias.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-all duration-300"
                  >
                    <h4 className="font-black text-xl text-gray-900 dark:text-white mb-2">
                      {exp.cargo}
                    </h4>
                    <p className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                      {exp.empresa}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2 font-semibold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.inicio} - {exp.fim || 'Atual'}
                    </p>
                    {exp.descricao && (
                      <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
                        {exp.descricao}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formação */}
          {profile.formacao && profile.formacao.length > 0 && (
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-slate-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14v9m0-9l-9-5m9 5l9-5m-9 5v9" />
                  </svg>
                </div>
                Formação Acadêmica
              </h3>
              <div className="space-y-4">
                {profile.formacao.map((form, index) => (
                  <div key={index} className="bg-gradient-to-r from-indigo-50 to-slate-50 dark:from-indigo-900/30 dark:to-slate-900/30 p-5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 shadow-md hover:shadow-lg transition-all duration-200">
                    <h4 className="font-black text-lg text-gray-900 dark:text-white mb-2">
                      {form.curso}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                      {form.instituicao} • {form.ano}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projetos */}
          {profile.projetos && profile.projetos.length > 0 && (
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                Projetos
              </h3>
              <div className="space-y-4">
                {profile.projetos.map((proj, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 p-6 rounded-2xl border-2 border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all duration-300">
                    <h4 className="font-black text-lg text-gray-900 dark:text-white mb-3">
                      {proj.titulo}
                    </h4>
                    {proj.descricao && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {proj.descricao}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificações */}
          {profile.certificacoes && profile.certificacoes.length > 0 && (
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                Certificações
              </h3>
              <div className="space-y-3">
                {profile.certificacoes.map((cert, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 p-4 rounded-xl border-2 border-yellow-200 dark:border-yellow-800 shadow-md">
                    <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 font-bold">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {profile.idiomas && profile.idiomas.length > 0 && (
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                Idiomas
              </h3>
              <div className="flex flex-wrap gap-3">
                {profile.idiomas.map((idioma, index) => (
                  <span
                    key={index}
                    className="px-5 py-2.5 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-900/40 dark:to-indigo-900/40 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold border-2 border-slate-200 dark:border-slate-800 shadow-md"
                  >
                    {idioma.idioma} <span className="text-slate-600 dark:text-slate-400">•</span> {idioma.nivel}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Áreas de Interesse */}
          {profile.areaInteresses && profile.areaInteresses.length > 0 && (
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                Áreas de Interesse
              </h3>
              <div className="flex flex-wrap gap-3">
                {profile.areaInteresses.map((interesse, index) => (
                  <span
                    key={index}
                    className="px-5 py-2.5 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/40 dark:to-rose-900/40 text-pink-700 dark:text-pink-300 rounded-xl text-sm font-bold border-2 border-pink-200 dark:border-pink-800 shadow-md"
                  >
                    {interesse}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast de Notificação */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Modal de Mensagem */}
      <MessageModal
        profile={profile}
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
      />
    </div>
  )
}

export default Modal
