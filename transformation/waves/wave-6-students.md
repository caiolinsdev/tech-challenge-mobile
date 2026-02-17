# 🌊 WAVE 6 — ESTUDANTES

> CRUD completo de estudantes (gestão de alunos)

**Duração estimada:** 2 dias  
**Dependências:** Wave 5 (Professores)  
**Entrega:** Professores podem gerenciar estudantes

---

## 🎯 Objetivo da Wave

Ao final desta wave, devemos ter:
- ✅ Listagem paginada de estudantes
- ✅ Cadastro de novos estudantes
- ✅ Edição de estudantes existentes
- ✅ Exclusão de estudantes
- ✅ Reutilização de componentes da Wave 5

---

## 📋 CHECKLIST DE TAREFAS

### 🎓 Back-end: Estudantes (Épico 5)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 5.1 | Criar endpoint `GET /students` (listagem paginada) | 🔴 P0 |
| [ ] | 5.2 | Criar endpoint `GET /students/:id` (detalhes) | 🟠 P1 |
| [ ] | 5.3 | Criar endpoint `POST /students` (apenas professor) | 🔴 P0 |
| [ ] | 5.4 | Criar endpoint `PUT /students/:id` (apenas professor) | 🔴 P0 |
| [ ] | 5.5 | Criar endpoint `DELETE /students/:id` (apenas professor) | 🔴 P0 |

### 📱 Mobile: Estudantes (Épico 11)

| Status | ID | Tarefa | Prioridade |
|--------|-----|--------|------------|
| [ ] | 11.1 | Criar tela de listagem de estudantes (StudentsScreen) | 🔴 P0 |
| [ ] | 11.2 | Reutilizar/adaptar UserCard para estudantes | 🟠 P1 |
| [ ] | 11.3 | Criar tela de criação (CreateStudentScreen) | 🔴 P0 |
| [ ] | 11.4 | Criar tela de edição (EditStudentScreen) | 🔴 P0 |
| [ ] | 11.5 | Reutilizar componentes de formulário da Wave 5 | 🟠 P1 |
| [ ] | 11.6 | Implementar exclusão com confirmação | 🔴 P0 |

---

## 🔌 Endpoints

### GET /students

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
      "name": "Aluno João",
      "email": "aluno.joao@email.com",
      "enrollment": "2026001",
      "grade": "3º Ano",
      "createdAt": "2026-02-01T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### GET /students/:id

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Aluno João",
  "email": "aluno.joao@email.com",
  "enrollment": "2026001",
  "grade": "3º Ano",
  "createdAt": "2026-02-01T10:00:00Z",
  "updatedAt": "2026-02-15T14:30:00Z"
}
```

### POST /students

**Request:**
```json
{
  "name": "Novo Aluno",
  "email": "novo.aluno@email.com",
  "password": "senha123",
  "enrollment": "2026050",
  "grade": "1º Ano"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "Novo Aluno",
  "email": "novo.aluno@email.com",
  "enrollment": "2026050",
  "grade": "1º Ano",
  "createdAt": "2026-02-17T10:30:00Z"
}
```

### PUT /students/:id

**Request:**
```json
{
  "name": "Nome Atualizado",
  "enrollment": "2026051",
  "grade": "2º Ano"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Nome Atualizado",
  "enrollment": "2026051",
  "grade": "2º Ano",
  "updatedAt": "2026-02-17T11:00:00Z"
}
```

### DELETE /students/:id

**Response (204):**
No content

---

## 📱 Telas Mobile

### StudentsScreen (Listagem)

```
┌─────────────────────────────┐
│  🎓 Estudantes         ＋   │
├─────────────────────────────┤
│                             │
│  🔍 Buscar aluno...         │
│                             │
│  ┌───────────────────────┐  │
│  │ 👤 Aluno João         │  │
│  │    Mat: 2026001       │  │
│  │    3º Ano             │  │
│  │            ✏️  🗑️     │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 👤 Aluna Maria        │  │
│  │    Mat: 2026002       │  │
│  │    2º Ano             │  │
│  │            ✏️  🗑️     │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 👤 Aluno Pedro        │  │
│  │    Mat: 2026003       │  │
│  │    1º Ano             │  │
│  │            ✏️  🗑️     │  │
│  └───────────────────────┘  │
│                             │
│       1  2  3  4  5  →      │
└─────────────────────────────┘
```

### CreateStudentScreen

```
┌─────────────────────────────┐
│  ←  Novo Estudante   Salvar │
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
│  Matrícula                  │
│  ┌───────────────────────┐  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  Série/Turma                │
│  ┌───────────────────────┐  │
│  │ Selecione...       ▼  │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │    CADASTRAR          │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

---

## 🔧 Implementação

### Reutilização de Componentes

```typescript
// components/UserForm.tsx - Formulário genérico
interface UserFormProps {
  type: 'professor' | 'student';
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  isLoading?: boolean;
}

function UserForm({ type, initialData, onSubmit, isLoading }: UserFormProps) {
  return (
    <ScrollView>
      <Input label="Nome completo" required />
      <Input label="Email" keyboardType="email-address" required />
      
      {!initialData && (
        <>
          <Input label="Senha" secureTextEntry required />
          <Input label="Confirmar senha" secureTextEntry required />
        </>
      )}
      
      {type === 'professor' && (
        <>
          <Input label="Disciplina" />
          <Input label="Bio" multiline />
        </>
      )}
      
      {type === 'student' && (
        <>
          <Input label="Matrícula" />
          <Select label="Série/Turma" options={gradeOptions} />
        </>
      )}
      
      <Button loading={isLoading} onPress={handleSubmit}>
        {initialData ? 'Salvar Alterações' : 'Cadastrar'}
      </Button>
    </ScrollView>
  );
}
```

### Service de Estudantes

```typescript
// services/students.ts
export const studentsService = {
  list: (params: PaginationParams) => 
    api.get('/students', { params }),
  
  getById: (id: string) => 
    api.get(`/students/${id}`),
  
  create: (data: CreateStudentData) => 
    api.post('/students', data),
  
  update: (id: string, data: UpdateStudentData) => 
    api.put(`/students/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/students/${id}`),
};
```

### Hook Genérico para CRUD

```typescript
// hooks/useCRUD.ts
function useCRUD<T>(service: CRUDService<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);

  const fetchItems = useCallback(async (params?: PaginationParams) => {
    setIsLoading(true);
    try {
      const response = await service.list(params);
      setItems(response.data);
      setPagination(response.meta);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const createItem = async (data: Partial<T>) => { /* ... */ };
  const updateItem = async (id: string, data: Partial<T>) => { /* ... */ };
  const deleteItem = async (id: string) => { /* ... */ };

  return {
    items,
    isLoading,
    error,
    pagination,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
}

// Uso:
const { items: students, ...rest } = useCRUD(studentsService);
const { items: professors, ...rest } = useCRUD(professorsService);
```

---

## ✅ Critérios de Aceite

### Back-end
- [ ] `GET /students` retorna lista paginada
- [ ] `GET /students/:id` retorna detalhes
- [ ] `POST /students` cria estudante
- [ ] `PUT /students/:id` atualiza estudante
- [ ] `DELETE /students/:id` remove estudante
- [ ] Apenas professores têm acesso às rotas de escrita
- [ ] Email único validado

### Mobile
- [ ] Lista estudantes com paginação
- [ ] Formulário de criação valida campos
- [ ] Formulário de edição carrega dados
- [ ] Confirmação antes de excluir
- [ ] Feedback de sucesso/erro
- [ ] Componentes reutilizados da Wave 5

---

## 🎨 Opções de Série/Turma

```typescript
const gradeOptions = [
  { value: '1_ano', label: '1º Ano' },
  { value: '2_ano', label: '2º Ano' },
  { value: '3_ano', label: '3º Ano' },
  { value: 'pos', label: 'Pós-Graduação' },
];
```

---

## 📊 Comparação Professor vs Estudante

| Campo | Professor | Estudante |
|-------|-----------|-----------|
| name | ✅ | ✅ |
| email | ✅ | ✅ |
| password | ✅ (criação) | ✅ (criação) |
| bio | ✅ | ❌ |
| subject | ✅ | ❌ |
| enrollment | ❌ | ✅ |
| grade | ❌ | ✅ |

---

## 🚧 Possíveis Bloqueios

| Risco | Mitigação |
|-------|-----------|
| Duplicação de código | Usar componentes e hooks genéricos |
| Inconsistência visual | Manter design system |
| Matrícula duplicada | Validar no back-end |

---

## 📝 Notas

- Esta wave é mais rápida pois reutiliza estrutura da Wave 5
- Foco em manter consistência visual e de código
- Considerar criar tela unificada de "Usuários" com tabs (Professores/Estudantes)

---

## ➡️ Próxima Wave

Após completar a Wave 6, siga para:
**[Wave 7 — Polish & Entrega](./wave-7-polish-delivery.md)**

---

*Status: ⏳ Não iniciada*

