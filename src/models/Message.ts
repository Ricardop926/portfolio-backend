import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  leido: boolean;
  fechaCreacion: Date;
}

const MessageSchema = new Schema<IMessage>({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  asunto: { type: String, required: true },
  mensaje: { type: String, required: true },
  leido: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.model<IMessage>('Message', MessageSchema);