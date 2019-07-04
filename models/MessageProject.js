const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    beginningDate: {
        type: Date
    },
    company: {
        type: String
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
    typeMessage: {
        type: String,
        default: 'indefined'
    },
    date: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean
    }
});

module.exports = MessageProject = mongoose.model('projectmessage', MessageProjectSchema);