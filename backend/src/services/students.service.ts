import { prisma } from '../utils/prisma';
import { hashPassword } from '../utils/password';
import { NotFoundError, ConflictError } from '../middlewares/errorHandler';

// ==========================================
// Tipos
// ==========================================

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface StudentsListResponse {
  data: StudentListItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface StudentListItem {
  id: string;
  name: string;
  email: string;
  enrollment: string | null;
  grade: string | null;
  createdAt: Date;
}

interface StudentDetail {
  id: string;
  name: string;
  email: string;
  enrollment: string | null;
  grade: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateStudentData {
  name: string;
  email: string;
  password: string;
  enrollment?: string;
  grade?: string;
}

interface UpdateStudentData {
  name?: string;
  enrollment?: string;
  grade?: string;
}

// ==========================================
// Service
// ==========================================

export class StudentsService {
  /**
   * Lista estudantes com paginação
   */
  async list(params: PaginationParams = {}): Promise<StudentsListResponse> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        select: {
          id: true,
          enrollment: true,
          grade: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.student.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: students.map((s) => ({
        id: s.id,
        name: s.user.name,
        email: s.user.email,
        enrollment: s.enrollment,
        grade: s.grade,
        createdAt: s.createdAt,
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
   * Busca um estudante pelo ID
   */
  async getById(id: string): Promise<StudentDetail> {
    const student = await prisma.student.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!student) {
      throw new NotFoundError('Estudante');
    }

    return {
      id: student.id,
      name: student.user.name,
      email: student.user.email,
      enrollment: student.enrollment,
      grade: student.grade,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }

  /**
   * Cria um novo estudante
   */
  async create(data: CreateStudentData) {
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
        role: 'STUDENT',
        student: {
          create: {
            enrollment: data.enrollment || null,
            grade: data.grade || null,
          },
        },
      },
      include: {
        student: true,
      },
    });

    return {
      id: user.student!.id,
      name: user.name,
      email: user.email,
      enrollment: user.student!.enrollment,
      grade: user.student!.grade,
      createdAt: user.student!.createdAt,
    };
  }

  /**
   * Atualiza um estudante
   */
  async update(id: string, data: UpdateStudentData) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!student) {
      throw new NotFoundError('Estudante');
    }

    const [updatedStudent] = await prisma.$transaction([
      prisma.student.update({
        where: { id },
        data: {
          enrollment: data.enrollment !== undefined ? data.enrollment : undefined,
          grade: data.grade !== undefined ? data.grade : undefined,
        },
        include: { user: true },
      }),
      ...(data.name
        ? [
            prisma.user.update({
              where: { id: student.userId },
              data: { name: data.name },
            }),
          ]
        : []),
    ]);

    return {
      id: updatedStudent.id,
      name: data.name || updatedStudent.user.name,
      email: updatedStudent.user.email,
      enrollment: updatedStudent.enrollment,
      grade: updatedStudent.grade,
      updatedAt: updatedStudent.updatedAt,
    };
  }

  /**
   * Exclui um estudante
   */
  async delete(id: string) {
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundError('Estudante');
    }

    await prisma.user.delete({
      where: { id: student.userId },
    });
  }
}
