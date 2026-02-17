import { Router } from 'express';
import { ProfessorsController } from '../controllers/professors.controller';
import { authenticate } from '../middlewares/authenticate';
import { professorOnly } from '../middlewares/authorize';

const professorsRoutes = Router();
const professorsController = new ProfessorsController();

// ==========================================
// Todas as rotas são protegidas (apenas professores)
// ==========================================

// GET /api/professors - Listar professores
professorsRoutes.get('/', authenticate, professorOnly, professorsController.list);

// GET /api/professors/:id - Detalhes do professor
professorsRoutes.get('/:id', authenticate, professorOnly, professorsController.getById);

// POST /api/professors - Criar professor
professorsRoutes.post('/', authenticate, professorOnly, professorsController.create);

// PUT /api/professors/:id - Editar professor
professorsRoutes.put('/:id', authenticate, professorOnly, professorsController.update);

// DELETE /api/professors/:id - Excluir professor
professorsRoutes.delete('/:id', authenticate, professorOnly, professorsController.delete);

export { professorsRoutes };
