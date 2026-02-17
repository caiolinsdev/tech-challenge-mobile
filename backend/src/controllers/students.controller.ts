import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { StudentsService } from '../services/students.service';

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
  enrollment: z.string().optional(),
  grade: z.string().optional(),
});

const updateSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  enrollment: z.string().optional(),
  grade: z.string().optional(),
});

// ==========================================
// Controller
// ==========================================

export class StudentsController {
  private studentsService: StudentsService;

  constructor() {
    this.studentsService = new StudentsService();
  }

  /**
   * GET /api/students
   * Lista estudantes com paginação
   */
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = listQuerySchema.parse(req.query);
      const result = await this.studentsService.list(params);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/students/:id
   * Retorna detalhes de um estudante
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const student = await this.studentsService.getById(id);
      return res.json(student);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/students
   * Cria um novo estudante
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createSchema.parse(req.body);
      const student = await this.studentsService.create(data);
      return res.status(201).json(student);
    } catch (error) {
      next(error);
    }
  };

  /**
   * PUT /api/students/:id
   * Atualiza um estudante
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = updateSchema.parse(req.body);
      const student = await this.studentsService.update(id, data);
      return res.json(student);
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /api/students/:id
   * Exclui um estudante
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.studentsService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
