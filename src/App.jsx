import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Vagas from './pages/Vagas'
import Perfil from './pages/Perfil'
import Header from './components/Header'
import Footer from './components/Footer'
import DarkModeToggle from './components/DarkModeToggle'
import LoginModal from './components/LoginModal'
import SignupModal from './components/SignupModal'
import ChatBot from './components/ChatBot'
import Notifications from './components/Notifications'

function AppContent() {
  const { user } = useAuth()
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [currentPage, setCurrentPage] = useState('home')

  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleOpenLogin = () => {
    setIsSignupOpen(false)
    setIsLoginOpen(true)
  }

  const handleOpenSignup = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(true)
  }

  const handleCloseLogin = () => {
    setIsLoginOpen(false)
  }

  const handleCloseSignup = () => {
    setIsSignupOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/20 to-slate-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-colors duration-500 flex flex-col relative">
      {/* Pattern de fundo sutil */}
      <div className="fixed inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <Header 
        user={user}
        onOpenLogin={handleOpenLogin} 
        onOpenSignup={handleOpenSignup}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main className="flex-grow relative z-10">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {currentPage === 'home' ? <Home /> : currentPage === 'vagas' ? <Vagas /> : <Perfil />}
      </main>
      <Footer />

      {/* Modais de Login e Cadastro */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={handleCloseLogin}
        onSwitchToSignup={handleOpenSignup}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={handleCloseSignup}
        onSwitchToLogin={handleOpenLogin}
      />

      {/* ChatBot de Suporte */}
      <ChatBot />

      {/* Sistema de Notificações */}
      <Notifications />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

