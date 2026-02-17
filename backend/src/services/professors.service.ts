import { prisma } from '../utils/prisma';
import { hashPassword } from '../utils/password';
import { NotFoundError, ConflictError, AppError } from '../middlewares/errorHandler';

// ==========================================
// Tipos
// ==========================================

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface ProfessorsListResponse {
  data: ProfessorListItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ProfessorListItem {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  subject: string | null;
  postsCount: number;
  createdAt: Date;
}

interface ProfessorDetail {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  subject: string | null;
  posts: { id: string; title: string }[];
  createdAt: Date;
}

interface CreateProfessorData {
  name: string;
  email: string;
  password: string;
  bio?: string;
  subject?: string;
}

interface UpdateProfessorData {
  name?: string;
  bio?: string;
  subject?: string;
}

// ==========================================
// Service
// ==========================================

export class ProfessorsService {
  /**
   * Lista professores com paginação
   */
  async list(params: PaginationParams = {}): Promise<ProfessorsListResponse> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const [professors, total] = await Promise.all([
      prisma.professor.findMany({
        select: {
          id: true,
          bio: true,
          subject: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          _count: {
            select: { posts: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.professor.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: professors.map((prof) => ({
        id: prof.id,
        name: prof.user.name,
        email: prof.user.email,
        bio: prof.bio,
        subject: prof.subject,
        postsCount: prof._count.posts,
        createdAt: prof.createdAt,
      })),
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Busca um professor pelo ID
   */
  async getById(id: string): Promise<ProfessorDetail> {
    const professor = await prisma.professor.findUnique({
      where: { id },
      select: {
        id: true,
        bio: true,
        subject: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        posts: {
          select: {
            id: true,
            title: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!professor) {
      throw new NotFoundError('Professor');
    }

    return {
      id: professor.id,
      name: professor.user.name,
      email: professor.user.email,
      bio: professor.bio,
      subject: professor.subject,
      posts: professor.posts,
      createdAt: professor.createdAt,
    };
  }

  /**
   * Cria um novo professor
   */
  async create(data: CreateProfessorData) {
    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('Email já está em uso');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: 'PROFESSOR',
        professor: {
          create: {
            bio: data.bio || null,
            subject: data.subject || null,
          },
        },
      },
      include: {
        professor: true,
      },
    });

    return {
      id: user.professor!.id,
      name: user.name,
      email: user.email,
      bio: user.professor!.bio,
      subject: user.professor!.subject,
      createdAt: user.professor!.createdAt,
    };
  }

  /**
   * Atualiza um professor
   */
  async update(id: string, data: UpdateProfessorData) {
    const professor = await prisma.professor.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!professor) {
      throw new NotFoundError('Professor');
    }

    // Atualizar professor e usuário em transação
    const [updatedProfessor] = await prisma.$transaction([
      prisma.professor.update({
        where: { id },
        data: {
          bio: data.bio !== undefined ? data.bio : undefined,
          subject: data.subject !== undefined ? data.subject : undefined,
        },
        include: { user: true },
      }),
      ...(data.name
        ? [
            prisma.user.update({
              where: { id: professor.userId },
              data: { name: data.name },
            }),
          ]
        : []),
    ]);

    return {
      id: updatedProfessor.id,
      name: data.name || updatedProfessor.user.name,
      email: updatedProfessor.user.email,
      bio: updatedProfessor.bio,
      subject: updatedProfessor.subject,
      updatedAt: updatedProfessor.updatedAt,
    };
  }

  /**
   * Exclui um professor
   */
  async delete(id: string, currentUserId: string) {
    const professor = await prisma.professor.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!professor) {
      throw new NotFoundError('Professor');
    }

    // Impedir auto-exclusão
    if (professor.userId === currentUserId) {
      throw new AppError('Você não pode excluir a si mesmo', 400);
    }

    // Verificar posts associados
    const postsCount = await prisma.post.count({
      where: { authorId: id },
    });

    if (postsCount > 0) {
      throw new ConflictError(
        `Professor possui ${postsCount} post${postsCount > 1 ? 's' : ''} associado${postsCount > 1 ? 's' : ''}. Exclua os posts primeiro.`
      );
    }

    // Excluir professor (cascade deleta o user por causa do onDelete: Cascade no schema)
    await prisma.user.delete({
      where: { id: professor.userId },
    });
  }
}
