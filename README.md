# 📚 Blog App - Tech Challenge Fase 04

> Aplicação de blogging mobile com React Native e Node.js

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Executando o Projeto](#-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Equipe](#-equipe)

---

## 🎯 Sobre o Projeto

Aplicação de blogging dinâmico desenvolvida para o **Tech Challenge da Fase 04** do curso de Full Stack Development da FIAP/Postech.

### Funcionalidades

- ✅ Autenticação de professores e alunos
- ✅ Listagem e busca de posts
- ✅ CRUD de posts (professores)
- ✅ Gestão de professores
- ✅ Gestão de estudantes
- ✅ Controle de acesso por perfil

---

## 🛠️ Tecnologias

### Back-end
- **Node.js 20+**
- **Express.js**
- **PostgreSQL 15**
- **Prisma ORM**
- **JWT** para autenticação
- **Docker**

### Mobile
- **React Native (Expo)**
- **React Navigation 6**
- **Axios**
- **Context API**

---

## 📦 Pré-requisitos

Antes de começar, você vai precisar ter instalado:

- [Node.js 20+](https://nodejs.org/)
- [Docker](https://www.docker.com/) e Docker Compose
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Emulador Android/iOS ou app **Expo Go**

---

## 🚀 Instalação

### 1. Clonar repositório

```bash
git clone <repo-url>
cd tech-challenge-mobile
```

### 2. Configurar variáveis de ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com suas configurações
```

### 3. Subir containers (Docker)

```bash
docker-compose up -d
```

### 4. Instalar dependências e rodar migrations

```bash
# Backend
cd backend
npm install
npx prisma migrate dev
npx prisma db seed

# Mobile
cd ../mobile
npm install
```

---

## 🏃 Executando o Projeto

### Com Docker (Recomendado)

```bash
# Subir todo o ambiente
docker-compose up

# O PostgreSQL estará disponível na porta 5432
# A API estará disponível em http://localhost:3000
```

### Sem Docker (Desenvolvimento)

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Mobile
cd mobile
npx expo start
```

---

## 📁 Estrutura do Projeto

```
tech-challenge-mobile/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── services/        # Lógica de negócio
│   │   ├── repositories/    # Acesso a dados
│   │   ├── middlewares/     # Middlewares Express
│   │   ├── routes/          # Rotas da API
│   │   ├── utils/           # Utilitários
│   │   └── app.ts           # Entry point
│   ├── prisma/              # Schema e migrations
│   ├── Dockerfile
│   └── package.json
│
├── mobile/                  # App React Native
│   ├── src/
│   │   ├── screens/         # Telas
│   │   ├── components/      # Componentes
│   │   ├── services/        # Serviços (API)
│   │   ├── hooks/           # Custom hooks
│   │   ├── contexts/        # Context API
│   │   ├── navigation/      # Navegação
│   │   ├── theme/           # Design system
│   │   └── utils/           # Utilitários
│   ├── App.tsx
│   └── package.json
│
├── discovery/               # Documentação de discovery
├── transformation/          # Wave planning
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Endpoints

### Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Dados do usuário |

### Posts
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/posts` | Listar posts |
| GET | `/api/posts/:id` | Detalhes do post |
| GET | `/api/posts/search` | Buscar posts |
| POST | `/api/posts` | Criar post |
| PUT | `/api/posts/:id` | Editar post |
| DELETE | `/api/posts/:id` | Excluir post |

### Professores
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/professors` | Listar professores |
| POST | `/api/professors` | Criar professor |
| PUT | `/api/professors/:id` | Editar professor |
| DELETE | `/api/professors/:id` | Excluir professor |

### Estudantes
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/students` | Listar estudantes |
| POST | `/api/students` | Criar estudante |
| PUT | `/api/students/:id` | Editar estudante |
| DELETE | `/api/students/:id` | Excluir estudante |

---

## 🔐 Credenciais de Teste

Após rodar o seed, use essas credenciais para testar:

| Tipo | Email | Senha |
|------|-------|-------|
| Professor | professor@email.com | 123456 |
| Estudante | aluno@email.com | 123456 |

---

## 👥 Equipe

- **[Nome]** - RM: XXXXX
- **[Nome]** - RM: XXXXX
- **[Nome]** - RM: XXXXX

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

*Tech Challenge - Fase 04 - Full Stack Development - FIAP/Postech*

