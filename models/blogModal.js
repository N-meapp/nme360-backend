const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  date:Date,
  image:String
});

module.exports = mongoose.model('Blog', blogSchema);
