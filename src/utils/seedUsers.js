import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';  // Asegúrate de que estás importando faker correctamente
import bcrypt from 'bcryptjs';  // Asegúrate de que bcryptjs está instalado para hashear contraseñas
import dotenv from 'dotenv';
import User from '../models/entities/User.js'; // Asegúrate de que la ruta es correcta

dotenv.config(); // Cargar variables de entorno desde un archivo .env

// Función para generar usuarios falsos y sembrar la base de datos
export const seedDatabaseUsers = async () => {
  try {
    // Crear 50 usuarios con datos falsos
    const users = [];

    for (let i = 0; i < 50; i++) {
      const password = faker.internet.password(12);  // Generar una contraseña aleatoria de 12 caracteres

      const hashedPassword = await bcrypt.hash(password, 10);  // Hashear la contraseña antes de guardarla

      const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        role: faker.helpers.arrayElement(['Admin', 'User']),
        status: faker.helpers.arrayElement(['Active', 'Inactive']),
        address: {
          street: faker.location.street(),
          number: faker.location.buildingNumber(),
          city: faker.location.city(),
          postalCode: faker.location.zipCode(),
        },
        profilePicture: faker.image.avatar(),
        // Agregar datos de 2FA
        isVerified: faker.datatype.boolean(), // Aleatorio para simular usuarios con y sin verificación 2FA
        twoFactorCode: faker.datatype.boolean() ? Math.floor(100000 + Math.random() * 900000).toString() : null, // Código 2FA aleatorio
        twoFactorExpires: faker.datatype.boolean() ? Date.now() + 10 * 60 * 1000 : null, // Expiración aleatoria
        password: hashedPassword // Guardar la contraseña hasheada
      };

      users.push(user);
    }

    // Verificar si ya existen usuarios en la base de datos
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('La base de datos ya contiene usuarios, no se agregarán nuevos.');
    } else {
      // Insertar los usuarios en la base de datos
      await User.insertMany(users);
      console.log('Base de datos sembrada con 50 usuarios');
    }
  } catch (error) {
    console.error('Error al sembrar la base de datos:', error);
  } finally {
    mongoose.connection.close(); // Cerrar la conexión después de terminar
  }
};

// Conectar a la base de datos y ejecutar la siembra
mongoose.connect(process.env.MONGOOSE_URI)
  .then(seedDatabaseUsers)
  .catch(err => console.error('Error al conectar a MongoDB:', err));
