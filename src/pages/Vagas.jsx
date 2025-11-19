import { useState, useEffect } from 'react'
import VagaCard from '../components/VagaCard'
import VagaModal from '../components/VagaModal'

const Vagas = () => {
  const [vagas, setVagas] = useState([])
  const [filteredVagas, setFilteredVagas] = useState([])
  const [selectedVaga, setSelectedVaga] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    tipo: '',
    remoto: '',
    nivelExperiencia: '',
    localizacao: '',
    empresa: ''
  })

  useEffect(() => {
    fetch('/vagas.json')
      .then((response) => response.json())
      .then((data) => {
        setVagas(data)
        setFilteredVagas(data)
      })
      .catch((error) => {
        console.error('Erro ao carregar vagas:', error)
      })
  }, [])

  useEffect(() => {
    let filtered = [...vagas]

    // Busca por texto
    if (searchTerm) {
      filtered = filtered.filter((vaga) =>
        vaga.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaga.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaga.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtros
    if (filters.tipo) {
      filtered = filtered.filter((vaga) => vaga.tipo === filters.tipo)
    }
    if (filters.remoto !== '') {
      filtered = filtered.filter((vaga) => vaga.remoto === (filters.remoto === 'true'))
    }
    if (filters.nivelExperiencia) {
      filtered = filtered.filter((vaga) => vaga.nivelExperiencia === filters.nivelExperiencia)
    }
    if (filters.localizacao) {
      filtered = filtered.filter((vaga) => vaga.localizacao === filters.localizacao)
    }
    if (filters.empresa) {
      filtered = filtered.filter((vaga) => vaga.empresa === filters.empresa)
    }

    setFilteredVagas(filtered)
  }, [searchTerm, filters, vagas])

  const handleCardClick = (vaga) => {
    setSelectedVaga(vaga)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVaga(null)
  }

  const handleCandidatar = () => {
    alert('Funcionalidade de candidatura será implementada em breve!')
    // Aqui você pode implementar a lógica de candidatura
  }

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  const tipos = [...new Set(vagas.map((v) => v.tipo))].sort()
  const niveis = [...new Set(vagas.map((v) => v.nivelExperiencia))].sort()
  const localizacoes = [...new Set(vagas.map((v) => v.localizacao))].sort()
  const empresas = [...new Set(vagas.map((v) => v.empresa))].sort()

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight px-2">
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 via-slate-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              Encontre Sua Vaga Ideal
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto px-2">
            Conecte-se com oportunidades que transformam sua carreira
          </p>
        </div>

        {/* Barra de Busca */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar vagas por título, empresa ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-14 pr-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md"
            />
            <svg
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
              <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros de Busca
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Vaga
                </label>
                <select
                  value={filters.tipo}
                  onChange={(e) => handleFilterChange('tipo', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="">Todos os tipos</option>
                  {tipos.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Remoto
                </label>
                <select
                  value={filters.remoto}
                  onChange={(e) => handleFilterChange('remoto', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="">Todos</option>
                  <option value="true">Remoto</option>
                  <option value="false">Presencial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nível
                </label>
                <select
                  value={filters.nivelExperiencia}
                  onChange={(e) => handleFilterChange('nivelExperiencia', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="">Todos os níveis</option>
                  {niveis.map((nivel) => (
                    <option key={nivel} value={nivel}>
                      {nivel}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Localização
                </label>
                <select
                  value={filters.localizacao}
                  onChange={(e) => handleFilterChange('localizacao', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="">Todas as localizações</option>
                  {localizacoes.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Empresa
                </label>
                <select
                  value={filters.empresa}
                  onChange={(e) => handleFilterChange('empresa', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="">Todas as empresas</option>
                  {empresas.map((emp) => (
                    <option key={emp} value={emp}>
                      {emp}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botão Limpar Filtros */}
            {(filters.tipo || filters.remoto !== '' || filters.nivelExperiencia || filters.localizacao || filters.empresa || searchTerm) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setFilters({ tipo: '', remoto: '', nivelExperiencia: '', localizacao: '', empresa: '' })
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contador de Resultados */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Vagas encontradas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {filteredVagas.length} {filteredVagas.length === 1 ? 'vaga' : 'vagas'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Vagas */}
        <div className="space-y-4">
          {filteredVagas.length > 0 ? (
            filteredVagas.map((vaga) => (
              <VagaCard
                key={vaga.id}
                vaga={vaga}
                onClick={() => handleCardClick(vaga)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Nenhuma vaga encontrada com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      <VagaModal
        vaga={selectedVaga}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCandidatar={handleCandidatar}
      />
    </div>
  )
}

export default Vagas

