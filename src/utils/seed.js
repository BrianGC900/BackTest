import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/entities/User.js'; 

// Cargar las variables de entorno
dotenv.config();

const createAdminUser = async () => {
  try {
    const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingUser) {
      console.log('El usuario admin ya está creado');
      return;
    }

    // Hashear la contraseña del .env
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      firstName: 'Brian',
      lastName: 'Garcia',
      email: process.env.ADMIN_EMAIL,
      phoneNumber: '1234567890',
      role: 'Admin',
      status: 'Active',
      address: {
        street: 'Admin Street',
        number: '123',
        city: 'Admin City',
        postalCode: '12345',
      },
      password: hashedPassword,
    });

    await adminUser.save();
    console.log('Usuario admin creado');
  } catch (error) {
    console.error('Error al crear el usuario admin:', error);
  }
};

createAdminUser();
