import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ProfessorsService } from '../services/professors.service';
import { AuthenticatedRequest } from '../middlewares/authenticate';

// ==========================================
// Schemas de Validação
// ==========================================

const listQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

const createSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  bio: z.string().optional(),
  subject: z.string().optional(),
});

const updateSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  bio: z.string().optional(),
  subject: z.string().optional(),
});

// ==========================================
// Controller
// ==========================================

export class ProfessorsController {
  private professorsService: ProfessorsService;

  constructor() {
    this.professorsService = new ProfessorsService();
  }

  /**
   * GET /api/professors
   * Lista professores com paginação
   */
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = listQuerySchema.parse(req.query);
      const result = await this.professorsService.list(params);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/professors/:id
   * Retorna detalhes de um professor
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const professor = await this.professorsService.getById(id);
      return res.json(professor);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/professors
   * Cria um novo professor
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createSchema.parse(req.body);
      const professor = await this.professorsService.create(data);
      return res.status(201).json(professor);
    } catch (error) {
      next(error);
    }
  };

  /**
   * PUT /api/professors/:id
   * Atualiza um professor
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = updateSchema.parse(req.body);
      const professor = await this.professorsService.update(id, data);
      return res.json(professor);
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /api/professors/:id
   * Exclui um professor
   */
  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const currentUserId = req.user!.userId;
      await this.professorsService.delete(id, currentUserId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
