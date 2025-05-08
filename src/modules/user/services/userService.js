const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');

const User = mongoose.model('User', userSchema);

class UserService {
  async createUser(userData) {
    return await User.create(userData);
  }

  async findUserByEmail(email) {
    return await User.findOne({ email }).select('+password');
  }

  async getAllUsers() {
    return await User.find();
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  }

  formatUserResponse(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
}

module.exports = new UserService(); 