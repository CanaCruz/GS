import { createContext, useContext, useState, useEffect } from 'react'

// Context para gerenciar autenticação
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carrega usuário do localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    const savedUsers = localStorage.getItem('registeredUsers')
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        // Verifica se o usuário ainda existe na lista de usuários registrados
        if (savedUsers) {
          const users = JSON.parse(savedUsers)
          const userExists = users.find(u => u.email === userData.email)
          if (userExists) {
            setUser(userData)
          } else {
            localStorage.removeItem('currentUser')
          }
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        localStorage.removeItem('currentUser')
      }
    }
    setIsLoading(false)
  }, [])

  // Função de cadastro
  const signup = (name, email, password) => {
    try {
      // Busca usuários existentes
      const existingUsers = localStorage.getItem('registeredUsers')
      const users = existingUsers ? JSON.parse(existingUsers) : []

      // Verifica se o email já existe
      if (users.find(u => u.email === email)) {
        return { success: false, message: 'Este email já está cadastrado' }
      }

      // Cria novo usuário
      const newUser = {
        id: Date.now(),
        name,
        email,
        password, // Em produção, isso deveria ser hash
        createdAt: new Date().toISOString()
      }

      // Adiciona à lista de usuários
      users.push(newUser)
      localStorage.setItem('registeredUsers', JSON.stringify(users))

      // Faz login automático após cadastro
      setUser({ id: newUser.id, name: newUser.name, email: newUser.email })
      localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email }))

      return { success: true, message: 'Cadastro realizado com sucesso!' }
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      return { success: false, message: 'Erro ao realizar cadastro. Tente novamente.' }
    }
  }

  // Função de login
  const login = (email, password) => {
    try {
      const existingUsers = localStorage.getItem('registeredUsers')
      if (!existingUsers) {
        return { success: false, message: 'Email ou senha incorretos' }
      }

      const users = JSON.parse(existingUsers)
      const user = users.find(u => u.email === email && u.password === password)

      if (user) {
        const userData = { id: user.id, name: user.name, email: user.email }
        setUser(userData)
        localStorage.setItem('currentUser', JSON.stringify(userData))
        return { success: true, message: 'Login realizado com sucesso!' }
      } else {
        return { success: false, message: 'Email ou senha incorretos' }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return { success: false, message: 'Erro ao fazer login. Tente novamente.' }
    }
  }

  // Função de logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  const value = {
    user,
    isLoading,
    signup,
    login,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

