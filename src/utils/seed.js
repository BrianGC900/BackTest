import bcrypt from 'bcryptjs';
import User from '../models/entities/User.js';  // Asegúrate de que sea el modelo correcto

const createAdminUser = async () => {
  try {
    const existingUser = await User.findOne({ email: 'admin@example.com' });
    if (existingUser) {
      console.log('El usuario admin ya existe');
      return;
    }

    const hashedPassword = await bcrypt.hash('Password123!', 10);  // Crea el hash de la contraseña
    const adminUser = new User({
      firstName: 'Brian',
      lastName: 'Garcia',
      email: 'admin@mailtrap.com',
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
