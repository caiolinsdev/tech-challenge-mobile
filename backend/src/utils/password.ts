import bcrypt from 'bcryptjs';

// ==========================================
// Configurações
// ==========================================

const SALT_ROUNDS = 10;

// ==========================================
// Funções
// ==========================================

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

