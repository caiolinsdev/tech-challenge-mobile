# BACKLOG DO PROJETO — TECH CHALLENGE FASE 04

> **Stack:** React Native (Expo) | Node.js (Express) | PostgreSQL | Docker

---

## 📋 Legenda

| Símbolo | Significado |
|---------|-------------|
| 🔴 P0   | Crítico — bloqueante para outras tarefas |
| 🟠 P1   | Alta prioridade — essencial para MVP |
| 🟡 P2   | Média prioridade — importante |
| 🟢 P3   | Baixa prioridade — nice to have |
| ⏱️      | Estimativa em Story Points (Fibonacci) |
| 🔗      | Dependência de outra tarefa |

---

## ÉPICO 0 — INFRAESTRUTURA E DEVOPS 🐳

> Setup do ambiente de desenvolvimento e produção

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 0.1 | Configuração do Docker Compose (PostgreSQL + Node.js) | 🔴 P0 | ⏱️ 3 | — |
| 0.2 | Dockerfile para API Node.js | 🔴 P0 | ⏱️ 2 | — |
| 0.3 | Script de inicialização do banco PostgreSQL (migrations) | 🔴 P0 | ⏱️ 3 | 🔗 0.1 |
| 0.4 | Variáveis de ambiente (.env.example) | 🔴 P0 | ⏱️ 1 | — |
| 0.5 | Configuração de volumes para persistência de dados | 🟠 P1 | ⏱️ 2 | 🔗 0.1 |

**Critérios de Aceite:**
- [ ] `docker-compose up` sobe toda a stack
- [ ] PostgreSQL acessível na porta 5432
- [ ] API Node.js acessível na porta 3000
- [ ] Dados persistem após reiniciar containers

---

## ÉPICO 1 — BACK-END: SETUP E ARQUITETURA 🏗️

> Estrutura base da API REST com Node.js

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 1.1 | Inicialização do projeto Node.js (Express/Fastify) | 🔴 P0 | ⏱️ 2 | 🔗 0.1 |
| 1.2 | Estrutura de pastas (controllers, services, repositories, models) | 🔴 P0 | ⏱️ 2 | 🔗 1.1 |
| 1.3 | Configuração do ORM (Prisma ou TypeORM) | 🔴 P0 | ⏱️ 3 | 🔗 1.1 |
| 1.4 | Middleware de tratamento de erros | 🟠 P1 | ⏱️ 2 | 🔗 1.1 |
| 1.5 | Configuração de CORS para aceitar requisições do app | 🔴 P0 | ⏱️ 1 | 🔗 1.1 |
| 1.6 | Logger (Winston/Pino) | 🟡 P2 | ⏱️ 2 | 🔗 1.1 |
| 1.7 | Validação de requests (Zod/Joi) | 🟠 P1 | ⏱️ 2 | 🔗 1.1 |

**Critérios de Aceite:**
- [ ] API responde health check em `/health`
- [ ] Conexão com PostgreSQL estabelecida
- [ ] Migrations executam corretamente
- [ ] Erros retornam JSON padronizado

---

## ÉPICO 2 — BACK-END: AUTENTICAÇÃO E AUTORIZAÇÃO 🔐

> Sistema de login e controle de permissões

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 2.1 | Modelagem das tabelas (professors, students, users) | 🔴 P0 | ⏱️ 3 | 🔗 1.3 |
| 2.2 | Endpoint POST `/auth/login` | 🔴 P0 | ⏱️ 3 | 🔗 2.1 |
| 2.3 | Geração e validação de JWT | 🔴 P0 | ⏱️ 3 | 🔗 2.2 |
| 2.4 | Middleware de autenticação | 🔴 P0 | ⏱️ 2 | 🔗 2.3 |
| 2.5 | Middleware de autorização por role (PROFESSOR/STUDENT) | 🔴 P0 | ⏱️ 2 | 🔗 2.4 |
| 2.6 | Endpoint GET `/auth/me` (dados do usuário logado) | 🟠 P1 | ⏱️ 2 | 🔗 2.4 |
| 2.7 | Hash de senhas (bcrypt) | 🔴 P0 | ⏱️ 1 | 🔗 2.1 |
| 2.8 | Refresh token (opcional) | 🟢 P3 | ⏱️ 3 | 🔗 2.3 |

**Critérios de Aceite:**
- [ ] Professor consegue fazer login e recebe token JWT
- [ ] Aluno consegue fazer login e recebe token JWT
- [ ] Rotas protegidas rejeitam requisições sem token válido
- [ ] Roles são validadas corretamente (professor vs aluno)

---

## ÉPICO 3 — BACK-END: CRUD DE POSTS 📝

> Endpoints para gerenciamento de postagens

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 3.1 | Modelagem da tabela `posts` | 🔴 P0 | ⏱️ 2 | 🔗 1.3 |
| 3.2 | GET `/posts` — listagem paginada | 🔴 P0 | ⏱️ 3 | 🔗 3.1 |
| 3.3 | GET `/posts/:id` — detalhes do post | 🔴 P0 | ⏱️ 2 | 🔗 3.1 |
| 3.4 | GET `/posts/search?q=` — busca por palavra-chave | 🟠 P1 | ⏱️ 3 | 🔗 3.2 |
| 3.5 | POST `/posts` — criação (apenas professor) | 🔴 P0 | ⏱️ 3 | 🔗 2.5, 3.1 |
| 3.6 | PUT `/posts/:id` — edição (apenas professor) | 🔴 P0 | ⏱️ 2 | 🔗 3.5 |
| 3.7 | DELETE `/posts/:id` — exclusão (apenas professor) | 🔴 P0 | ⏱️ 2 | 🔗 3.5 |
| 3.8 | Modelagem e CRUD de comentários (opcional) | 🟢 P3 | ⏱️ 5 | 🔗 3.3 |

**Critérios de Aceite:**
- [ ] Listagem retorna posts com título, autor e descrição
- [ ] Busca filtra posts por título e conteúdo
- [ ] Apenas professores podem criar/editar/excluir
- [ ] Alunos podem apenas visualizar

---

## ÉPICO 4 — BACK-END: CRUD DE PROFESSORES 👨‍🏫

> Endpoints para gerenciamento de docentes

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 4.1 | GET `/professors` — listagem paginada | 🔴 P0 | ⏱️ 2 | 🔗 2.1 |
| 4.2 | GET `/professors/:id` — detalhes | 🟠 P1 | ⏱️ 1 | 🔗 4.1 |
| 4.3 | POST `/professors` — criação (apenas professor) | 🔴 P0 | ⏱️ 3 | 🔗 2.5 |
| 4.4 | PUT `/professors/:id` — edição (apenas professor) | 🔴 P0 | ⏱️ 2 | 🔗 4.3 |
| 4.5 | DELETE `/professors/:id` — exclusão (apenas professor) | 🔴 P0 | ⏱️ 2 | 🔗 4.3 |

**Critérios de Aceite:**
- [ ] Paginação funcionando (page, limit)
- [ ] Validação de dados no cadastro
- [ ] Não permite excluir o próprio usuário logado

---

## ÉPICO 5 — BACK-END: CRUD DE ESTUDANTES 🎓

> Endpoints para gerenciamento de alunos

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 5.1 | GET `/students` — listagem paginada | 🔴 P0 | ⏱️ 2 | 🔗 2.1 |
| 5.2 | GET `/students/:id` — detalhes | 🟠 P1 | ⏱️ 1 | 🔗 5.1 |
| 5.3 | POST `/students` — criação (apenas professor) | 🔴 P0 | ⏱️ 3 | 🔗 2.5 |
| 5.4 | PUT `/students/:id` — edição (apenas professor) | 🔴 P0 | ⏱️ 2 | 🔗 5.3 |
| 5.5 | DELETE `/students/:id` — exclusão (apenas professor) | 🔴 P0 | ⏱️ 2 | 🔗 5.3 |

**Critérios de Aceite:**
- [ ] Mesmos padrões do CRUD de professores
- [ ] Estudantes não podem acessar rotas de criação/edição/exclusão

---

## ÉPICO 6 — MOBILE: SETUP E ARQUITETURA 📱

> Estrutura base do aplicativo React Native

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 6.1 | Inicialização do projeto (Expo ou React Native CLI) | 🔴 P0 | ⏱️ 2 | — |
| 6.2 | Estrutura de pastas (screens, components, services, hooks, contexts) | 🔴 P0 | ⏱️ 2 | 🔗 6.1 |
| 6.3 | Configuração do React Navigation (Stack + Bottom Tabs) | 🔴 P0 | ⏱️ 3 | 🔗 6.1 |
| 6.4 | Service de API (Axios com interceptors) | 🔴 P0 | ⏱️ 3 | 🔗 6.1 |
| 6.5 | Configuração de variáveis de ambiente (API_URL) | 🟠 P1 | ⏱️ 1 | 🔗 6.1 |
| 6.6 | Definição do tema/design system (cores, fontes, espaçamentos) | 🟠 P1 | ⏱️ 3 | 🔗 6.1 |
| 6.7 | Configuração para web (Expo Web ou React Native Web) | 🟡 P2 | ⏱️ 3 | 🔗 6.1 |

**Critérios de Aceite:**
- [ ] App inicia sem erros
- [ ] Navegação entre telas funcionando
- [ ] API service configurado e testado
- [ ] Tema consistente aplicado

---

## ÉPICO 7 — MOBILE: AUTENTICAÇÃO 🔑

> Fluxo de login e gerenciamento de sessão

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 7.1 | Tela de Login (formulário email/senha) | 🔴 P0 | ⏱️ 3 | 🔗 6.3 |
| 7.2 | Integração com endpoint `/auth/login` | 🔴 P0 | ⏱️ 2 | 🔗 7.1, 2.2 |
| 7.3 | Armazenamento seguro do token (AsyncStorage/SecureStore) | 🔴 P0 | ⏱️ 2 | 🔗 7.2 |
| 7.4 | Context de autenticação (AuthContext) | 🔴 P0 | ⏱️ 3 | 🔗 7.3 |
| 7.5 | Proteção de rotas (redirecionar para login se não autenticado) | 🔴 P0 | ⏱️ 2 | 🔗 7.4 |
| 7.6 | Logout (limpar token e redirecionar) | 🔴 P0 | ⏱️ 1 | 🔗 7.4 |
| 7.7 | Expiração de token (interceptor para 401) | 🟠 P1 | ⏱️ 2 | 🔗 7.4 |
| 7.8 | Splash screen com verificação de sessão | 🟡 P2 | ⏱️ 2 | 🔗 7.4 |

**Critérios de Aceite:**
- [ ] Login funciona com credenciais válidas
- [ ] Erro exibido com credenciais inválidas
- [ ] Token persiste ao fechar app
- [ ] Rotas protegidas inacessíveis sem login

---

## ÉPICO 8 — MOBILE: POSTS (LEITURA) 📖

> Telas de visualização de posts para todos os usuários

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 8.1 | Tela principal — listagem de posts (FlatList) | 🔴 P0 | ⏱️ 5 | 🔗 6.3, 3.2 |
| 8.2 | Componente PostCard (título, autor, descrição) | 🔴 P0 | ⏱️ 3 | 🔗 8.1 |
| 8.3 | Campo de busca com debounce | 🟠 P1 | ⏱️ 3 | 🔗 8.1, 3.4 |
| 8.4 | Pull-to-refresh na listagem | 🟠 P1 | ⏱️ 1 | 🔗 8.1 |
| 8.5 | Paginação infinita (infinite scroll) | 🟠 P1 | ⏱️ 3 | 🔗 8.1 |
| 8.6 | Tela de leitura do post (conteúdo completo) | 🔴 P0 | ⏱️ 3 | 🔗 8.1, 3.3 |
| 8.7 | Loading states e empty states | 🟠 P1 | ⏱️ 2 | 🔗 8.1 |
| 8.8 | Seção de comentários (opcional) | 🟢 P3 | ⏱️ 5 | 🔗 8.6, 3.8 |

**Critérios de Aceite:**
- [ ] Lista exibe todos os posts com scroll infinito
- [ ] Busca filtra posts em tempo real
- [ ] Tela de leitura exibe conteúdo completo
- [ ] Loading e empty states implementados

---

## ÉPICO 9 — MOBILE: GESTÃO DE POSTS (ADMIN) ⚙️

> Telas de criação, edição e exclusão para professores

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 9.1 | Tela de criação de post (formulário) | 🔴 P0 | ⏱️ 5 | 🔗 7.5, 3.5 |
| 9.2 | Validação de campos (título obrigatório, conteúdo mínimo) | 🟠 P1 | ⏱️ 2 | 🔗 9.1 |
| 9.3 | Tela de edição de post (pré-carrega dados) | 🔴 P0 | ⏱️ 3 | 🔗 9.1, 3.6 |
| 9.4 | Confirmação de exclusão (modal/alert) | 🟠 P1 | ⏱️ 2 | 🔗 3.7 |
| 9.5 | Tela administrativa — listagem com ações (editar/excluir) | 🔴 P0 | ⏱️ 5 | 🔗 8.1 |
| 9.6 | Feedback de sucesso/erro nas operações | 🟠 P1 | ⏱️ 2 | 🔗 9.1 |
| 9.7 | Ocultar ações de admin para alunos | 🔴 P0 | ⏱️ 2 | 🔗 7.4 |

**Critérios de Aceite:**
- [ ] Apenas professores veem botões de criar/editar/excluir
- [ ] Formulários validam campos antes de enviar
- [ ] Feedback visual claro para todas as ações
- [ ] Confirmação antes de excluir

---

## ÉPICO 10 — MOBILE: GESTÃO DE PROFESSORES 👨‍🏫

> Telas de CRUD de professores (acesso restrito)

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 10.1 | Tela de listagem paginada de professores | 🔴 P0 | ⏱️ 3 | 🔗 4.1 |
| 10.2 | Componente ProfessorCard com ações | 🟠 P1 | ⏱️ 2 | 🔗 10.1 |
| 10.3 | Tela de criação de professor | 🔴 P0 | ⏱️ 3 | 🔗 4.3 |
| 10.4 | Tela de edição de professor | 🔴 P0 | ⏱️ 3 | 🔗 4.4 |
| 10.5 | Exclusão com confirmação | 🔴 P0 | ⏱️ 2 | 🔗 4.5 |
| 10.6 | Validação de formulário (email válido, campos obrigatórios) | 🟠 P1 | ⏱️ 2 | 🔗 10.3 |

**Critérios de Aceite:**
- [ ] Listagem com paginação funcionando
- [ ] Criar/editar/excluir funcionais
- [ ] Acesso restrito a professores

---

## ÉPICO 11 — MOBILE: GESTÃO DE ESTUDANTES 🎓

> Telas de CRUD de estudantes (acesso restrito)

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 11.1 | Tela de listagem paginada de estudantes | 🔴 P0 | ⏱️ 3 | 🔗 5.1 |
| 11.2 | Componente StudentCard com ações | 🟠 P1 | ⏱️ 2 | 🔗 11.1 |
| 11.3 | Tela de criação de estudante | 🔴 P0 | ⏱️ 3 | 🔗 5.3 |
| 11.4 | Tela de edição de estudante | 🔴 P0 | ⏱️ 3 | 🔗 5.4 |
| 11.5 | Exclusão com confirmação | 🔴 P0 | ⏱️ 2 | 🔗 5.5 |
| 11.6 | Validação de formulário | 🟠 P1 | ⏱️ 2 | 🔗 11.3 |

**Critérios de Aceite:**
- [ ] Mesmos padrões do CRUD de professores
- [ ] Reutilização de componentes onde possível

---

## ÉPICO 12 — UI/UX E COMPONENTES 🎨

> Design system e componentes reutilizáveis

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 12.1 | Componente Button (variantes: primary, secondary, danger) | 🟠 P1 | ⏱️ 2 | 🔗 6.6 |
| 12.2 | Componente Input (com label, erro, ícones) | 🟠 P1 | ⏱️ 3 | 🔗 6.6 |
| 12.3 | Componente Card (container estilizado) | 🟠 P1 | ⏱️ 2 | 🔗 6.6 |
| 12.4 | Componente Loading (spinner, skeleton) | 🟠 P1 | ⏱️ 2 | 🔗 6.6 |
| 12.5 | Componente EmptyState | 🟡 P2 | ⏱️ 1 | 🔗 6.6 |
| 12.6 | Componente Modal/BottomSheet | 🟡 P2 | ⏱️ 3 | 🔗 6.6 |
| 12.7 | Componente Header/AppBar | 🟠 P1 | ⏱️ 2 | 🔗 6.6 |
| 12.8 | Componente Toast/Snackbar para feedbacks | 🟡 P2 | ⏱️ 2 | 🔗 6.6 |
| 12.9 | Responsividade (useWindowDimensions) | 🟡 P2 | ⏱️ 3 | 🔗 6.7 |

**Critérios de Aceite:**
- [ ] Componentes documentados e reutilizáveis
- [ ] Consistência visual em todo o app
- [ ] Funcionamento em diferentes tamanhos de tela

---

## ÉPICO 13 — TESTES (OPCIONAL) 🧪

> Cobertura de testes automatizados

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 13.1 | Configuração de Jest no back-end | 🟢 P3 | ⏱️ 2 | 🔗 1.1 |
| 13.2 | Testes unitários dos services | 🟢 P3 | ⏱️ 5 | 🔗 13.1 |
| 13.3 | Testes de integração dos endpoints | 🟢 P3 | ⏱️ 5 | 🔗 13.1 |
| 13.4 | Configuração de Jest/Testing Library no mobile | 🟢 P3 | ⏱️ 2 | 🔗 6.1 |
| 13.5 | Testes de componentes | 🟢 P3 | ⏱️ 5 | 🔗 13.4 |

---

## ÉPICO 14 — DOCUMENTAÇÃO E ENTREGA 📚

> Preparação para entrega final

| ID | Tarefa | Prioridade | Pontos | Dependência |
|----|--------|------------|--------|-------------|
| 14.1 | README técnico (setup, pré-requisitos, comandos) | 🔴 P0 | ⏱️ 3 | — |
| 14.2 | Documentação de arquitetura (diagramas) | 🟠 P1 | ⏱️ 3 | — |
| 14.3 | Documentação da API (Swagger/OpenAPI) | 🟡 P2 | ⏱️ 3 | 🔗 1.1 |
| 14.4 | Guia de uso da aplicação | 🟠 P1 | ⏱️ 2 | — |
| 14.5 | Relato de desafios técnicos | 🟠 P1 | ⏱️ 2 | — |
| 14.6 | Gravação do vídeo de apresentação (máx. 15 min) | 🔴 P0 | ⏱️ 5 | — |
| 14.7 | Revisão final e limpeza de código | 🟠 P1 | ⏱️ 2 | — |

**Critérios de Aceite:**
- [ ] README permite setup do zero seguindo instruções
- [ ] Arquitetura documentada com clareza
- [ ] Vídeo demonstra todas as funcionalidades
- [ ] Código sem console.logs e comentários desnecessários

---

## 📊 RESUMO DE PONTOS POR ÉPICO

| Épico | Descrição | Pontos Totais |
|-------|-----------|---------------|
| 0 | Infraestrutura e DevOps | 11 |
| 1 | Back-end: Setup | 14 |
| 2 | Back-end: Auth | 19 |
| 3 | Back-end: Posts | 20 |
| 4 | Back-end: Professores | 10 |
| 5 | Back-end: Estudantes | 10 |
| 6 | Mobile: Setup | 17 |
| 7 | Mobile: Auth | 17 |
| 8 | Mobile: Posts (Leitura) | 25 |
| 9 | Mobile: Posts (Admin) | 21 |
| 10 | Mobile: Professores | 15 |
| 11 | Mobile: Estudantes | 15 |
| 12 | UI/UX | 20 |
| 13 | Testes (Opcional) | 19 |
| 14 | Documentação | 20 |
| **TOTAL** | | **~233 pts** |

---

## 🗓️ SUGESTÃO DE SPRINTS

### Sprint 1 — Fundação (Épicos 0, 1, 6)
> Setup completo de infra, back-end e mobile

### Sprint 2 — Autenticação (Épicos 2, 7)
> Fluxo de login end-to-end

### Sprint 3 — Posts Core (Épicos 3, 8)
> CRUD de posts e visualização

### Sprint 4 — Admin Posts + Professores (Épicos 4, 9, 10)
> Gestão administrativa

### Sprint 5 — Estudantes + UI Polish (Épicos 5, 11, 12)
> CRUD estudantes e refinamentos visuais

### Sprint 6 — Finalização (Épico 14)
> Documentação e entrega

---

## 🔧 STACK TECNOLÓGICA DETALHADA

### Back-end
- **Runtime:** Node.js 20+
- **Framework:** Express.js ou Fastify
- **ORM:** Prisma ou TypeORM
- **Banco:** PostgreSQL 15+
- **Auth:** JWT (jsonwebtoken)
- **Validação:** Zod ou Joi
- **Container:** Docker + Docker Compose

### Mobile/Web
- **Framework:** React Native (Expo SDK 50+)
- **Navegação:** React Navigation 6
- **HTTP Client:** Axios
- **Estado:** Context API + useReducer
- **Storage:** AsyncStorage ou expo-secure-store
- **UI:** StyleSheet nativo ou Styled Components

---

*Última atualização: Fevereiro/2026*
