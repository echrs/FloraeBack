const { Schema, mongoose } = require("mongoose");

const taskSchema = new Schema({
  name: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema, 'task');

module.exports = Task;
