import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { validateUserCreation, validateUserUpdate } from '../validators/validator.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Obtener usuarios
router.get('/users', getUsers);

// Crear un nuevo usuario
router.post('/users', validateUserCreation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); 
}, createUser);

router.put('/users/:id', validateUserUpdate, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); 
}, updateUser);

router.delete('/users/:id', deleteUser);

export default router;
