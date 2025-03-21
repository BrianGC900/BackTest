import User from '../models/entities/User.js';
import mongoose from 'mongoose';

export const getUsers = async ({ page, limit, role, status, search }) => {
  let query = {};

  if (role) query.role = role;
  if (status) query.status = status;
  if (search) {
    query = {
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    };
  }

  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .exec();

  const totalUsers = await User.countDocuments(query);
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    totalUsers,
    totalPages,
    currentPage: parseInt(page),
  };
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  const { firstName, lastName, email, phoneNumber, role, status, address, profilePicture } = userData;

  const newUser = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    status,
    address,
    profilePicture,
  });

  await newUser.save();
  return newUser;
};

// Actualizar un usuario por ID
export const updateUser = async (id, userData) => {
  const { firstName, lastName, email, phoneNumber, role, status, address, profilePicture } = userData;

  const user = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, email, phoneNumber, role, status, address, profilePicture },
    { new: true }
  );

  return user;
};
