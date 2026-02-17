import { Router } from 'express';
import { StudentsController } from '../controllers/students.controller';
import { authenticate } from '../middlewares/authenticate';
import { professorOnly } from '../middlewares/authorize';

const studentsRoutes = Router();
const studentsController = new StudentsController();

// ==========================================
// Todas as rotas são protegidas (apenas professores)
// ==========================================

// GET /api/students - Listar estudantes
studentsRoutes.get('/', authenticate, professorOnly, studentsController.list);

// GET /api/students/:id - Detalhes do estudante
studentsRoutes.get('/:id', authenticate, professorOnly, studentsController.getById);

// POST /api/students - Criar estudante
studentsRoutes.post('/', authenticate, professorOnly, studentsController.create);

// PUT /api/students/:id - Editar estudante
studentsRoutes.put('/:id', authenticate, professorOnly, studentsController.update);

// DELETE /api/students/:id - Excluir estudante
studentsRoutes.delete('/:id', authenticate, professorOnly, studentsController.delete);

export { studentsRoutes };
