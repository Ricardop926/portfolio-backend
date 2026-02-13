import { Router } from 'express';
import {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage
} from '../controllers/messageController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Ruta pública (formulario de contacto)
router.post('/', createMessage);

// Rutas protegidas (admin)
router.get('/', authMiddleware, getMessages);
router.put('/:id', authMiddleware, updateMessage);
router.delete('/:id', authMiddleware, deleteMessage);

export default router;