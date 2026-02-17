import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { PostsService } from '../services/posts.service';
import { AuthenticatedRequest } from '../middlewares/authenticate';

// ==========================================
// Schemas de Validação
// ==========================================

const listQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  orderBy: z.enum(['createdAt', 'title']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

const searchQuerySchema = z.object({
  q: z.string().min(1, 'Termo de busca é obrigatório'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

const createSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título deve ter no máximo 100 caracteres'),
  content: z.string().min(50, 'Conteúdo deve ter pelo menos 50 caracteres'),
  description: z.string().optional(),
});

const updateSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título deve ter no máximo 100 caracteres').optional(),
  content: z.string().min(50, 'Conteúdo deve ter pelo menos 50 caracteres').optional(),
  description: z.string().optional(),
});

// ==========================================
// Controller
// ==========================================

export class PostsController {
  private postsService: PostsService;

  constructor() {
    this.postsService = new PostsService();
  }

  /**
   * GET /api/posts
   * Lista posts com paginação
   */
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = listQuerySchema.parse(req.query);
      const result = await this.postsService.list(params);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/posts/search
   * Busca posts por termo
   */
  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, ...params } = searchQuerySchema.parse(req.query);
      const result = await this.postsService.search(q, params);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/posts/:id
   * Retorna detalhes de um post
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const post = await this.postsService.getById(id);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/posts/mine
   * Lista posts do professor logado
   */
  listMine = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const params = listQuerySchema.parse(req.query);
      const userId = req.user!.userId;
      const result = await this.postsService.listByAuthor(userId, params);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/posts
   * Cria um novo post
   */
  create = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const data = createSchema.parse(req.body);
      const userId = req.user!.userId;
      const post = await this.postsService.create(data, userId);
      return res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  };

  /**
   * PUT /api/posts/:id
   * Atualiza um post
   */
  update = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = updateSchema.parse(req.body);
      const userId = req.user!.userId;
      const post = await this.postsService.update(id, data, userId);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /api/posts/:id
   * Exclui um post
   */
  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      await this.postsService.delete(id, userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

