const { Schema, mongoose } = require('mongoose');

const plantSchema = new Schema({
  nickname: { type: String, required: true },
  name: { type: String },
  notes: { type: String },
  tasks: { type: Array },
  img: { type: String },
  userId: { type: mongoose.Schema.ObjectId }
});

const Plant = mongoose.model('Plant', plantSchema, 'plants');

module.exports = Plant;
