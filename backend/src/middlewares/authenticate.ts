import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import { UnauthorizedError } from './errorHandler';

// ==========================================
// Tipos
// ==========================================

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// ==========================================
// Middleware de Autenticação
// ==========================================

/**
 * Middleware que verifica se o usuário está autenticado
 * Extrai e valida o token JWT do header Authorization
 */
export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extrair token do header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('Token não fornecido');
    }

    // Verificar formato "Bearer <token>"
    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      throw new UnauthorizedError('Token mal formatado');
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      throw new UnauthorizedError('Token mal formatado');
    }

    // Verificar e decodificar token
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      return next();
    } catch (error) {
      throw new UnauthorizedError('Token inválido ou expirado');
    }
  } catch (error) {
    next(error);
  }
};

