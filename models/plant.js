const { Schema, mongoose } = require('mongoose');

const plantSchema = new Schema({
  nickname: { type: String, required: true },
  name: { type: String },
  notes: { type: String },
  tasks: [
    new Schema(
      {
        taskName: { type: String, required: true },
        taskDays: { type: Number, required: true },
        taskTime: { type: Number, required: true },
        taskDate: { type: String, required: true },
        taskFieldName: { type: String },
      },
      { _id: false }
    ),
  ],
  img: { type: String },
  userId: { type: mongoose.Schema.ObjectId },
});

const Plant = mongoose.model('Plant', plantSchema, 'plants');

module.exports = Plant;
