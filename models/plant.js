const { Schema, mongoose } = require('mongoose');

const plantSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: Schema.Types.ObjectId, required: true },
});

const Plant = mongoose.model('Plant', plantSchema, 'plant');

module.exports = Plant;
