import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userFactorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  twoFactorCode: { type: String, default: '' },
  twoFactorExpires: { type: Date, default: null },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Nuevo campo
});

userFactorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserFactor = mongoose.model('UserFactor', userFactorSchema);

export default UserFactor;
