import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protect = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  if (!token) {
    console.log('Token no proporcionado');
    return res.status(401).json({ message: 'No autorizado, no se proporcionó token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);

    req.user = decoded;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden acceder a esta ruta.' });
    }

    next();
  } catch (error) {
    console.error('Error de verificación de token:', error);
    res.status(401).json({ message: 'Token no válido o expirado' });
  }
};

