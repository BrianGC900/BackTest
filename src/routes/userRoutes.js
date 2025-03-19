import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { validateUserCreation, validateUserUpdate } from '../validators/validator.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Obtener usuarios
router.get('/users', getUsers);

// Crear un nuevo usuario
router.post('/users', validateUserCreation, createUser);

// Actualizar un usuario
router.put('/users/:id', validateUserUpdate, updateUser);

// Eliminar un usuario
router.delete('/users/:id', deleteUser);

export default router;
