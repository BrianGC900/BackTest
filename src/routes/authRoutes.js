import express from 'express';
import { login, verifyTwoFactor } from '../controllers/authController.js';
import { check } from 'express-validator';

const router = express.Router();

// Login
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Email inválido'),
    check('password').notEmpty().withMessage('Contraseña requerida'),
  ],
  login
);

// Verificar 2FA
router.post('/verify-2fa', [
  check('email').isEmail().withMessage('Email inválido'),
  check('code').isLength({ min: 6, max: 6 }).withMessage('Código inválido'),
], verifyTwoFactor);

export default router;
