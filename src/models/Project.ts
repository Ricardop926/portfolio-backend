import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  titulo: string;
  descripcion: string;
  descripcionCorta: string;
  imagen: string;
  imagenes: string[];
  tecnologias: string[];
  categoria: 'fullstack' | 'frontend' | 'backend';
  githubUrl?: string;
  liveUrl?: string;
  destacado: boolean;
  visible: boolean;
  retos: string[];
  aprendizajes: string[];
  fechaCreacion: Date;
  orden: number;
}

const ProjectSchema = new Schema<IProject>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  descripcionCorta: { type: String, required: true },
  imagen: { type: String, required: true },
  imagenes: [{ type: String }],
  tecnologias: [{ type: String, required: true }],
  categoria: { 
    type: String, 
    enum: ['fullstack', 'frontend', 'backend'],
    required: true 
  },
  githubUrl: { type: String },
  liveUrl: { type: String },
  destacado: { type: Boolean, default: false },
  visible: { type: Boolean, default: true },
  retos: [{ type: String }],
  aprendizajes: [{ type: String }],
  fechaCreacion: { type: Date, default: Date.now },
  orden: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model<IProject>('Project', ProjectSchema);