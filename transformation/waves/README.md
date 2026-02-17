# 🌊 WAVE PLANNING — TECH CHALLENGE FASE 04

> Planejamento em ondas para entrega incremental do projeto

---

## 📋 Visão Geral

O projeto está organizado em **7 Waves**, cada uma representando um ciclo de entrega com valor agregado ao produto final.

| Wave | Nome | Foco Principal | Duração Estimada |
|------|------|----------------|------------------|
| 1 | Fundação | Infra + Setup base | 3-4 dias |
| 2 | Autenticação | Login end-to-end | 2-3 dias |
| 3 | Posts Core | Visualização de posts | 3-4 dias |
| 4 | Admin Posts | Gestão de postagens | 2-3 dias |
| 5 | Professores | CRUD de docentes | 2-3 dias |
| 6 | Estudantes | CRUD de alunos | 2 dias |
| 7 | Polish & Entrega | UI/UX + Docs | 3-4 dias |

**Duração total estimada: ~18-23 dias**

---

## 🔄 Fluxo de Waves

```
┌─────────────┐
│   WAVE 1    │  Fundação (Docker, PostgreSQL, Setup)
│  FUNDAÇÃO   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   WAVE 2    │  Autenticação (JWT, Login, Proteção de rotas)
│    AUTH     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   WAVE 3    │  Posts Core (Listagem, Busca, Leitura)
│ POSTS CORE  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   WAVE 4    │  Admin Posts (Criar, Editar, Excluir)
│ ADMIN POSTS │
└──────┬──────┘
       │
       ├───────────────┐
       ▼               ▼
┌─────────────┐  ┌─────────────┐
│   WAVE 5    │  │   WAVE 6    │  (Podem rodar em paralelo)
│ PROFESSORES │  │ ESTUDANTES  │
└──────┬──────┘  └──────┬──────┘
       │               │
       └───────┬───────┘
               ▼
       ┌─────────────┐
       │   WAVE 7    │  Polish, Documentação & Entrega
       │   ENTREGA   │
       └─────────────┘
```

---

## 📁 Estrutura de Arquivos

```
discovery/waves/
├── README.md                    # Este arquivo
├── wave-1-foundation.md         # Setup e infraestrutura
├── wave-2-authentication.md     # Sistema de autenticação
├── wave-3-posts-core.md         # Visualização de posts
├── wave-4-admin-posts.md        # Gestão de posts
├── wave-5-professors.md         # CRUD de professores
├── wave-6-students.md           # CRUD de estudantes
└── wave-7-polish-delivery.md    # Finalização e entrega
```

---

## ✅ Critérios de Conclusão de Wave

Cada wave só é considerada **completa** quando:

1. ✅ Todas as tarefas P0 estão concluídas
2. ✅ Testes manuais realizados com sucesso
3. ✅ Código commitado e pushado
4. ✅ Funcionalidade integrada (back + front)
5. ✅ Review de código realizado (se em equipe)

---

## 🎯 Métricas de Acompanhamento

### Por Wave
- [ ] **Wave 1** — Fundação `[ 0 / 17 tarefas ]`
- [ ] **Wave 2** — Autenticação `[ 0 / 15 tarefas ]`
- [ ] **Wave 3** — Posts Core `[ 0 / 11 tarefas ]`
- [ ] **Wave 4** — Admin Posts `[ 0 / 7 tarefas ]`
- [ ] **Wave 5** — Professores `[ 0 / 11 tarefas ]`
- [ ] **Wave 6** — Estudantes `[ 0 / 6 tarefas ]`
- [ ] **Wave 7** — Polish & Entrega `[ 0 / 16 tarefas ]`

**Total: 83 tarefas**

---

## 🚀 Como Usar

1. Abra o arquivo da wave atual
2. Siga as tarefas na ordem listada
3. Marque cada tarefa como concluída `[x]`
4. Ao completar todas as tarefas P0, avance para próxima wave
5. Tarefas P2/P3 podem ser deixadas para Wave 7 se necessário

---

*Última atualização: Fevereiro/2026*

