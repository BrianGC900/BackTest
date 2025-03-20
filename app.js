import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js'; 
import userRoutes from './src/routes/userRoutes.js'; 
import authRoutes from './src/routes/authRoutes.js';
import { protect } from './src/middleware/authMiddleware.js';
import cors from 'cors'; 
// import './src/utils/seed.js'
// import './src/utils/seedUsers.js' 

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Especificar el origen del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Permitir el envío de cookies y credenciales
}));

connectDB();

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes); 
app.use('/api', userRoutes); 
app.get('/api/protected', protect, (req, res) => {
    res.status(200).json({ message: 'Acceso autorizado', userId: req.user.userId });
});

// Ruta raíz 
app.get('/', (req, res) => {
    res.send(`<pre>Nothing to see here.\nCheckout README.md to start.</pre>`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal', error: err.message });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
