import { body } from 'express-validator';

export const validateUserCreation = [
  body('firstName').notEmpty().withMessage('El nombre es obligatorio'),
  body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
  body('email').isEmail().withMessage('El correo electrónico es inválido'),
  body('phoneNumber').notEmpty().withMessage('El número de teléfono es obligatorio'),
  body('role').isIn(['Admin', 'User']).withMessage('El rol debe ser Admin o User'),
  body('status').isIn(['Active', 'Inactive']).withMessage('El estado debe ser Active o Inactive'),
  body('address.street').notEmpty().withMessage('La calle es obligatoria'),
  body('address.number').notEmpty().withMessage('El número es obligatorio'),
  body('address.city').notEmpty().withMessage('La ciudad es obligatoria'),
  body('address.postalCode').notEmpty().withMessage('El código postal es obligatorio'),
  body('profilePicture').isURL().withMessage('La URL de la imagen del perfil es inválida'),
];

export const validateUserUpdate = [
  body('firstName').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('lastName').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
  body('email').optional().isEmail().withMessage('El correo electrónico es inválido'),
  body('phoneNumber').optional().notEmpty().withMessage('El número de teléfono es obligatorio'),
  body('role').optional().isIn(['Admin', 'User']).withMessage('El rol debe ser Admin o User'),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('El estado debe ser Active o Inactive'),
  body('address.street').optional().notEmpty().withMessage('La calle es obligatoria'),
  body('address.number').optional().notEmpty().withMessage('El número es obligatorio'),
  body('address.city').optional().notEmpty().withMessage('La ciudad es obligatoria'),
  body('address.postalCode').optional().notEmpty().withMessage('El código postal es obligatorio'),
  body('profilePicture').optional().isURL().withMessage('La URL de la imagen del perfil es inválida'),
];
