const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', Post);