const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    subject: String,
    message: String
});

module.exports = mongoose.model('Enquiry', enquirySchema);
