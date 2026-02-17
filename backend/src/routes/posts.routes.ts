import { Router } from 'express';
import { PostsController } from '../controllers/posts.controller';
import { authenticate } from '../middlewares/authenticate';
import { professorOnly } from '../middlewares/authorize';

const postsRoutes = Router();
const postsController = new PostsController();

// ==========================================
// Rotas Públicas (leitura)
// ==========================================

// GET /api/posts - Listar posts
postsRoutes.get('/', postsController.list);

// GET /api/posts/search - Buscar posts
postsRoutes.get('/search', postsController.search);

// GET /api/posts/mine - Listar posts do professor logado
postsRoutes.get('/mine', authenticate, professorOnly, postsController.listMine);

// GET /api/posts/:id - Detalhes do post
postsRoutes.get('/:id', postsController.getById);

// ==========================================
// Rotas Protegidas (apenas professor)
// ==========================================

// POST /api/posts - Criar post
postsRoutes.post('/', authenticate, professorOnly, postsController.create);

// PUT /api/posts/:id - Editar post
postsRoutes.put('/:id', authenticate, professorOnly, postsController.update);

// DELETE /api/posts/:id - Excluir post
postsRoutes.delete('/:id', authenticate, professorOnly, postsController.delete);

export { postsRoutes };
