import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '../middlewares/authenticate';

// ==========================================
// Schemas de Validação
// ==========================================

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

// ==========================================
// Controller
// ==========================================

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * POST /api/auth/login
   * Realiza login e retorna token JWT
   */
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validar dados de entrada
      const { email, password } = loginSchema.parse(req.body);

      // Realizar login
      const result = await this.authService.login(email, password);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/auth/me
   * Retorna dados do usuário autenticado
   */
  me = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;

      const user = await this.authService.getProfile(userId);

      return res.json(user);
    } catch (error) {
      next(error);
    }
  };
}

