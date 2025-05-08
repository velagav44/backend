const userService = require('../services/userService');

class UserController {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const user = await userService.createUser({
        name,
        email,
        password,
        role: role || 'user'
      });

      const token = userService.generateToken(user._id);

      res.status(201).json({
        status: 'success',
        token,
        data: {
          user: userService.formatUserResponse(user)
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.findUserByEmail(email);

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({
          status: 'fail',
          message: 'Incorrect email or password'
        });
      }

      const token = userService.generateToken(user._id);

      res.status(200).json({
        status: 'success',
        token,
        data: {
          user: userService.formatUserResponse(user)
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  async getCurrentUser(req, res) {
    res.status(200).json({
      status: 'success',
      data: {
        user: userService.formatUserResponse(req.user)
      }
    });
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
          users: users.map(user => userService.formatUserResponse(user))
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }
}

module.exports = new UserController(); 