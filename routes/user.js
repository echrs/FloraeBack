const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = require('../models/user');

const secret = process.env.JWT_SECRET;

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret);
    res.status(200).json({ message: 'Successful login', data: { userId: existingUser._id, email: existingUser.email, token: token } });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', data: { error: error } });
  }
});

router.route('/register').post(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret);
    res.status(200).json({ message: 'Successful registration', data: { userId: result._id, name: result.name, email: result.email, token: token } });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', data: { error: error } });
  }
});

module.exports = router;
