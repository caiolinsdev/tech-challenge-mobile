# 🌊 WAVE 4 — ADMIN POSTS

> Gestão administrativa de postagens (criar, editar, excluir)

**Duração estimada:** 2-3 dias  
**Dependências:** Wave 3 (Posts Core)  
**Entrega:** Professores podem gerenciar posts completos

---

## 🎯 Objetivo da Wave

Ao final desta wave, devemos ter:
- ✅ Professor pode criar novos posts
- ✅ Professor pode editar posts existentes
- ✅ Professor pode excluir posts
- ✅ Tela administrativa com lista de posts
- ✅ Alunos não têm acesso às funções de admin

---

## 📋 CHECKLIST DE TAREFAS

### 📝 Back-end: CRUD Posts (Épico 3 - Escrita)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 3.5 | Criar endpoint `POST /posts` (apenas professor) | 🔴 P0 |
| [ ] | 3.6 | Criar endpoint `PUT /posts/:id` (apenas professor) | 🔴 P0 |
| [ ] | 3.7 | Criar endpoint `DELETE /posts/:id` (apenas professor) | 🔴 P0 |
| [ ] | 3.8 | Validar que apenas autor pode editar/excluir | 🟠 P1 |

### ⚙️ Mobile: Admin Posts (Épico 9)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 9.1 | Criar tela de criação de post (CreatePostScreen) | 🔴 P0 |
| [ ] | 9.2 | Implementar validação de campos no formulário | 🟠 P1 |
| [ ] | 9.3 | Criar tela de edição de post (EditPostScreen) | 🔴 P0 |
| [ ] | 9.4 | Implementar confirmação de exclusão (modal/alert) | 🟠 P1 |
| [ ] | 9.5 | Criar tela administrativa (AdminPostsScreen) | 🔴 P0 |
| [ ] | 9.6 | Implementar feedback de sucesso/erro (toast) | 🟠 P1 |
| [ ] | 9.7 | Ocultar ações de admin para alunos | 🔴 P0 |

---

## 🔌 Endpoints

### POST /posts

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "Novo Post",
  "content": "Conteúdo completo do post...",
  "description": "Breve resumo do post"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "title": "Novo Post",
  "content": "Conteúdo completo do post...",
  "description": "Breve resumo do post",
  "author": {
    "id": "uuid",
    "name": "Professor João"
  },
  "createdAt": "2026-02-17T10:30:00Z"
}
```

**Response (403):**
```json
{
  "error": "Apenas professores podem criar posts"
}
```

### PUT /posts/:id

**Request:**
```json
{
  "title": "Título Atualizado",
  "content": "Conteúdo atualizado...",
  "description": "Descrição atualizada"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Título Atualizado",
  "content": "Conteúdo atualizado...",
  "updatedAt": "2026-02-17T11:00:00Z"
}
```

### DELETE /posts/:id

**Response (204):**
No content

**Response (403):**
```json
{
  "error": "Você não tem permissão para excluir este post"
}
```

---

## 📱 Telas Mobile

### CreatePostScreen

```
┌─────────────────────────────┐
│  ←  Novo Post        Salvar │
├─────────────────────────────┤
│                             │
│  Título *                   │
│  ┌───────────────────────┐  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  Descrição                  │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  Conteúdo *                 │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │                       │  │
│  │                       │  │
│  │                       │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │    PUBLICAR POST      │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### AdminPostsScreen

```
┌─────────────────────────────┐
│  📋 Gerenciar Posts    ＋   │
├─────────────────────────────┤
│                             │
│  ┌───────────────────────┐  │
│  │ Post 1                │  │
│  │ Prof. João • 2h       │  │
│  │            ✏️  🗑️     │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Post 2                │  │
│  │ Prof. Maria • 1d      │  │
│  │            ✏️  🗑️     │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Post 3                │  │
│  │ Prof. João • 3d       │  │
│  │            ✏️  🗑️     │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### Modal de Confirmação

```
┌─────────────────────────────┐
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │   ⚠️ Excluir Post?    │  │
│  │                       │  │
│  │   Esta ação não pode  │  │
│  │   ser desfeita.       │  │
│  │                       │  │
│  │  ┌─────┐  ┌─────────┐ │  │
│  │  │Cancel│  │ Excluir │ │  │
│  │  └─────┘  └─────────┘ │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

---

## 🔧 Implementação

### Validação de Formulário

```typescript
interface PostFormData {
  title: string;
  description: string;
  content: string;
}

const validatePost = (data: PostFormData) => {
  const errors: Record<string, string> = {};
  
  if (!data.title.trim()) {
    errors.title = 'Título é obrigatório';
  }
  
  if (data.title.length > 100) {
    errors.title = 'Título deve ter no máximo 100 caracteres';
  }
  
  if (!data.content.trim()) {
    errors.content = 'Conteúdo é obrigatório';
  }
  
  if (data.content.length < 50) {
    errors.content = 'Conteúdo deve ter pelo menos 50 caracteres';
  }
  
  return errors;
};
```

### Hook useCreatePost

```typescript
function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createPost = async (data: PostFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/posts', data);
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createPost, isLoading, error };
}
```

### Controle de Visibilidade por Role

```tsx
function HomeScreen() {
  const { user } = useAuth();
  const isProfessor = user?.role === 'PROFESSOR';

  return (
    <View>
      <PostsList />
      
      {isProfessor && (
        <FAB
          icon="plus"
          onPress={() => navigation.navigate('CreatePost')}
        />
      )}
    </View>
  );
}
```

### Middleware de Autorização (Back-end)

```typescript
// middleware/authorize.ts
export const authorize = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Sem permissão' });
    }

    next();
  };
};

// routes/posts.ts
router.post('/posts', authenticate, authorize('PROFESSOR'), createPost);
router.put('/posts/:id', authenticate, authorize('PROFESSOR'), updatePost);
router.delete('/posts/:id', authenticate, authorize('PROFESSOR'), deletePost);
```

---

## 🎨 Navegação

### Adicionar ao Navigator

```tsx
// Apenas visível para professores
{user?.role === 'PROFESSOR' && (
  <>
    <Stack.Screen name="CreatePost" component={CreatePostScreen} />
    <Stack.Screen name="EditPost" component={EditPostScreen} />
    <Stack.Screen name="AdminPosts" component={AdminPostsScreen} />
  </>
)}
```

### Bottom Tab para Admin

```tsx
<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  
  {isProfessor && (
    <Tab.Screen 
      name="Admin" 
      component={AdminPostsScreen}
      options={{ tabBarIcon: /* settings icon */ }}
    />
  )}
  
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
```

---

## ✅ Critérios de Aceite

### Back-end
- [ ] `POST /posts` cria post (apenas professor)
- [ ] `PUT /posts/:id` atualiza post
- [ ] `DELETE /posts/:id` remove post
- [ ] Alunos recebem 403 ao tentar criar/editar/excluir
- [ ] Validação de campos funciona

### Mobile
- [ ] Tela de criação com validação de campos
- [ ] Tela de edição carrega dados existentes
- [ ] Confirmação antes de excluir
- [ ] Feedback visual (toast) após operações
- [ ] Botões de admin invisíveis para alunos
- [ ] Lista atualiza após criar/editar/excluir

---

## 🚧 Possíveis Bloqueios

| Risco | Mitigação |
|-------|-----------|
| Editor de texto complexo | Usar TextInput multiline simples |
| Perda de dados ao navegar | Confirmar antes de sair se form dirty |
| Conflitos de edição | Implementar optimistic update |

---

## 📝 Notas

- Considerar usar um editor Markdown (react-native-markdown-editor) para conteúdo rico
- O botão de criação pode ser um FAB (Floating Action Button) na Home
- Após criar/editar, navegar de volta e mostrar toast de sucesso

---

## ➡️ Próxima Wave

Após completar a Wave 4, siga para:
**[Wave 5 — Professores](./wave-5-professors.md)**

---

*Status: ⏳ Não iniciada*

