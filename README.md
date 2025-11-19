# 🚀 Futuro do Trabalho - Plataforma de Conexão Profissional

SPA moderna em React + Vite + Tailwind CSS para conectar profissionais, competências e propósito através da tecnologia.

## 📋 Resumo do Projeto

A plataforma **Futuro do Trabalho** é uma aplicação web moderna estilo LinkedIn, desenvolvida para conectar profissionais e facilitar a descoberta de talentos. A aplicação permite visualizar perfis detalhados de profissionais, buscar e filtrar por diversos critérios, recomendar profissionais, visualizar histórico de perfis acessados e muito mais.

### Principais Funcionalidades:
- ✅ Visualização de perfis em grade de cards responsiva
- ✅ Sistema de busca e filtros avançados (área, localização, tecnologia)
- ✅ Modal detalhado com informações completas do profissional
- ✅ Sistema de autenticação (login/cadastro)
- ✅ Sistema de recomendações de profissionais
- ✅ Histórico de visualizações
- ✅ Compartilhamento de perfis
- ✅ Exportação de perfis em PDF
- ✅ Sistema de notificações
- ✅ Dark Mode com persistência
- ✅ Design totalmente responsivo
- ✅ ChatBot de suporte

## 👥 Usuários e Senhas

**⚠️ Nota:** O sistema não possui usuários pré-cadastrados. É necessário realizar o cadastro através da interface da aplicação.

### Como criar uma conta:
1. Acesse a aplicação
2. Clique no botão "Cadastre-se agora" ou "Entrar" no header
3. Preencha o formulário de cadastro com:
   - Nome completo
   - Email válido
   - Senha (mínimo 6 caracteres)
   - Confirmação de senha
4. Aceite os termos de serviço
5. Clique em "Cadastrar"

Após o cadastro, você será automaticamente logado no sistema.

### Para testar a aplicação:
Você pode criar quantas contas desejar para testar as funcionalidades. Todos os dados são armazenados localmente no navegador (localStorage).

## 🚀 Instalação do Projeto

### Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- **Node.js** versão 16 ou superior
- **npm** (geralmente vem com o Node.js) ou **yarn**

### Passo a Passo

#### 1. Clone o repositório
```bash
git clone [LINK_DO_REPOSITORIO]
cd "GS-Front e Web"
```

#### 2. Instale as dependências
```bash
npm install
```

Este comando irá instalar todas as dependências necessárias listadas no `package.json`:
- React 18.2.0
- React DOM 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.0
- E outras dependências de desenvolvimento

#### 3. Execute o servidor de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

#### 4. Build para produção (opcional)
Para gerar uma versão otimizada para produção:
```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`

#### 5. Preview do build de produção (opcional)
Para visualizar o build de produção localmente:
```bash
npm run preview
```

## 🌐 Deploy

**Link do Deploy:** [ADICIONAR_LINK_DO_DEPLOY_AQUI]

A aplicação pode ser deployada em plataformas como:
- Vercel
- Netlify
- GitHub Pages
- AWS Amplify
- Outras plataformas de hospedagem estática

## 📦 Repositório

**Link do Repositório:** [ADICIONAR_LINK_DO_REPOSITORIO_AQUI]

## 👨‍💻 Integrantes do Grupo

| Nome | RM |
|------|-----|
| [ADICIONAR_NOME_1] | [ADICIONAR_RM_1] |
| [ADICIONAR_NOME_2] | [ADICIONAR_RM_2] |
| [ADICIONAR_NOME_3] | [ADICIONAR_RM_3] |

## 🛠️ Tecnologias Utilizadas

- **React 18.2.0** - Biblioteca JavaScript para construção de interfaces
- **Vite 5.0.8** - Build tool e dev server ultra-rápido
- **Tailwind CSS 3.4.0** - Framework CSS utility-first
- **PostCSS & Autoprefixer** - Processamento de CSS

## 📁 Estrutura do Projeto

```
projeto/
├── public/                    # Arquivos públicos
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Card.jsx           # Card de perfil profissional
│   │   ├── Modal.jsx          # Modal com detalhes do perfil
│   │   ├── SearchBar.jsx      # Barra de busca
│   │   ├── Filters.jsx        # Componente de filtros
│   │   ├── DarkModeToggle.jsx # Toggle de dark mode
│   │   ├── Header.jsx         # Cabeçalho da aplicação
│   │   ├── Footer.jsx         # Rodapé
│   │   ├── LoginModal.jsx     # Modal de login
│   │   ├── SignupModal.jsx    # Modal de cadastro
│   │   ├── Toast.jsx          # Notificações toast
│   │   ├── MessageModal.jsx   # Modal de mensagens
│   │   ├── Notifications.jsx  # Sistema de notificações
│   │   └── ChatBot.jsx        # ChatBot de suporte
│   ├── pages/                 # Páginas da aplicação
│   │   ├── Home.jsx           # Página principal
│   │   ├── Vagas.jsx          # Página de vagas
│   │   └── Perfil.jsx         # Página de perfil do usuário
│   ├── context/               # Contextos React
│   │   └── AuthContext.jsx    # Contexto de autenticação
│   ├── data/                  # Dados estáticos
│   │   ├── profiles.json      # Perfis de profissionais
│   │   └── vagas.json         # Vagas de emprego
│   ├── App.jsx                # Componente principal
│   ├── main.jsx               # Ponto de entrada
│   └── index.css              # Estilos globais
├── index.html                  # HTML principal
├── package.json               # Dependências do projeto
├── vite.config.js             # Configuração do Vite
├── tailwind.config.js         # Configuração do Tailwind
├── postcss.config.js          # Configuração do PostCSS
└── README.md                  # Este arquivo
```

## 📝 Dados

O arquivo `src/data/profiles.json` contém 60+ perfis de profissionais com estrutura completa:
- Dados pessoais (nome, foto, cargo, resumo)
- Localização e área
- Habilidades técnicas e soft skills
- Experiências profissionais
- Formação acadêmica
- Projetos e certificações
- Idiomas e áreas de interesse

## ✨ Funcionalidades Detalhadas

### Sistema de Autenticação
- Cadastro de novos usuários
- Login com email e senha
- Persistência de sessão (localStorage)
- Logout

### Sistema de Recomendações
- Recomendar profissionais
- Visualizar profissionais recomendados
- Remover recomendações
- Histórico de recomendações na página de perfil

### Histórico de Visualizações
- Rastreamento automático de perfis visualizados
- Visualização do histórico na página de perfil
- Limpar histórico

### Compartilhamento
- Compartilhar perfis via API nativa do navegador
- Copiar link do perfil para área de transferência

### Exportação
- Exportar perfil em PDF
- Formatação profissional do documento

### Notificações
- Notificações quando alguém recomenda um perfil que você visualizou
- Sistema de notificações em tempo real

## 🌙 Dark Mode

Implementado com Tailwind CSS (`dark:` prefix) e persistência no `localStorage`. O modo escuro pode ser alternado através do botão no canto inferior direito da tela.

## 📱 Responsivo

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px  
- **Desktop:** > 1024px

## 🔒 Armazenamento de Dados

Todos os dados do usuário são armazenados localmente no navegador usando `localStorage`:
- `currentUser`: Usuário logado atualmente
- `registeredUsers`: Lista de usuários cadastrados
- `recommendations`: Recomendações de profissionais
- `viewHistory`: Histórico de visualizações
- `readNotifications`: Notificações lidas
- `darkMode`: Preferência de tema

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

**Desenvolvido com React + Vite + Tailwind CSS**
