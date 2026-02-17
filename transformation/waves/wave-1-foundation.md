# 🌊 WAVE 1 — FUNDAÇÃO

> Setup completo de infraestrutura, back-end e mobile

**Duração estimada:** 3-4 dias  
**Dependências:** Nenhuma (primeira wave)  
**Entrega:** Ambiente de desenvolvimento funcional

---

## 🎯 Objetivo da Wave

Ao final desta wave, devemos ter:
- ✅ Docker Compose subindo toda a stack
- ✅ API Node.js respondendo health check
- ✅ PostgreSQL conectado e com migrations
- ✅ App React Native iniciando e navegando

---

## 📋 CHECKLIST DE TAREFAS

### 🐳 Infraestrutura (Épico 0)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 0.1 | Criar `docker-compose.yml` com PostgreSQL + Node.js | 🔴 P0 |
| [ ] | 0.2 | Criar `Dockerfile` para API Node.js | 🔴 P0 |
| [ ] | 0.3 | Criar script de migrations iniciais | 🔴 P0 |
| [ ] | 0.4 | Criar `.env.example` com variáveis necessárias | 🔴 P0 |
| [ ] | 0.5 | Configurar volumes para persistência de dados | 🟠 P1 |

### 🏗️ Back-end Setup (Épico 1)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 1.1 | Inicializar projeto Node.js com Express | 🔴 P0 |
| [ ] | 1.2 | Criar estrutura de pastas (controllers, services, repositories) | 🔴 P0 |
| [ ] | 1.3 | Configurar Prisma ORM com PostgreSQL | 🔴 P0 |
| [ ] | 1.4 | Criar middleware de tratamento de erros | 🟠 P1 |
| [ ] | 1.5 | Configurar CORS | 🔴 P0 |
| [ ] | 1.6 | Adicionar logger (Pino/Winston) | 🟡 P2 |
| [ ] | 1.7 | Configurar validação com Zod | 🟠 P1 |

### 📱 Mobile Setup (Épico 6)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 6.1 | Inicializar projeto Expo/React Native | 🔴 P0 |
| [ ] | 6.2 | Criar estrutura de pastas (screens, components, services) | 🔴 P0 |
| [ ] | 6.3 | Configurar React Navigation (Stack + Tabs) | 🔴 P0 |
| [ ] | 6.4 | Criar service de API com Axios | 🔴 P0 |
| [ ] | 6.5 | Configurar variáveis de ambiente (API_URL) | 🟠 P1 |

---

## 📁 Estrutura de Pastas Esperada

### Back-end
```
backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   └── app.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── Dockerfile
├── package.json
├── tsconfig.json
└── .env.example
```

### Mobile
```
mobile/
├── src/
│   ├── screens/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── contexts/
│   ├── navigation/
│   ├── theme/
│   └── utils/
├── App.tsx
├── app.json
└── package.json
```

### Root
```
/
├── docker-compose.yml
├── backend/
├── mobile/
├── discovery/
└── README.md
```

---

## 🔧 Configurações Técnicas

### docker-compose.yml (exemplo)
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
    depends_on:
      - postgres

volumes:
  postgres_data:
```

### .env.example
```env
# Database
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=blog_db
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/blog_db

# API
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
```

---

## ✅ Critérios de Aceite

- [ ] `docker-compose up` sobe PostgreSQL e API sem erros
- [ ] `GET /health` retorna `{ status: "ok" }`
- [ ] Prisma conecta ao PostgreSQL
- [ ] Migrations executam corretamente
- [ ] App mobile inicia no emulador/device
- [ ] Navegação entre telas funciona
- [ ] API service consegue fazer request (mesmo que 404)

---

## 🚧 Possíveis Bloqueios

| Risco | Mitigação |
|-------|-----------|
| Problemas com Docker no Windows | Usar WSL2 ou Expo Go para mobile |
| Versões incompatíveis de Node | Usar nvm e fixar versão no `.nvmrc` |
| Conflitos de porta | Configurar portas alternativas no .env |

---

## 📝 Notas de Implementação

### Comandos úteis

```bash
# Subir ambiente
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Rodar migrations
npx prisma migrate dev

# Iniciar mobile
cd mobile && npx expo start
```

---

## ➡️ Próxima Wave

Após completar a Wave 1, siga para:
**[Wave 2 — Autenticação](./wave-2-authentication.md)**

---

*Status: ⏳ Não iniciada*

