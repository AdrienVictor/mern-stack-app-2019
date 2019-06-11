const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentsSchema = new Schema({
  name: { type: String },
  country: { type: String },
  age: { type: Number },
  bio: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = Student = mongoose.model('students', studentsSchema);
