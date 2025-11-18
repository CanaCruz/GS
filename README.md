# 🚀 Futuro do Trabalho - Plataforma de Conexão Profissional

SPA moderna em React + Vite + Tailwind CSS para conectar profissionais, competências e propósito através da tecnologia.

## 📋 Sobre

Plataforma estilo LinkedIn focada em **"O Futuro do Trabalho"**, permitindo:
- Visualizar perfis de profissionais em grade de cards
- Buscar por nome
- Filtrar por área, localização e tecnologia
- Visualizar detalhes completos de cada perfil
- Dark Mode com persistência
- Design totalmente responsivo

## ✨ Funcionalidades

- ✅ **Grade de Cards**: Visualização em grid responsivo com foto, nome, cargo, localização e habilidades técnicas
- ✅ **Modal Detalhado**: Visualização completa do perfil profissional com todas as informações
- ✅ **Busca por Nome**: Busca em tempo real por nome do profissional
- ✅ **Filtros Avançados**: Filtros por área, cidade/estado e tecnologia
- ✅ **Dark Mode**: Alternância entre modo claro e escuro com persistência no localStorage
- ✅ **Totalmente Responsivo**: Layout adaptável para mobile, tablet e desktop
- ✅ **60+ Perfis**: Dados carregados de arquivo JSON local

## 🛠️ Tecnologias Utilizadas

- **React 18.2.0** - Biblioteca JavaScript para construção de interfaces
- **Vite 5.0.8** - Build tool e dev server ultra-rápido
- **Tailwind CSS 3.4.0** - Framework CSS utility-first
- **PostCSS & Autoprefixer** - Processamento de CSS

## 📁 Estrutura

```
projeto/
├── public/
│   └── profiles.json          # 60+ perfis de profissionais
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Filters.jsx
│   │   ├── DarkModeToggle.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js 16+ e npm

### Instalar dependências
```bash
npm install
```

### Executar desenvolvimento
```bash
npm run dev
```
Acesse: `http://localhost:5173`

### Build produção
```bash
npm run build
```

### Preview build
```bash
npm run preview
```

## 📝 Dados

O arquivo `public/profiles.json` contém 60+ perfis com estrutura completa:
- Dados pessoais (nome, foto, cargo, resumo)
- Localização e área
- Habilidades técnicas e soft skills
- Experiências profissionais
- Formação acadêmica
- Projetos e certificações
- Idiomas e áreas de interesse

## 🎨 Componentes

- **Home**: Página principal com busca, filtros e grade de cards
- **Card**: Exibição resumida do profissional
- **Modal**: Detalhes completos do perfil
- **SearchBar**: Busca por nome
- **Filters**: Filtros por área, localização e tecnologia
- **Header/Footer**: Navegação e informações

## 🌙 Dark Mode

Implementado com Tailwind CSS (`dark:` prefix) e persistência no `localStorage`.

## 📱 Responsivo

- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

---

**Desenvolvido com React + Vite + Tailwind CSS**

