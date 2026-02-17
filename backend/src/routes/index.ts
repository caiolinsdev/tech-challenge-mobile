import { Router } from 'express';
import { authRoutes } from './auth.routes';

const routes = Router();

// ==========================================
// Rota de boas-vindas da API
// ==========================================

routes.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API do Blog!',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      auth: {
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
      },
      posts: {
        list: 'GET /api/posts',
        search: 'GET /api/posts/search',
        getById: 'GET /api/posts/:id',
        create: 'POST /api/posts',
        update: 'PUT /api/posts/:id',
        delete: 'DELETE /api/posts/:id',
      },
      professors: {
        list: 'GET /api/professors',
        getById: 'GET /api/professors/:id',
        create: 'POST /api/professors',
        update: 'PUT /api/professors/:id',
        delete: 'DELETE /api/professors/:id',
      },
      students: {
        list: 'GET /api/students',
        getById: 'GET /api/students/:id',
        create: 'POST /api/students',
        update: 'PUT /api/students/:id',
        delete: 'DELETE /api/students/:id',
      },
    },
  });
});

// ==========================================
// Rotas da API
// ==========================================

routes.use('/auth', authRoutes);

// TODO: Adicionar nas próximas waves
// routes.use('/posts', postRoutes);
// routes.use('/professors', professorRoutes);
// routes.use('/students', studentRoutes);

export { routes };

