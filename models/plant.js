const { Schema, mongoose } = require('mongoose');

const plantSchema = new Schema({
  nickname: { type: String, required: true },
  name: { type: String },
  notes: { type: String },
  tasks: [taskSchema],
  img: { type: String },
  userId: { type: mongoose.Schema.ObjectId },
});

const taskSchema = new Schema({
  name: { type: String, required: true },
  repeatDays: { type: Number, required: true },
  time: { type: Number },
  taskDate: { type: String, required: true },
});

const Plant = mongoose.model('Plant', plantSchema, 'plants');

module.exports = Plant;
