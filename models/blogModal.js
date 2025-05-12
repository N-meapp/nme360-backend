import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  date:Date,
  image:String
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog