import { useState, useRef, useEffect } from 'react'

// Componente ChatBot moderno e futurista
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! 👋 Sou o assistente virtual do Futuro do Trabalho. Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll automático para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Foco no input quando o chat abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300)
    }
  }, [isOpen])

  // Respostas do bot baseadas em palavras-chave
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim()

    // Saudações
    if (message.match(/^(oi|olá|ola|hey|hi|bom dia|boa tarde|boa noite)/)) {
      return {
        text: 'Olá! 😊 Como posso ajudar você hoje? Você pode me perguntar sobre:\n\n• Como usar a plataforma\n• Como buscar profissionais\n• Como fazer login ou cadastro\n• Informações sobre a plataforma\n• Contato e suporte',
        quickReplies: ['Como buscar profissionais?', 'Como fazer cadastro?', 'Informações sobre a plataforma']
      }
    }

    // Buscar profissionais
    if (message.match(/(buscar|encontrar|procurar|pesquisar).*(profissional|pessoa|talentos?)/)) {
      return {
        text: 'Para buscar profissionais na plataforma:\n\n1️⃣ Use a barra de busca no topo para pesquisar por nome\n2️⃣ Use os filtros para buscar por:\n   • Área de atuação\n   • Localização (cidade/estado)\n   • Tecnologias específicas\n3️⃣ Clique em qualquer card para ver o perfil completo\n\nDica: Você pode combinar múltiplos filtros para uma busca mais precisa! 🔍',
        quickReplies: ['Como usar os filtros?', 'Ver todos os profissionais']
      }
    }

    // Filtros
    if (message.match(/(filtro|filtrar|como filtrar)/)) {
      return {
        text: 'Os filtros estão localizados logo abaixo da barra de busca. Você pode filtrar por:\n\n📌 **Área de Atuação**: TI, Saúde, Design, Educação, etc.\n📍 **Localização**: Cidade e estado\n💻 **Tecnologia**: Linguagens, frameworks, ferramentas específicas\n\nBasta selecionar as opções desejadas e os resultados serão atualizados automaticamente! ✨',
        quickReplies: ['Buscar profissionais', 'Voltar ao início']
      }
    }

    // Login/Cadastro
    if (message.match(/(cadastr|registr|conta|login|entrar|logar)/)) {
      return {
        text: 'Para criar uma conta ou fazer login:\n\n🔹 **Cadastro**:\n1. Clique em "Cadastre-se agora" no header\n2. Preencha: Nome, Email e Senha\n3. Aceite os termos de serviço\n4. Pronto! Você já estará logado\n\n🔹 **Login**:\n1. Clique em "Entrar" no header\n2. Digite seu email e senha\n3. Você pode marcar "Lembrar-me" para manter a sessão\n\n💡 Dica: Após fazer login, você terá acesso ao seu perfil e mais funcionalidades!',
        quickReplies: ['Como buscar profissionais?', 'Informações sobre a plataforma']
      }
    }

    // Informações sobre a plataforma
    if (message.match(/(sobre|informa|o que é|plataforma|futuro do trabalho)/)) {
      return {
        text: '**Futuro do Trabalho** é uma plataforma de conexão profissional que:\n\n✨ Conecta pessoas, competências e propósito\n💼 Reúne profissionais de diversas áreas\n🔍 Oferece busca e filtros avançados\n📱 Interface moderna e responsiva\n🌙 Suporte a modo escuro\n\nNossa missão é facilitar a conexão entre talentos e oportunidades, transformando o futuro do trabalho através da tecnologia! 🚀',
        quickReplies: ['Como buscar profissionais?', 'Como fazer cadastro?', 'Contato']
      }
    }

    // Contato
    if (message.match(/(contato|suporte|ajuda|falar|email|telefone|contatar)/)) {
      return {
        text: 'Você pode entrar em contato conosco através de:\n\n📧 **Email**: contato@futurodotrabalho.com\n📞 **Telefone**: (11) 9999-9999\n📍 **Localização**: São Paulo, SP - Brasil\n\nOu você pode rolar até a seção "Contato" na página para ver mais detalhes e até mesmo enviar uma mensagem através do formulário! 💬',
        quickReplies: ['Como buscar profissionais?', 'Voltar ao início']
      }
    }

    // Profissionais disponíveis
    if (message.match(/(quantos|quantas|total|profissionais|pessoas|perfis)/)) {
      return {
        text: 'Atualmente temos mais de 1000 profissionais cadastrados na plataforma, de diversas áreas como:\n\n💻 Tecnologia da Informação\n🏥 Saúde\n🎨 Design\n📚 Educação\n🔧 Engenharia\n💼 Negócios\n\nE muito mais! Use os filtros para encontrar o profissional ideal para suas necessidades. 🎯',
        quickReplies: ['Como buscar profissionais?', 'Ver todas as áreas']
      }
    }

    // Dark Mode
    if (message.match(/(modo escuro|dark mode|tema escuro|tema claro)/)) {
      return {
        text: 'Para alternar entre modo claro e escuro:\n\n🌙 Procure pelo botão de lua/sol no canto superior direito da tela\n☀️ Clique nele para alternar entre os modos\n\nA preferência é salva automaticamente, então na próxima vez que você acessar, o modo escolhido será mantido! ✨',
        quickReplies: ['Como buscar profissionais?', 'Voltar ao início']
      }
    }

    // Despedidas
    if (message.match(/(tchau|até|obrigad|obrigado|valeu|bye|até logo|até mais)/)) {
      return {
        text: 'Foi um prazer ajudar! 😊\n\nSe tiver mais alguma dúvida, é só chamar! Estou sempre aqui para ajudar.\n\nBoa sorte na sua busca por profissionais! 🚀',
        quickReplies: []
      }
    }

    // Resposta padrão
    return {
      text: 'Desculpe, não entendi completamente sua pergunta. 😅\n\nPosso ajudar com:\n\n• Como usar a plataforma\n• Como buscar profissionais\n• Como fazer login ou cadastro\n• Informações sobre a plataforma\n• Contato e suporte\n\nTente reformular sua pergunta ou escolha uma das opções rápidas abaixo! 💡',
      quickReplies: ['Como buscar profissionais?', 'Como fazer cadastro?', 'Informações sobre a plataforma']
    }
  }

  const handleSendMessage = (text = null) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    // Adiciona mensagem do usuário
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simula delay de resposta do bot
    setTimeout(() => {
      const botResponse = getBotResponse(messageText)
      const botMessage = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: botResponse.quickReplies || []
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickReply = (reply) => {
    handleSendMessage(reply)
  }

  return (
    <>
      {/* Botão flutuante do chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-indigo-600 to-slate-600 text-white shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 ${
          isOpen ? 'rotate-90' : ''
        }`}
        aria-label="Abrir chat de suporte"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>

      {/* Janela do chat */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-2 sm:right-4 md:right-6 z-50 w-[calc(100vw-1rem)] sm:w-96 max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-3rem)] h-[calc(100vh-6rem)] sm:h-[600px] max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-8rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col animate-scale-in">
          {/* Header do chat */}
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-600 to-slate-600 rounded-t-2xl sm:rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">Assistente Virtual</h3>
                  <p className="text-xs sm:text-sm text-white/80">Estou online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-1 sm:p-2 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Área de mensagens */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-gray-50/50 dark:bg-gray-950/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-slate-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  {message.quickReplies && message.quickReplies.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="block w-full text-left px-3 py-2 text-xs bg-white/10 dark:bg-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700 rounded-lg transition-colors text-white dark:text-gray-300"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Indicador de digitação */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input de mensagem */}
          <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-slate-600 text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 text-center hidden sm:block">
              Pressione Enter para enviar
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot

