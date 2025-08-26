const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new mongoose.Schema(
    {
        name : { type: String, required: true,},
        phone : { type: String, required: true},
        message : { type: String}
    },
    { timestamps: true }
)

const Contact = mongoose.model( 'Contact', ContactSchema, 'contact');
module.exports = Contact;