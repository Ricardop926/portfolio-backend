import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/Users';
import dotenv from 'dotenv';

console.log('📝 Script iniciado...');

dotenv.config();

console.log('🔍 Variables de entorno cargadas');
console.log('📍 MONGODB_URI existe:', !!process.env.MONGODB_URI);

const createAdmin = async () => {
  try {
    console.log('🔄 Intentando conectar a MongoDB...');
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    console.log('🔗 URI (primeros 20 caracteres):', mongoUri.substring(0, 20));
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ Conectado a MongoDB');
    
    // Verificar si ya existe un admin
    console.log('🔍 Verificando si existe admin...');
    const existingAdmin = await User.findOne({ email: 'admin@tuportafolio.com' });
    
    if (existingAdmin) {
      console.log('❌ El usuario admin ya existe');
      await mongoose.disconnect();
      process.exit(0);
    }

    console.log('🔐 Hasheando contraseña...');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    console.log('👤 Creando usuario admin...');
    const admin = new User({
      email: 'admin@tuportafolio.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Usuario admin creado exitosamente');
    console.log('📧 Email: admin@tuportafolio.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error completo:', error);
    process.exit(1);
  }
};

console.log(' Ejecutando función createAdmin...');
createAdmin();