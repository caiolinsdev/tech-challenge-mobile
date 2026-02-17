import { Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { AuthenticatedRequest } from './authenticate';
import { ForbiddenError } from './errorHandler';

// ==========================================
// Middleware de Autorização
// ==========================================

/**
 * Middleware que verifica se o usuário tem a role necessária
 * Deve ser usado APÓS o middleware authenticate
 * 
 * @param roles - Roles permitidas para acessar a rota
 * 
 * @example
 * router.post('/posts', authenticate, authorize('PROFESSOR'), createPost);
 */
export const authorize = (...roles: Role[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // Verificar se o usuário está autenticado
      if (!req.user) {
        throw new ForbiddenError('Usuário não autenticado');
      }

      // Verificar se a role do usuário está na lista de roles permitidas
      if (!roles.includes(req.user.role)) {
        throw new ForbiddenError('Você não tem permissão para acessar este recurso');
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware específico para rotas de professores
 */
export const professorOnly = authorize(Role.PROFESSOR);

/**
 * Middleware específico para rotas de estudantes
 */
export const studentOnly = authorize(Role.STUDENT);

