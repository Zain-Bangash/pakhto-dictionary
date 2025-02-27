const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const wordSchema = new Schema({
  term: { type: String, unique: true, required: true }, // Ensures uniqueness
  definition: { type: String, required: true },
  usage: { type: String, required: true }
});

const Word = model('Word', wordSchema);

module.exports = Word;