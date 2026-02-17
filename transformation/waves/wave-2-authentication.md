# 🌊 WAVE 2 — AUTENTICAÇÃO

> Sistema de login e controle de acesso end-to-end

**Duração estimada:** 2-3 dias  
**Dependências:** Wave 1 (Fundação)  
**Entrega:** Fluxo completo de autenticação funcionando

---

## 🎯 Objetivo da Wave

Ao final desta wave, devemos ter:
- ✅ Professor consegue fazer login
- ✅ Aluno consegue fazer login
- ✅ Token JWT é gerado e validado
- ✅ Rotas protegidas no back-end
- ✅ Telas protegidas no mobile
- ✅ Diferenciação de roles (professor vs aluno)

---

## 📋 CHECKLIST DE TAREFAS

### 🔐 Back-end: Auth (Épico 2)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 2.1 | Criar modelos no Prisma (User, Professor, Student) | 🔴 P0 |
| [ ] | 2.2 | Criar endpoint `POST /auth/login` | 🔴 P0 |
| [ ] | 2.3 | Implementar geração de JWT | 🔴 P0 |
| [ ] | 2.4 | Criar middleware de autenticação (verificar token) | 🔴 P0 |
| [ ] | 2.5 | Criar middleware de autorização (verificar role) | 🔴 P0 |
| [ ] | 2.6 | Criar endpoint `GET /auth/me` | 🟠 P1 |
| [ ] | 2.7 | Implementar hash de senhas com bcrypt | 🔴 P0 |
| [ ] | 2.8 | Criar seed de usuários para testes | 🟠 P1 |

### 🔑 Mobile: Auth (Épico 7)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 7.1 | Criar tela de Login (UI) | 🔴 P0 |
| [ ] | 7.2 | Integrar com endpoint `/auth/login` | 🔴 P0 |
| [ ] | 7.3 | Armazenar token no AsyncStorage/SecureStore | 🔴 P0 |
| [ ] | 7.4 | Criar AuthContext para gerenciar estado | 🔴 P0 |
| [ ] | 7.5 | Implementar proteção de rotas | 🔴 P0 |
| [ ] | 7.6 | Implementar logout | 🔴 P0 |
| [ ] | 7.7 | Tratar token expirado (interceptor 401) | 🟠 P1 |

---

## 🗃️ Modelagem de Dados

### Prisma Schema

```prisma
enum Role {
  PROFESSOR
  STUDENT
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      Role
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  professor Professor?
  student   Student?
}

model Professor {
  id        String   @id @default(uuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  bio       String?
  subject   String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Student {
  id         String   @id @default(uuid())
  userId     String   @unique
  user       User     @relation(fields: [userId], references: [id])
  enrollment String?
  grade      String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

---

## 🔌 Endpoints

### POST /auth/login

**Request:**
```json
{
  "email": "professor@email.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "professor@email.com",
    "name": "João Silva",
    "role": "PROFESSOR"
  }
}
```

**Response (401):**
```json
{
  "error": "Credenciais inválidas"
}
```

### GET /auth/me

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "professor@email.com",
  "name": "João Silva",
  "role": "PROFESSOR",
  "professor": {
    "id": "uuid",
    "bio": "Professor de matemática",
    "subject": "Matemática"
  }
}
```

---

## 📱 Telas Mobile

### LoginScreen

```
┌─────────────────────────────┐
│                             │
│        📚 BlogApp           │
│                             │
│  ┌───────────────────────┐  │
│  │ Email                 │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Senha            👁️   │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │       ENTRAR          │  │
│  └───────────────────────┘  │
│                             │
│    Esqueceu a senha?        │
│                             │
└─────────────────────────────┘
```

### Fluxo de Navegação

```
┌──────────────┐
│ SplashScreen │ ──► Verifica token salvo
└──────┬───────┘
       │
       ├── Token válido ──► HomeScreen (Posts)
       │
       └── Sem token ──► LoginScreen
                              │
                              ▼
                        HomeScreen
```

---

## 🔧 Implementação

### AuthContext (Mobile)

```typescript
interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Proteger rotas baseado no contexto
function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <SplashScreen />;
  
  return isAuthenticated ? <AppStack /> : <AuthStack />;
}
```

### Axios Interceptor

```typescript
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await signOut();
    }
    return Promise.reject(error);
  }
);
```

---

## ✅ Critérios de Aceite

### Back-end
- [ ] Login com credenciais válidas retorna token JWT
- [ ] Login com credenciais inválidas retorna 401
- [ ] Senhas são armazenadas com hash (bcrypt)
- [ ] Rotas protegidas rejeitam requests sem token
- [ ] Middleware de role diferencia professor de aluno

### Mobile
- [ ] Tela de login exibe campos de email e senha
- [ ] Erro é exibido para credenciais inválidas
- [ ] Token é salvo após login com sucesso
- [ ] App redireciona para Home após login
- [ ] Token persiste ao fechar e reabrir o app
- [ ] Logout limpa token e redireciona para login

---

## 🌱 Seed de Dados

```typescript
// prisma/seed.ts
const users = [
  {
    email: 'professor@email.com',
    password: await bcrypt.hash('123456', 10),
    name: 'Professor Teste',
    role: 'PROFESSOR'
  },
  {
    email: 'aluno@email.com',
    password: await bcrypt.hash('123456', 10),
    name: 'Aluno Teste',
    role: 'STUDENT'
  }
];
```

**Comando:** `npx prisma db seed`

---

## 🚧 Possíveis Bloqueios

| Risco | Mitigação |
|-------|-----------|
| CORS bloqueando requests | Verificar configuração no Express |
| SecureStore não funciona no Expo Go | Usar AsyncStorage como fallback |
| Token expira muito rápido | Configurar expiração adequada (7d) |

---

## ➡️ Próxima Wave

Após completar a Wave 2, siga para:
**[Wave 3 — Posts Core](./wave-3-posts-core.md)**

---

*Status: ⏳ Não iniciada*

