const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^([a-zA-Z0-9]+)$/
    },
    passwordHash: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', User);