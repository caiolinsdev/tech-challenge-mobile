import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// ==========================================
// Tipos de Erro
// ==========================================

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 400, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} não encontrado(a)`, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Não autorizado') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acesso negado') {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

// ==========================================
// Error Handler Middleware
// ==========================================

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log do erro
  console.error('❌ Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  // Erro de validação Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Erro operacional da aplicação
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Erro do Prisma - registro não encontrado
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;
    if (prismaError.code === 'P2025') {
      return res.status(404).json({
        error: 'Registro não encontrado',
      });
    }
    if (prismaError.code === 'P2002') {
      return res.status(409).json({
        error: 'Registro já existe',
        field: prismaError.meta?.target,
      });
    }
  }

  // Erro não tratado
  return res.status(500).json({
    error: 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { details: err.message }),
  });
};

