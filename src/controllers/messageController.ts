import { Request, Response } from 'express';
import Message from '../models/Message';

// GET /api/messages (admin)
export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Message.find().sort({ fechaCreacion: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
};

// POST /api/messages (público)
export const createMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;
    
    if (!nombre || !email || !asunto || !mensaje) {
      res.status(400).json({ error: 'Todos los campos son requeridos' });
      return;
    }

    const newMessage = new Message({ nombre, email, asunto, mensaje });
    await newMessage.save();
    res.status(201).json({ message: 'Mensaje enviado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
};

// PUT /api/messages/:id (marcar como leído)
export const updateMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { leido: req.body.leido },
      { new: true }
    );
    if (!message) {
      res.status(404).json({ error: 'Mensaje no encontrado' });
      return;
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar mensaje' });
  }
};

// DELETE /api/messages/:id
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404).json({ error: 'Mensaje no encontrado' });
      return;
    }
    res.json({ message: 'Mensaje eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar mensaje' });
  }
};