import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

// ==========================================
// Tipos
// ==========================================

export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
}

// ==========================================
// Configurações
// ==========================================

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// ==========================================
// Funções
// ==========================================

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch {
    return null;
  }
};

