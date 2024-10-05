// const express = require('express');
// const Word = require('../models/Word');
// const router = express.Router();

// // Create a new word entry
// router.post('/add', async (req, res) => {
//   try {
//     const word = new Word(req.body);
//     await word.save();
//     res.status(201).send(word);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

// module.exports = router;