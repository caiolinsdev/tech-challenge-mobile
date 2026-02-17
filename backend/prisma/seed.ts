import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // ==========================================
  // Criar Professores
  // ==========================================

  const professorPassword = await bcrypt.hash('123456', 10);

  const professorUser1 = await prisma.user.upsert({
    where: { email: 'professor@email.com' },
    update: {},
    create: {
      email: 'professor@email.com',
      password: professorPassword,
      name: 'Professor João Silva',
      role: Role.PROFESSOR,
      professor: {
        create: {
          bio: 'Professor de Desenvolvimento de Software com 10 anos de experiência.',
          subject: 'Desenvolvimento Mobile',
        },
      },
    },
    include: { professor: true },
  });

  const professorUser2 = await prisma.user.upsert({
    where: { email: 'maria@email.com' },
    update: {},
    create: {
      email: 'maria@email.com',
      password: professorPassword,
      name: 'Professora Maria Santos',
      role: Role.PROFESSOR,
      professor: {
        create: {
          bio: 'Especialista em DevOps e Cloud Computing.',
          subject: 'DevOps',
        },
      },
    },
    include: { professor: true },
  });

  console.log('✅ Professores criados:', professorUser1.name, professorUser2.name);

  // ==========================================
  // Criar Estudantes
  // ==========================================

  const studentPassword = await bcrypt.hash('123456', 10);

  const studentUser1 = await prisma.user.upsert({
    where: { email: 'aluno@email.com' },
    update: {},
    create: {
      email: 'aluno@email.com',
      password: studentPassword,
      name: 'Aluno Pedro Costa',
      role: Role.STUDENT,
      student: {
        create: {
          enrollment: '2026001',
          grade: '3º Ano',
        },
      },
    },
  });

  const studentUser2 = await prisma.user.upsert({
    where: { email: 'ana@email.com' },
    update: {},
    create: {
      email: 'ana@email.com',
      password: studentPassword,
      name: 'Aluna Ana Oliveira',
      role: Role.STUDENT,
      student: {
        create: {
          enrollment: '2026002',
          grade: '2º Ano',
        },
      },
    },
  });

  console.log('✅ Estudantes criados:', studentUser1.name, studentUser2.name);

  // ==========================================
  // Criar Posts
  // ==========================================

  const posts = [
    {
      title: 'Introdução ao React Native',
      description: 'Aprenda os conceitos básicos do React Native e como criar seu primeiro aplicativo mobile.',
      content: `
# Introdução ao React Native

React Native é um framework para desenvolvimento de aplicativos mobile usando JavaScript e React.

## Por que usar React Native?

1. **Código compartilhado** - Escreva uma vez, rode em iOS e Android
2. **Performance nativa** - Componentes nativos de verdade
3. **Hot Reload** - Veja as mudanças instantaneamente
4. **Grande comunidade** - Milhares de bibliotecas disponíveis

## Primeiros Passos

Para começar, instale o Expo CLI:

\`\`\`bash
npm install -g expo-cli
npx create-expo-app MeuApp
cd MeuApp
npx expo start
\`\`\`

## Conclusão

React Native é uma excelente escolha para desenvolvimento mobile cross-platform.
      `,
      authorId: professorUser1.professor!.id,
    },
    {
      title: 'Docker para Desenvolvedores',
      description: 'Entenda como containerizar suas aplicações usando Docker e Docker Compose.',
      content: `
# Docker para Desenvolvedores

Docker revolucionou a forma como desenvolvemos e deployamos aplicações.

## O que é Docker?

Docker é uma plataforma de containerização que permite empacotar aplicações com todas suas dependências.

## Comandos Essenciais

\`\`\`bash
# Construir imagem
docker build -t minha-app .

# Rodar container
docker run -p 3000:3000 minha-app

# Docker Compose
docker-compose up -d
\`\`\`

## Benefícios

- Ambientes consistentes
- Fácil escalabilidade
- Isolamento de aplicações

## Conclusão

Docker é essencial para qualquer desenvolvedor moderno.
      `,
      authorId: professorUser2.professor!.id,
    },
    {
      title: 'PostgreSQL: Boas Práticas',
      description: 'Dicas e truques para otimizar suas queries e modelar seu banco de dados corretamente.',
      content: `
# PostgreSQL: Boas Práticas

PostgreSQL é um dos bancos de dados relacionais mais poderosos e populares.

## Índices

Sempre crie índices para colunas frequentemente consultadas:

\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
\`\`\`

## Normalização

Mantenha seus dados normalizados para evitar redundância.

## Transações

Use transações para operações que precisam ser atômicas:

\`\`\`sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
\`\`\`

## Conclusão

Seguir boas práticas garante performance e integridade dos dados.
      `,
      authorId: professorUser1.professor!.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log('✅ Posts criados:', posts.length);

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

