// const mongoose = require('mongoose');
// const wordSchema = new mongoose.Schema({
//   term: String,
//   definition: String,
//   usage: String,
// });

class Test{
    constructor(){
        this.name = "Test";
        this.message = "Testing";
    }
    
    toString(){
        return "name " + this.name + ", message " + this.message;
    }
}

module.exports = Test;
