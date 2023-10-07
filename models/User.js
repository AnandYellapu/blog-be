// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // role: { type: String, enum: ['user', 'admin'], default: 'admin' },
 isAdmin: {
    type: Boolean,
    default: false, 
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
});

module.exports = mongoose.model('User', userSchema);
