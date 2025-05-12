import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    subject: String,
    message: String
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry