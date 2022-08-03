const { Schema, mongoose } = require('mongoose');

const plantSchema = new Schema({
  nickname: { type: String, required: true },
  name: { type: String },
  notes: { type: String },
  tasks: [
    new Schema(
      {
        name: { type: String, required: true },
        repeatDays: { type: Number, required: true },
        time: { type: Number },
        taskDate: { type: String, required: true },
      },
      { _id: false }
    ),
  ],
  img: { type: String },
  userId: { type: mongoose.Schema.ObjectId },
});

const Plant = mongoose.model('Plant', plantSchema, 'plants');

module.exports = Plant;
