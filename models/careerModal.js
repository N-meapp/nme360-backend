import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  position: String,
  skills: String,
  experience:String,
});

const Career = mongoose.model('Career', careerSchema);

export default Career;