const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../../../middleware/authMiddleware');

// Register user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Get current user
router.get('/me', protect, userController.getCurrentUser);

// Get all users (admin only)
router.get('/', protect, restrictTo('admin'), userController.getAllUsers);

module.exports = router; 