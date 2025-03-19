import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';  // Asegúrate de que estás importando faker correctamente
import dotenv from 'dotenv';
import User from '../models/entities/User.js'; // Asegúrate de que la ruta es correcta

dotenv.config(); // Cargar variables de entorno desde un archivo .env

export const seedDatabaseUsers = async () => {
  try {
    // Crear 50 usuarios con datos falsos
    const users = [];

    for (let i = 0; i < 50; i++) {
      const user = {
        firstName: faker.person.firstName(),  // Cambio aquí: usar faker.person
        lastName: faker.person.lastName(),    // Cambio aquí: usar faker.person
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),    // Cambio aquí: usar faker.phone.number
        role: faker.helpers.arrayElement(['Admin', 'User']),
        status: faker.helpers.arrayElement(['Active', 'Inactive']),
        address: {
          street: faker.location.street(),   // Cambio aquí: usar faker.location.street()
          number: faker.location.buildingNumber(), // Usar faker.location
          city: faker.location.city(), // Usar faker.location
          postalCode: faker.location.zipCode(), // Usar faker.location
        },
        profilePicture: faker.image.avatar(),
      };

      users.push(user);
    }

    // Verificar si ya existen usuarios
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

mongoose.connect(process.env.MONGOOSE_URI)
  .then(seedDatabaseUsers)
  .catch(err => console.error('Error al conectar a MongoDB:', err));

