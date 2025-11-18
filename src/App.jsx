import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import DarkModeToggle from './components/DarkModeToggle'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Verifica se há preferência salva no localStorage
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    // Aplica a classe dark no HTML baseado no estado
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // Salva a preferência no localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-colors duration-500 flex flex-col relative">
      {/* Pattern de fundo sutil */}
      <div className="fixed inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <Header />
      <main className="flex-grow relative z-10">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Home />
      </main>
      <Footer />
    </div>
  )
}

export default App

