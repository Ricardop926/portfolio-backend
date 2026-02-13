import { Router } from 'express';
import bcrypt from 'bcrypt';
import { login, verifyToken } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import Users from '../models/Users';

const router = Router();

// 🔒 Ruta solo admin
router.get(
  '/dashboard',
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({ message: 'Panel de administrador 🔒' });
  }
);

// 🔑 Login normal
router.post('/login', login);

// ✅ Verificar token
router.get('/verify', authMiddleware, verifyToken);

// 🔐 Cambiar contraseña
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await Users.findById(req.user!.userId); // revisa si es userId

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;