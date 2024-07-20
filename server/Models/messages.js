const mongoose = require('mongoose');


//message details
const messageSchema = mongoose.Schema({
    conversationId:{
        type: String,
        // required: true,
    },
    senderID:{
        type: String,
        // required: true,
    },
    message:{
        type: String
    }
});

const Messages = mongoose.model('message', messageSchema)

module.exports = Messages;