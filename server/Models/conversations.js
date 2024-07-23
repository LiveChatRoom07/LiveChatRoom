const mongoose = require('mongoose');


//user conversation data like one user connected with which other users 
const conversationSchema = mongoose.Schema({
    members:{
        type: Array,
        required: true
    }
});

const Conversations = mongoose.model('conversation', conversationSchema)

module.exports = Conversations;