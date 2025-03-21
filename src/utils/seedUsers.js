import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';  
import bcrypt from 'bcryptjs'; 
import dotenv from 'dotenv';
import User from '../models/entities/User.js'; 

dotenv.config(); 

export const seedDatabaseUsers = async () => {
  try {
    const users = [];

    for (let i = 0; i < 50; i++) {
      const password = faker.internet.password(12); 

      const hashedPassword = await bcrypt.hash(password, 10); 

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
        isVerified: faker.datatype.boolean(), 
        twoFactorCode: faker.datatype.boolean() ? Math.floor(100000 + Math.random() * 900000).toString() : null, 
        twoFactorExpires: faker.datatype.boolean() ? Date.now() + 10 * 60 * 1000 : null,
        password: hashedPassword 
      };

      users.push(user);
    }

    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('La base de datos ya contiene usuarios, no se agregarán nuevos.');
    } else {
      await User.insertMany(users);
      console.log('Base de datos sembrada con 50 usuarios');
    }
  } catch (error) {
    console.error('Error al sembrar la base de datos:', error);
  } finally {
    mongoose.connection.close(); 
  }
};

mongoose.connect(process.env.MONGOOSE_URI)
  .then(seedDatabaseUsers)
  .catch(err => console.error('Error al conectar a MongoDB:', err));
