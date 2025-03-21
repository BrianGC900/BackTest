import { validationResult } from 'express-validator';
import * as userService from '../services/userServices.js';
import User from '../models/entities/User.js';
import mongoose from 'mongoose'; 


// Este es un ejemplo básico
export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

export const createUser = async (req, res) => {
  // Verificar si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

export const updateUser = async (req, res) => {
  // Verificar si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("ID recibido:", id);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    const user = await User.findOne();
    console.log("user",user)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await User.deleteOne({ _id: id });

    res.status(200).json({ message: 'Usuario eliminado correctamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};
