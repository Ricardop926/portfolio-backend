import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ error: 'Acceso solo para administradores.' });
    return;
  }

  next();
};