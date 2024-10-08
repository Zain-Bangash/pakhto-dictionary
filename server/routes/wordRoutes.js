const express = require('express');
const Word = require('../models/Word');
const router = express.Router({ mergeParams: true });

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

// Get a word
router.get('/', async (req, res) => {
  try {
    // const findResult = await Word.findOne(); //Word.find().limit(limit);

    // Check if the `limit` query parameter is provided
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    // Fetch words from the database with optional limit
    const words = limit ? await Word.find().limit(limit) : await Word.findOne();
    
    res.status(200).send(words);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Get a specific word
router.get('/search', async (req, res) => {
    try {
        var {term, definition} = req.query;
        let findResult;
        
        term = term ? term[0].toUpperCase() + term.substring(1).toLowerCase() : undefined;
        definition = definition ? definition[0].toUpperCase() + definition.substring(1).toLowerCase() : undefined;


        if(term && definition){
            findResult = await Word.findOne({term: term, definition: definition}).exec(); 
        }else if(term){
            findResult = await Word.findOne({term: term}).exec(); 
        }else if (definition){
            findResult = await Word.findOne({definition: definition}).exec(); 
        }
        res.status(200).send(findResult);
    } catch (e) {
        console.log("error", e.message);
        res.status(400).send(e.message);
    }
});

module.exports = router;