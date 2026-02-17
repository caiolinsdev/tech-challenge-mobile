import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { PostsService } from '../services/posts.service';

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
}

