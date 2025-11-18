// Componente Dark Mode Toggle moderno
const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="fixed top-24 right-6 z-50">
      <button
        onClick={toggleDarkMode}
        className="relative p-4 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/50 dark:hover:border-blue-400/50 group hover:scale-110"
        aria-label="Alternar modo escuro"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 rounded-2xl transition-all duration-300"></div>
        {darkMode ? (
          <svg
            className="relative w-6 h-6 text-yellow-500 group-hover:rotate-180 transition-transform duration-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="relative w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform duration-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    </div>
  )
}

export default DarkModeToggle
