const mongoose = require('mongoose');


//message details
const messageSchema = mongoose.Schema({
    conversationId:{
        type: String
    },
    senderId:{
        type: String
    },
    message:{
        type: String
    }
});

const Messages = mongoose.model('message', messageSchema)

module.exports = Messages;