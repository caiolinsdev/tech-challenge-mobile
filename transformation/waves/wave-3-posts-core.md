# 🌊 WAVE 3 — POSTS CORE

> Visualização de posts (listagem, busca e leitura)

**Duração estimada:** 3-4 dias  
**Dependências:** Wave 2 (Autenticação)  
**Entrega:** Usuários conseguem visualizar e buscar posts

---

## 🎯 Objetivo da Wave

Ao final desta wave, devemos ter:
- ✅ Listagem paginada de posts
- ✅ Busca por palavras-chave funcionando
- ✅ Tela de leitura de post completo
- ✅ Pull-to-refresh e infinite scroll
- ✅ Estados de loading e empty

---

## 📋 CHECKLIST DE TAREFAS

### 📝 Back-end: Posts (Épico 3 - Leitura)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 3.1 | Criar modelo `Post` no Prisma | 🔴 P0 |
| [ ] | 3.2 | Criar endpoint `GET /posts` (listagem paginada) | 🔴 P0 |
| [ ] | 3.3 | Criar endpoint `GET /posts/:id` (detalhes) | 🔴 P0 |
| [ ] | 3.4 | Criar endpoint `GET /posts/search?q=` (busca) | 🟠 P1 |
| [ ] | 3.5 | Criar seed de posts para testes | 🟠 P1 |

### 📖 Mobile: Visualização (Épico 8)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 8.1 | Criar tela principal (HomeScreen) com FlatList | 🔴 P0 |
| [ ] | 8.2 | Criar componente PostCard | 🔴 P0 |
| [ ] | 8.3 | Implementar campo de busca com debounce | 🟠 P1 |
| [ ] | 8.4 | Implementar pull-to-refresh | 🟠 P1 |
| [ ] | 8.5 | Implementar paginação infinita | 🟠 P1 |
| [ ] | 8.6 | Criar tela de leitura do post (PostDetailScreen) | 🔴 P0 |
| [ ] | 8.7 | Criar componentes Loading e EmptyState | 🟠 P1 |

---

## 🗃️ Modelagem de Dados

### Prisma Schema

```prisma
model Post {
  id          String   @id @default(uuid())
  title       String
  content     String
  description String?  // Resumo para listagem
  authorId    String
  author      Professor @relation(fields: [authorId], references: [id])
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  comments    Comment[]
}

// Opcional - para Wave 7
model Comment {
  id        String   @id @default(uuid())
  content   String
  postId    String
  post      Post     @relation(fields: [postId], references: [id])
  userId    String
  createdAt DateTime @default(now())
}
```

---

## 🔌 Endpoints

### GET /posts

**Query Params:**
- `page` (default: 1)
- `limit` (default: 10)
- `orderBy` (default: createdAt)
- `order` (default: desc)

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Título do Post",
      "description": "Breve descrição do post...",
      "author": {
        "id": "uuid",
        "name": "Professor João"
      },
      "createdAt": "2026-02-15T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### GET /posts/:id

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Título do Post",
  "content": "Conteúdo completo do post em markdown ou HTML...",
  "description": "Breve descrição",
  "author": {
    "id": "uuid",
    "name": "Professor João",
    "bio": "Professor de matemática"
  },
  "createdAt": "2026-02-15T10:30:00Z",
  "updatedAt": "2026-02-15T10:30:00Z"
}
```

### GET /posts/search

**Query Params:**
- `q` - termo de busca (obrigatório)
- `page`, `limit`

**Response:**
Mesmo formato do `GET /posts`

**Lógica de busca:**
- Buscar em `title` e `content`
- Case insensitive
- Usar `ILIKE` no PostgreSQL

---

## 📱 Telas Mobile

### HomeScreen (Listagem)

```
┌─────────────────────────────┐
│  📚 BlogApp          👤     │
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │ 🔍 Buscar posts...    │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │ Título do Post 1      │  │
│  │ Prof. João • 2h atrás │  │
│  │ Breve descrição do... │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Título do Post 2      │  │
│  │ Prof. Maria • 1d      │  │
│  │ Outro resumo aqui...  │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Título do Post 3      │  │
│  │ Prof. João • 3d       │  │
│  │ Mais um resumo...     │  │
│  └───────────────────────┘  │
│                             │
│       ⏳ Carregando...      │
└─────────────────────────────┘
```

### PostDetailScreen (Leitura)

```
┌─────────────────────────────┐
│  ←  Título do Post          │
├─────────────────────────────┤
│                             │
│  Título do Post             │
│  ═════════════════════════  │
│                             │
│  👤 Professor João          │
│  📅 15 de Fev, 2026         │
│                             │
│  ─────────────────────────  │
│                             │
│  Lorem ipsum dolor sit      │
│  amet, consectetur          │
│  adipiscing elit. Sed do    │
│  eiusmod tempor incididunt  │
│  ut labore et dolore        │
│  magna aliqua.              │
│                             │
│  Ut enim ad minim veniam,   │
│  quis nostrud exercitation  │
│  ullamco laboris nisi ut    │
│  aliquip ex ea commodo...   │
│                             │
└─────────────────────────────┘
```

### EmptyState

```
┌─────────────────────────────┐
│                             │
│                             │
│          📭                 │
│                             │
│    Nenhum post encontrado   │
│                             │
│    Tente buscar por outro   │
│    termo                    │
│                             │
│                             │
└─────────────────────────────┘
```

---

## 🔧 Implementação

### Hook usePosts

```typescript
interface UsePostsOptions {
  search?: string;
  page?: number;
  limit?: number;
}

function usePosts(options: UsePostsOptions) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = async () => { /* ... */ };
  const loadMore = async () => { /* ... */ };
  const refresh = async () => { /* ... */ };

  return { posts, isLoading, hasMore, error, loadMore, refresh };
}
```

### Debounce para Busca

```typescript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  fetchPosts({ search: debouncedSearch });
}, [debouncedSearch]);
```

### FlatList com Infinite Scroll

```tsx
<FlatList
  data={posts}
  renderItem={({ item }) => <PostCard post={item} />}
  keyExtractor={(item) => item.id}
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
  refreshControl={
    <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
  }
  ListEmptyComponent={<EmptyState />}
  ListFooterComponent={hasMore ? <LoadingMore /> : null}
/>
```

---

## 🎨 Componentes

### PostCard

```tsx
interface PostCardProps {
  post: {
    id: string;
    title: string;
    description: string;
    author: { name: string };
    createdAt: string;
  };
  onPress: () => void;
}

function PostCard({ post, onPress }: PostCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.meta}>
        {post.author.name} • {formatDate(post.createdAt)}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {post.description}
      </Text>
    </TouchableOpacity>
  );
}
```

---

## ✅ Critérios de Aceite

### Back-end
- [ ] `GET /posts` retorna lista paginada
- [ ] `GET /posts/:id` retorna post completo
- [ ] `GET /posts/search?q=termo` filtra corretamente
- [ ] Paginação funciona (page, limit, total)
- [ ] Posts ordenados por data (mais recentes primeiro)

### Mobile
- [ ] Lista exibe posts com título, autor e descrição
- [ ] Pull-to-refresh atualiza a lista
- [ ] Scroll infinito carrega mais posts
- [ ] Campo de busca filtra posts
- [ ] Toque no post abre tela de detalhes
- [ ] Loading state exibido durante carregamento
- [ ] Empty state exibido quando não há posts

---

## 🌱 Seed de Dados

```typescript
// prisma/seed.ts
const posts = [
  {
    title: 'Introdução ao React Native',
    description: 'Aprenda os conceitos básicos do React Native...',
    content: `
# Introdução ao React Native

React Native é um framework para desenvolvimento mobile...

## Primeiros passos

1. Instale o Expo CLI
2. Crie um novo projeto
3. Execute no emulador

## Conclusão

React Native é uma excelente escolha para desenvolvimento mobile.
    `,
    published: true,
  },
  // ... mais posts
];
```

---

## 🚧 Possíveis Bloqueios

| Risco | Mitigação |
|-------|-----------|
| Performance com muitos posts | Implementar paginação corretamente |
| Busca lenta | Adicionar índices no PostgreSQL |
| FlatList não re-renderiza | Usar keyExtractor correto |

---

## ➡️ Próxima Wave

Após completar a Wave 3, siga para:
**[Wave 4 — Admin Posts](./wave-4-admin-posts.md)**

---

*Status: ⏳ Não iniciada*

