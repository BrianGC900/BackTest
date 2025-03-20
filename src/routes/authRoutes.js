import express from 'express';
import { login, verifyTwoFactor, register } from '../controllers/authController.js';
import { check } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';

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

router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Debe ser un correo válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('role').optional().isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user"'),
  ],
  register
);

// Verificar 2FA
router.post('/verify-2fa', [
  check('email').isEmail().withMessage('Email inválido'),
  check('code').isLength({ min: 6, max: 6 }).withMessage('Código inválido'),
], verifyTwoFactor);

router.get('/protected', protect, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida accedida', user: req.user });
});

export default router;
