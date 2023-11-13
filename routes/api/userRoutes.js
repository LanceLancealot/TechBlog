const express = require('express');
const router = express.Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
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
  });

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // In a real application, you'd verify the password securely
    const user = await User.findOne({ where: { username, password } });

    if (!user) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;