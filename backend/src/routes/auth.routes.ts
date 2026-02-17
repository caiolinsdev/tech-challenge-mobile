import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/authenticate';

const authRoutes = Router();
const authController = new AuthController();

// ==========================================
// Rotas Públicas
// ==========================================

// POST /api/auth/login - Fazer login
authRoutes.post('/login', authController.login);

// ==========================================
// Rotas Protegidas
// ==========================================

// GET /api/auth/me - Obter dados do usuário logado
authRoutes.get('/me', authenticate, authController.me);

export { authRoutes };

