const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: String
    },
    email: {
       type: String,
       required: true,
       unique: true 
    },
    password: {
        type: String,
        required: true
    },
    isAdministrator: {
        type: Boolean,
        default: false
    },
    isSuperAdministrator: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);

