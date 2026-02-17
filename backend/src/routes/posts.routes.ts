import { Router } from 'express';
import { PostsController } from '../controllers/posts.controller';

const postsRoutes = Router();
const postsController = new PostsController();

// ==========================================
// Rotas Públicas (leitura)
// ==========================================

// GET /api/posts - Listar posts
postsRoutes.get('/', postsController.list);

// GET /api/posts/search - Buscar posts
postsRoutes.get('/search', postsController.search);

// GET /api/posts/:id - Detalhes do post
postsRoutes.get('/:id', postsController.getById);

// ==========================================
// Rotas Protegidas (admin) - Wave 4
// ==========================================

// POST /api/posts - Criar post (apenas professor)
// PUT /api/posts/:id - Editar post (apenas professor)
// DELETE /api/posts/:id - Excluir post (apenas professor)

export { postsRoutes };

