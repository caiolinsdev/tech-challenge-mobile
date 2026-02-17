# 🌊 WAVE 5 — PROFESSORES

> CRUD completo de professores (gestão de docentes)

**Duração estimada:** 2-3 dias  
**Dependências:** Wave 4 (Admin Posts)  
**Entrega:** Professores podem gerenciar outros professores

---

## 🎯 Objetivo da Wave

Ao final desta wave, devemos ter:
- ✅ Listagem paginada de professores
- ✅ Cadastro de novos professores
- ✅ Edição de professores existentes
- ✅ Exclusão de professores
- ✅ Validação de formulários

---

## 📋 CHECKLIST DE TAREFAS

### 👨‍🏫 Back-end: Professores (Épico 4)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 4.1 | Criar endpoint `GET /professors` (listagem paginada) | 🔴 P0 |
| [ ] | 4.2 | Criar endpoint `GET /professors/:id` (detalhes) | 🟠 P1 |
| [ ] | 4.3 | Criar endpoint `POST /professors` (apenas professor) | 🔴 P0 |
| [ ] | 4.4 | Criar endpoint `PUT /professors/:id` (apenas professor) | 🔴 P0 |
| [ ] | 4.5 | Criar endpoint `DELETE /professors/:id` (apenas professor) | 🔴 P0 |
| [ ] | 4.6 | Impedir exclusão do próprio usuário logado | 🟠 P1 |

### 📱 Mobile: Professores (Épico 10)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 10.1 | Criar tela de listagem de professores (ProfessorsScreen) | 🔴 P0 |
| [ ] | 10.2 | Criar componente ProfessorCard com ações | 🟠 P1 |
| [ ] | 10.3 | Criar tela de criação (CreateProfessorScreen) | 🔴 P0 |
| [ ] | 10.4 | Criar tela de edição (EditProfessorScreen) | 🔴 P0 |
| [ ] | 10.5 | Implementar exclusão com confirmação | 🔴 P0 |
| [ ] | 10.6 | Validação de formulário (email, campos obrigatórios) | 🟠 P1 |

---

## 🔌 Endpoints

### GET /professors

**Headers:**
```
Authorization: Bearer <token>
```

**Query Params:**
- `page` (default: 1)
- `limit` (default: 10)

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Professor João",
      "email": "joao@email.com",
      "bio": "Professor de matemática",
      "subject": "Matemática",
      "postsCount": 15,
      "createdAt": "2026-01-10T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### GET /professors/:id

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Professor João",
  "email": "joao@email.com",
  "bio": "Professor de matemática com 10 anos de experiência",
  "subject": "Matemática",
  "posts": [
    { "id": "uuid", "title": "Introdução à Álgebra" }
  ],
  "createdAt": "2026-01-10T10:00:00Z"
}
```

### POST /professors

**Request:**
```json
{
  "name": "Novo Professor",
  "email": "novo@email.com",
  "password": "senha123",
  "bio": "Descrição do professor",
  "subject": "Disciplina"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "Novo Professor",
  "email": "novo@email.com",
  "bio": "Descrição do professor",
  "subject": "Disciplina",
  "createdAt": "2026-02-17T10:30:00Z"
}
```

**Validações:**
- Email único
- Senha mínimo 6 caracteres
- Nome obrigatório

### PUT /professors/:id

**Request:**
```json
{
  "name": "Nome Atualizado",
  "bio": "Bio atualizada",
  "subject": "Nova Disciplina"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Nome Atualizado",
  "bio": "Bio atualizada",
  "subject": "Nova Disciplina",
  "updatedAt": "2026-02-17T11:00:00Z"
}
```

### DELETE /professors/:id

**Response (204):**
No content

**Response (400):**
```json
{
  "error": "Você não pode excluir a si mesmo"
}
```

**Response (409):**
```json
{
  "error": "Professor possui posts associados. Exclua os posts primeiro."
}
```

---

## 📱 Telas Mobile

### ProfessorsScreen (Listagem)

```
┌─────────────────────────────┐
│  👨‍🏫 Professores        ＋   │
├─────────────────────────────┤
│                             │
│  ┌───────────────────────┐  │
│  │ 👤 Professor João     │  │
│  │    joao@email.com     │  │
│  │    Matemática         │  │
│  │            ✏️  🗑️     │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 👤 Professora Maria   │  │
│  │    maria@email.com    │  │
│  │    Português          │  │
│  │            ✏️  🗑️     │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 👤 Professor Carlos   │  │
│  │    carlos@email.com   │  │
│  │    História           │  │
│  │            ✏️  🗑️     │  │
│  └───────────────────────┘  │
│                             │
│       Página 1 de 3         │
│        ◀️  ▶️               │
└─────────────────────────────┘
```

### CreateProfessorScreen

```
┌─────────────────────────────┐
│  ←  Novo Professor   Salvar │
├─────────────────────────────┤
│                             │
│  Nome completo *            │
│  ┌───────────────────────┐  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  Email *                    │
│  ┌───────────────────────┐  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  Senha *                    │
│  ┌───────────────────────┐  │
│  │                   👁️  │  │
│  └───────────────────────┘  │
│                             │
│  Confirmar senha *          │
│  ┌───────────────────────┐  │
│  │                   👁️  │  │
│  └───────────────────────┘  │
│                             │
│  Disciplina                 │
│  ┌───────────────────────┐  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  Bio                        │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │    CADASTRAR          │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### EditProfessorScreen

```
┌─────────────────────────────┐
│  ←  Editar Professor Salvar │
├─────────────────────────────┤
│                             │
│  Nome completo *            │
│  ┌───────────────────────┐  │
│  │ Professor João        │  │
│  └───────────────────────┘  │
│                             │
│  Email (não editável)       │
│  ┌───────────────────────┐  │
│  │ joao@email.com    🔒  │  │
│  └───────────────────────┘  │
│                             │
│  Disciplina                 │
│  ┌───────────────────────┐  │
│  │ Matemática            │  │
│  └───────────────────────┘  │
│                             │
│  Bio                        │
│  ┌───────────────────────┐  │
│  │ Professor com 10 anos │  │
│  │ de experiência...     │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │    SALVAR ALTERAÇÕES  │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

---

## 🔧 Implementação

### Validação de Formulário

```typescript
interface ProfessorFormData {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  subject?: string;
  bio?: string;
}

const validateProfessor = (data: ProfessorFormData, isEdit = false) => {
  const errors: Record<string, string> = {};
  
  if (!data.name.trim()) {
    errors.name = 'Nome é obrigatório';
  }
  
  if (!isEdit) {
    if (!data.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!data.password) {
      errors.password = 'Senha é obrigatória';
    } else if (data.password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Senhas não conferem';
    }
  }
  
  return errors;
};
```

### Service de Professores

```typescript
// services/professors.ts
export const professorsService = {
  list: (params: PaginationParams) => 
    api.get('/professors', { params }),
  
  getById: (id: string) => 
    api.get(`/professors/${id}`),
  
  create: (data: CreateProfessorData) => 
    api.post('/professors', data),
  
  update: (id: string, data: UpdateProfessorData) => 
    api.put(`/professors/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/professors/${id}`),
};
```

### Controller (Back-end)

```typescript
// controllers/professors.controller.ts
export const deleteProfessor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  // Buscar professor
  const professor = await prisma.professor.findUnique({
    where: { id },
    include: { user: true }
  });
  
  if (!professor) {
    return res.status(404).json({ error: 'Professor não encontrado' });
  }
  
  // Impedir auto-exclusão
  if (professor.user.id === userId) {
    return res.status(400).json({ error: 'Você não pode excluir a si mesmo' });
  }
  
  // Verificar posts associados
  const postsCount = await prisma.post.count({
    where: { authorId: id }
  });
  
  if (postsCount > 0) {
    return res.status(409).json({ 
      error: `Professor possui ${postsCount} posts. Exclua os posts primeiro.`
    });
  }
  
  // Excluir professor e usuário
  await prisma.$transaction([
    prisma.professor.delete({ where: { id } }),
    prisma.user.delete({ where: { id: professor.userId } })
  ]);
  
  return res.status(204).send();
};
```

---

## ✅ Critérios de Aceite

### Back-end
- [ ] `GET /professors` retorna lista paginada
- [ ] `GET /professors/:id` retorna detalhes
- [ ] `POST /professors` cria professor com validação
- [ ] `PUT /professors/:id` atualiza professor
- [ ] `DELETE /professors/:id` remove professor
- [ ] Email único é validado
- [ ] Não permite excluir a si mesmo
- [ ] Verifica posts associados antes de excluir

### Mobile
- [ ] Lista professores com paginação
- [ ] Formulário de criação valida campos
- [ ] Formulário de edição carrega dados
- [ ] Confirmação antes de excluir
- [ ] Feedback de sucesso/erro
- [ ] Apenas professores têm acesso às telas

---

## 🎨 Componente ProfessorCard

```tsx
interface ProfessorCardProps {
  professor: Professor;
  onEdit: () => void;
  onDelete: () => void;
}

function ProfessorCard({ professor, onEdit, onDelete }: ProfessorCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {professor.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      
      <View style={styles.info}>
        <Text style={styles.name}>{professor.name}</Text>
        <Text style={styles.email}>{professor.email}</Text>
        {professor.subject && (
          <Text style={styles.subject}>{professor.subject}</Text>
        )}
      </View>
      
      <View style={styles.actions}>
        <IconButton icon="pencil" onPress={onEdit} />
        <IconButton icon="trash" onPress={onDelete} color="red" />
      </View>
    </View>
  );
}
```

---

## 🚧 Possíveis Bloqueios

| Risco | Mitigação |
|-------|-----------|
| Exclusão em cascata complexa | Transaction no Prisma |
| Email duplicado | Tratar erro unique constraint |
| Paginação inconsistente | Usar cursor-based pagination |

---

## ➡️ Próxima Wave

Após completar a Wave 5, siga para:
**[Wave 6 — Estudantes](./wave-6-students.md)**

---

*Status: ⏳ Não iniciada*

