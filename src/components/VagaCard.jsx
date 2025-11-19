// Componente Card de Vaga no estilo LinkedIn
const VagaCard = ({ vaga, onClick }) => {
  const getTimeAgo = (dateString) => {
    const now = new Date()
    const published = new Date(dateString)
    const diffInMs = now - published
    const diffInMinutes = Math.floor(diffInMs / 60000)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInMinutes < 60) {
      return `Há ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`
    } else if (diffInHours < 24) {
      return `Há ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`
    } else {
      return `Há ${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`
    }
  }

  const getStatusIcon = (status) => {
    if (status === 'Contratando agora') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    } else {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer p-6 group"
    >
      <div className="flex items-start gap-4">
        {/* Logo da Empresa */}
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-slate-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {vaga.logo && vaga.logo !== 'https://via.placeholder.com/64' ? (
            <img src={vaga.logo} alt={vaga.empresa} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-xl font-bold">
              {vaga.empresa.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Informações da Vaga */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {vaga.titulo}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
            {vaga.empresa}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {vaga.localizacao}
            </span>
            {vaga.remoto && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md font-medium">
                Remoto
              </span>
            )}
            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-md font-medium">
              {vaga.tipo}
            </span>
          </div>

          {/* Status e Tempo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 text-xs font-semibold ${
                vaga.status === 'Contratando agora' 
                  ? 'text-orange-600 dark:text-orange-400' 
                  : 'text-green-600 dark:text-green-400'
              }`}>
                {getStatusIcon(vaga.status)}
                {vaga.status}
              </span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {getTimeAgo(vaga.publicado)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VagaCard

