const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
       type: String,
       required: true 
    },
    telephone: {
        type: String
    },
    objet: {
        type: String
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);