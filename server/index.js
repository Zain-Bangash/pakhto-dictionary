const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS middleware

const app = express();

// Enable CORS for all requests
app.use(cors());

// Use JSON middleware
app.use(express.json());

const uri =
"mongodb+srv://Bangakh:bangakh101@cluster0.oq0rk.mongodb.net/";
// Create a new MongoClient
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Define routes
// const wordRoutes = require('./routes/wordRoutes');
// app.use('/words', wordRoutes);

//TEST
const test = require('./routes/testRoute')
app.use('/api', test);



// Start the server
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
