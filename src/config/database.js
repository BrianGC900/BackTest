import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGOOSE_URI;

    await mongoose.connect(mongoURI, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    });

    console.log('Conexión a MongoDB exitosa');

    process.on('SIGINT', async () => {
      console.log('Conexión a MongoDB cerrada');
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
