const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let auth = require('../auth');
let User = require('../models/user');

const secret = process.env.JWT_SECRET;

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: { $regex: email, $options: 'i' } });
    if (!existingUser) return res.status(404).send("User doesn't exist");
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(401).send('Invalid credentials');
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret);
    res.status(200).json({ userId: existingUser._id, name: existingUser.name, email: existingUser.email, token: token });
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
});

router.route('/register').post(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: { $regex: email, $options: 'i' } });
    if (existingUser) return res.status(400).send('User already exists');
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret);
    res.status(201).json({ userId: result._id, name: result.name, email: result.email, token: token });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

router.route('/:id').patch(auth, async (req, res) => {
  const { name, email, password } = req.body;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    User.findByIdAndUpdate(req.params.id, { password: hashedPassword })
      .then(() => res.status(200).json({ response: 'Successfully updated' }))
      .catch((err) => res.status(500).send('Something went wrong'));
  } else if (name && email) {
    User.findByIdAndUpdate(req.params.id, { name: name, email: email })
      .then(() => res.status(200).json({ response: 'Successfully updated' }))
      .catch((err) => res.status(500).send('Something went wrong'));
  }
});

module.exports = router;
