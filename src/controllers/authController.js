import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userFactor.js';
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de nodemailer (para enviar el código de verificación)
const transporter = nodemailer.createTransport({
  service: 'gmail', // o cualquier otro servicio de correo
  auth: {
    user: process.env.EMAIL_USER, // correo de envío
    pass: process.env.EMAIL_PASS, // contraseña de correo
  },
});

// Endpoint de Login
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Si 2FA está habilitado, generar y enviar un código
    if (!user.isVerified) {
      const code = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
      user.twoFactorCode = code;
      user.twoFactorExpires = Date.now() + 10 * 60 * 1000; // El código expira en 10 minutos
      await user.save();

      // Enviar código por correo
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Código de Verificación 2FA',
        text: `Tu código de verificación es: ${code}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Error al enviar el código de 2FA' });
        }
        res.status(200).json({ message: 'Código de verificación enviado. Ingresa el código.' });
      });
    } else {
      res.status(200).json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al autenticar al usuario' });
  }
};

// Endpoint para verificar el código 2FA
export const verifyTwoFactor = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.twoFactorCode !== code || Date.now() > user.twoFactorExpires) {
      return res.status(400).json({ message: 'Código de verificación inválido o expirado' });
    }

    user.isVerified = true;
    user.twoFactorCode = '';
    user.twoFactorExpires = null;
    await user.save();

    // Generar JWT final
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al verificar el código de 2FA' });
  }
};
