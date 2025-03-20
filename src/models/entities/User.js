import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'User'], 
    default: 'User',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'], 
    default: 'Active',
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  profilePicture: {
    type: String,
    required: false,
    default: '',
  },

  // Campos para 2FA
  isVerified: {
    type: Boolean,
    default: false, // Por defecto, el usuario no está verificado
  },
  twoFactorCode: {
    type: String,
  },
  twoFactorExpires: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
