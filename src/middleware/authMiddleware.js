import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protect = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  
  // Si no hay token, devolver un error de no autorizado
  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no se proporcionó token' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Guardar los datos decodificados (userId y role)
    req.user = decoded;
    
    // Si es necesario, verificar el rol (admin, user, etc.)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden acceder a esta ruta.' });
    }

    next(); // Si todo es correcto, permitir el acceso a la siguiente función
  } catch (error) {
    // Si el token es inválido o ha expirado
    res.status(401).json({ message: 'Token no válido o expirado' });
  }
};
