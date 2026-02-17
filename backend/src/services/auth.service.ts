import { prisma } from '../utils/prisma';
import { generateToken, JwtPayload } from '../utils/jwt';
import { comparePassword } from '../utils/password';
import { UnauthorizedError, NotFoundError } from '../middlewares/errorHandler';

// ==========================================
// Tipos
// ==========================================

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  professor?: {
    id: string;
    bio: string | null;
    subject: string | null;
  } | null;
  student?: {
    id: string;
    enrollment: string | null;
    grade: string | null;
  } | null;
}

// ==========================================
// Service
// ==========================================

export class AuthService {
  /**
   * Realiza login do usuário
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    // Buscar usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    // Gerar token JWT
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(payload);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  /**
   * Obtém perfil completo do usuário
   */
  async getProfile(userId: string): Promise<UserProfile> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        professor: {
          select: {
            id: true,
            bio: true,
            subject: true,
          },
        },
        student: {
          select: {
            id: true,
            enrollment: true,
            grade: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('Usuário');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      professor: user.professor,
      student: user.student,
    };
  }
}

