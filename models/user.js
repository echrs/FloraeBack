const { Schema, mongoose } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isGoogleAuth: { type: Boolean },
  plants: { type: Array },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
