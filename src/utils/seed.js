import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import UserFactor from '../models/userFactor.js'; // Asegúrate de que la ruta sea correcta

dotenv.config();

export const seedDatabase = async () => {
  try {
    const hashedPassword = await bcrypt.hash('password', 10);

    // Verificar si el modelo ya está definido antes de crear uno nuevo
    if (mongoose.models.UserFactor) {
      console.log('Modelo UserFactor ya está definido.');
    } else {
      const user = new UserFactor({
        email: 'admin@example.com',
        password: hashedPassword,
        isVerified: true,
      });

      await user.save();
      console.log('Usuario predeterminado creado');
    }

  } catch (error) {
    console.error('Error al crear usuario predeterminado:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Establecer conexión con la base de datos y ejecutar la función de seed
mongoose.connect(process.env.MONGOOSE_URI)
  .then(seedDatabase)
  .catch(err => console.error('Error al conectar a MongoDB:', err));
