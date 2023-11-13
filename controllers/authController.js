const { User } = require('../models');

const authController = {
  // Signup route
  signup: async (req, res) => {
    try {
      const { username, password } = req.body;

      const newUser = await User.create({
        username,
        password,
      });

      res.json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Login route
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user || !user.checkPassword(password)) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
      }

      res.json({ message: 'Login successful', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = authController;