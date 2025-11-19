// Componente Dark Mode Toggle moderno
const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="fixed top-16 sm:top-20 md:top-24 right-2 sm:right-4 md:right-6 z-50">
      <button
        onClick={toggleDarkMode}
        className="relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 group hover:scale-110"
        aria-label="Alternar modo escuro"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-slate-500/0 group-hover:from-indigo-500/20 group-hover:via-indigo-500/20 group-hover:to-slate-500/20 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-300"></div>
        {darkMode ? (
          <svg
            className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500 group-hover:rotate-180 transition-transform duration-700"
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
            className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform duration-700"
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
