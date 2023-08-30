const mongoose = require('mongoose');

const message = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rigisteruser'
    },
    username: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('message',message)