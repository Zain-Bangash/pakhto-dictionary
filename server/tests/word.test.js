const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Word = require('../models/Word');
const wordRoutes = require('../routes/wordRoutes');

const app = express();
app.use(express.json());
app.use('/words', wordRoutes);

beforeAll(async () => {
  const url = 'mongodb+srv://Bangakh:bangakh101@cluster0.oq0rk.mongodb.net/';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('It should create a new word', async () => {
  const response = await request(app).post('/words/add').send({
    term: 'Aangi/Oongi',
    definition: 'Moon',
    usage: 'Aangi waksa (Look at the moon)',
  });
  expect(response.statusCode).toBe(201);
  expect(response.body.term).toBe('Aangi/Oongi');
  expect(response.body.definition).toBe('Moon');
  expect(response.body.usage).toBe('Aangi waksa (Look at the moon)');
});
