// Componente Card moderno e futurista
const Card = ({ profile, onClick }) => {
  const topSkills = profile.habilidadesTecnicas.slice(0, 3)

  return (
    <div
      onClick={onClick}
      className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/50 dark:hover:border-blue-400/50 transform hover:-translate-y-3 hover:scale-[1.02]"
    >
      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500 rounded-3xl"></div>

      {/* Foto do profissional com glow */}
      <div className="relative w-full h-64 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 flex items-center justify-center overflow-hidden">
        {/* Shapes decorativos */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-300 rounded-full blur-2xl"></div>
        </div>
        
        {profile.foto ? (
          <img
            src={profile.foto}
            alt={profile.nome}
            className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `
                <div class="relative z-10 w-full h-full flex items-center justify-center text-white text-6xl font-black">
                  ${profile.nome.charAt(0).toUpperCase()}
                </div>
              `
            }}
          />
        ) : (
          <div className="relative z-10 text-white text-6xl font-black">
            {profile.nome.charAt(0).toUpperCase()}
          </div>
        )}
        
        {/* Badge de área com glow */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-4 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-900 dark:text-white text-xs font-bold rounded-full shadow-xl border border-white/20 glow-blue">
            {profile.area}
          </span>
        </div>
      </div>

      {/* Informações do card */}
      <div className="relative z-10 p-6">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
          {profile.nome}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 truncate font-semibold">
          {profile.cargo}
        </p>
        
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-5 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-medium">{profile.localizacao}</span>
        </p>

        {/* Habilidades técnicas com gradiente */}
        <div className="flex flex-wrap gap-2 mb-5">
          {topSkills.map((skill, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 rounded-lg font-bold border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
        
        {/* Indicador de clique com animação */}
        <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <p className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            Ver perfil completo
            <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card
