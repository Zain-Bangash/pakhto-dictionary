const express = require('express');
const Test = require('../models/test');
const router = express.Router();

// test
router.get('/test', async (req, res) => {
  try {git 
    const test = new Test();
    res.status(201).send(test);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;