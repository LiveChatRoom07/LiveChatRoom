const mongoose = require('mongoose');


//user conversation data like one user connected with which other users 
const conversationSchema = mongoose.Schema({
    member:{
        type: Array,
        required: true
    }
});

const conversations = mongoose.model('conversation', conversationSchema)

module.exports = conversations;