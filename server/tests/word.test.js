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
  await mongoose.connect(url, { });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Getting words without search", () => {

  test('It should get a new word', async () => {
    const response = await request(app).get('/words').send(); // this is the first word
    expect(response.statusCode).toBe(200);
    expect(response.body.term).toBe('Khar');
    expect(response.body.definition).toBe('Donkey');
    expect(response.body.usage).toBe('Khar Waksa');
  });
  test("Shouldn't get more than a new word", async () => {
    const response = await request(app).get('/words').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(undefined); //body length is undefined which means it only contains an element rather than an array 
  });

  test('It should get 5 words', async () => {
    const response = await request(app).get('/words?limit=5').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(5);
  });
});

describe("Getting words through search", () => {

  test('By term, 1st letter lower-case', async () => {
    const response = await request(app).get('/words/search?term=ukhyar').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.term).toBe('Ukhyar');
    expect(response.body.definition).toBe('Smart');
    expect(response.body.usage).toBe('Ukhyar kas de');
  });
  test('By defintion, 1st letter lower-case', async () => {
    const response = await request(app).get('/words/search?definition=donkey').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.term).toBe('Khar');
    expect(response.body.definition).toBe('Donkey');
    expect(response.body.usage).toBe('Khar Waksa');
  });
  test('By defintion and term', async () => {
    const response = await request(app).get('/words/search?definition=donkey&term=khar').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.term).toBe('Khar');
    expect(response.body.definition).toBe('Donkey');
    expect(response.body.usage).toBe('Khar Waksa');
  });
  test('Incorrect parameter value', async () => {
    const response = await request(app).get('/words/search?definition=ukhyar').send();
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Word not found');
  });
  test('Incorrect parameter value', async () => {
    const response = await request(app).get('/words/search?definition=khar&term=donkey').send();
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Word not found');
  });
});


// test('It should create a new word', async () => {
//   const response = await request(app).post('/words/add').send({
//     term: 'Aangi/Oongi',
//     definition: 'Moon',
//     usage: 'Aangi waksa (Look at the moon)',
//   });
//   expect(response.statusCode).toBe(201);
//   expect(response.body.term).toBe('Aangi/Oongi');
//   expect(response.body.definition).toBe('Moon');
//   expect(response.body.usage).toBe('Aangi waksa (Look at the moon)');
// });
