const { Schema, mongoose } = require('mongoose');

const plantSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  tasks: { type: Array }
});

const Plant = mongoose.model('Plant', plantSchema, 'plants');

module.exports = Plant;
