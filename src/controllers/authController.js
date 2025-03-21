import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/entities/User.js';  
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io', 
  port: 587, 
  auth: {
    user: process.env.MAILTRAP_USER,  
    pass: process.env.MAILTRAP_PASS,  
  },
});

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log("Email: ", email);
  console.log("Password: ", password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    user.isVerified = false;
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.twoFactorCode = code;
    user.twoFactorExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.MAILTRAP_USER,
      to: user.email,
      subject: 'Código de Verificación 2FA',
      text: `Tu código de verificación es: ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: `Error al enviar el código de 2FA: ${error.message}` });
      }

      res.status(200).json({ requiresTwoFactor: true, message: 'Código de verificación enviado. Ingresa el código.' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al autenticar al usuario' });
  }
};


export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role = 'user' } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

export const verifyTwoFactor = async (req, res) => {
  try {
    console.log("Cuerpo recibido en verifyTwoFactor:", req.body);
    
    const { email, code } = req.body;
    if (!email || !code) {
      console.log("Error: Email o código faltante");
      return res.status(400).json({ message: "Faltan datos en la petición" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Error: Usuario no encontrado");
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    if (user.twoFactorCode !== code || Date.now() > user.twoFactorExpires) {
      console.log("Error: Código inválido o expirado");
      return res.status(400).json({ message: "Código de verificación inválido o expirado" });
    }

    user.isVerified = true;
    user.twoFactorCode = null; 
    user.twoFactorExpires = null;
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Verificación 2FA exitosa", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al verificar el código 2FA" });
  }
};
