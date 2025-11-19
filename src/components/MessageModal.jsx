import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

// Modal de Envio de Mensagem
const MessageModal = ({ profile, isOpen, onClose }) => {
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen || !profile) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('Por favor, faça login para enviar mensagens.')
      onClose()
      return
    }

    if (!subject.trim() || !message.trim()) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    setIsLoading(true)

    // Simular envio de mensagem (salvar no localStorage)
    try {
      const messages = JSON.parse(localStorage.getItem('messages') || '[]')
      const newMessage = {
        id: Date.now(),
        from: user.name || user.email,
        fromEmail: user.email,
        to: profile.nome,
        toEmail: profile.email || `${profile.nome.toLowerCase().replace(/\s+/g, '.')}@exemplo.com`,
        subject,
        message,
        timestamp: new Date().toISOString(),
        read: false
      }
      messages.push(newMessage)
      localStorage.setItem('messages', JSON.stringify(messages))
      
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setMessage('')
        setSubject('')
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      alert('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 dark:bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full mx-2 sm:mx-4 border border-gray-200/50 dark:border-gray-700/50 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600/10 via-indigo-500/10 to-slate-600/10 dark:from-indigo-900/20 dark:via-indigo-900/20 dark:to-slate-900/20 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white bg-gradient-to-r from-indigo-600 to-slate-600 bg-clip-text text-transparent">
              Enviar Mensagem
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Para: <span className="font-bold text-indigo-600 dark:text-indigo-400">{profile.nome}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2 transition-all duration-200 hover:scale-110"
            aria-label="Fechar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                Mensagem Enviada!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sua mensagem foi enviada com sucesso para {profile.nome}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Proposta de colaboração"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem aqui..."
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white resize-none transition-all duration-200"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-slate-600 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageModal

