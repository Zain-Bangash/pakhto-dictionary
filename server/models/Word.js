const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const wordSchema = new Schema({
  term: String,
  definition: String,
  usage: String,
});

const Word = model('Word', wordSchema);

module.exports = Word;
