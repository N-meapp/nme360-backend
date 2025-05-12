const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  position: String,
  skills: String,
  experience:String,
});

module.exports = mongoose.model('Career', careerSchema);
