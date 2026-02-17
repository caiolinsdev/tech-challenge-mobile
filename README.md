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
- [Credenciais de Teste](#-credenciais-de-teste)
- [Documentação](#-documentação)
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

### 4. Rodar migrations e seed

```bash
# Com Docker rodando, execute dentro do container da API:
docker compose exec api npx prisma migrate dev
docker compose exec api npx prisma db seed

# Ou, se estiver rodando o backend localmente:
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
```

### 5. Instalar dependências do mobile

```bash
cd mobile
npm install
```

---

## 🏃 Executando o Projeto

### Com Docker (Recomendado)

```bash
# Subir banco e API
docker compose up postgres api

# PostgreSQL: porta 5432
# API: http://localhost:3000
```

### Mobile (local)

O app mobile roda **fora do Docker** para melhor integração com emuladores:

```bash
cd mobile
npx expo start
```

**Celular físico:** Configure o IP do seu PC em `mobile/app.json` (`extra.apiUrl`). Exemplo: `http://192.168.1.100:3000`. Use `ipconfig getifaddr en0` (Mac) para descobrir seu IP.

---

## 📁 Estrutura do Projeto

```
tech-challenge-mobile/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores (validação Zod)
│   │   ├── services/        # Lógica de negócio + Prisma
│   │   ├── middlewares/     # Auth, autorização, erro
│   │   ├── routes/          # Rotas da API
│   │   ├── utils/           # Prisma, JWT, password
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
| GET | `/api/posts/search` | Buscar posts |
| GET | `/api/posts/mine` | Meus posts (professor) |
| GET | `/api/posts/:id` | Detalhes do post |
| POST | `/api/posts` | Criar post (professor) |
| PUT | `/api/posts/:id` | Editar post (professor) |
| DELETE | `/api/posts/:id` | Excluir post (professor) |

### Professores (apenas professor)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/professors` | Listar professores |
| GET | `/api/professors/:id` | Detalhes do professor |
| POST | `/api/professors` | Criar professor |
| PUT | `/api/professors/:id` | Editar professor |
| DELETE | `/api/professors/:id` | Excluir professor |

### Estudantes (apenas professor)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/students` | Listar estudantes |
| GET | `/api/students/:id` | Detalhes do estudante |
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

## 📚 Documentação

- [Arquitetura do Sistema](docs/ARCHITECTURE.md)
- [Desafios Técnicos](docs/CHALLENGES.md)

---

## 👥 Equipe

- **[Nome]** - RM: XXXXX
- **[Nome]** - RM: XXXXX
- **[Nome]** - RM: XXXXX

---

## 📱 Screenshots

_Adicione screenshots das telas principais aqui._

---

## 🎥 Vídeo de Apresentação

_Vídeo de demonstração (máx. 15 min) a ser gravado pela equipe._

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

*Tech Challenge - Fase 04 - Full Stack Development - FIAP/Postech*

