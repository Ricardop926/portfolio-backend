import { Request, Response } from 'express';
import Project from '../models/Project';

// GET /api/projects - Proyectos públicos (visibles)
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoria } = req.query;
    
    const filtro: any = { visible: true };
    if (categoria && categoria !== 'todos') {
      filtro.categoria = categoria;
    }

    const projects = await Project.find(filtro).sort({ orden: 1, fechaCreacion: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
};

// GET /api/projects/all - Todos los proyectos (admin)
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ orden: 1, fechaCreacion: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
};

// GET /api/projects/:id
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Proyecto no encontrado' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proyecto' });
  }
};

// POST /api/projects
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear proyecto' });
  }
};

// PUT /api/projects/:id
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      res.status(404).json({ error: 'Proyecto no encontrado' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar proyecto' });
  }
};

// DELETE /api/projects/:id
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Proyecto no encontrado' });
      return;
    }
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proyecto' });
  }
};