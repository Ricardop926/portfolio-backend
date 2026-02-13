import { Router } from 'express';
import {
  getProjects,
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Rutas públicas
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Rutas protegidas (admin)
router.get('/admin/all', authMiddleware, getAllProjects);
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;