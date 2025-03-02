const express = require('express');
const Word = require('../models/Word');
const router = express.Router({ mergeParams: true });



// Get a word (limit = how many words to get)
router.get('/', async (req, res) => {
  try {

    // Check if the `limit` query parameter is provided
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    // Fetch words from the database with optional limit
    const words = limit ? await Word.find({approved: true}).limit(limit) : await Word.findOne({approved: true});
    
    res.status(200).send(words);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/add', async (req, res) => {
  try {
    const existingWord = await Word.findOne({ term: req.body.term });
    
    if (existingWord) {
      return res.status(400).json({ error: "This word already exists in the dictionary!" });
    }

    const word = new Word(req.body);
    await word.save();
    res.status(201);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ error: "Duplicate word entry! This term already exists." });
    }
    res.status(500).json({ error: "Internal server error, please try again!" });
  }
});


//Get a specific word (parameters should be lower case)
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
        if(findResult == null){
          res.status(404).send('Word not found')
        } else{
          res.status(200).send(findResult);
        }
    } catch (e) {
        console.log("error", e.message);
        res.status(400).send(e.message);
    }
});

module.exports = router;  