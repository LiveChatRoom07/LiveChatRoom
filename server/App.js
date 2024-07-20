
//import important
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//connect DB
require('./db/connection');


//import files
const Users = require('./Models/Users');
const Messages = require('./Models/Messages');
const conversations = require('./Models/Conversations');

//app use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.PORT || 8000;


//Routes
app.get('/', (req, res) => {
  res.send('Hello World');
})

//set user data in DB while register_Register Route
app.post('/api/register', async(req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({msg: 'Please enter all fields'});
        }
        else{
            const isAlreadyExist = await Users.findOne({email});
            const isAlreadyExistuser = await Users.findOne({username});
            if(isAlreadyExist){
                res.status(400).json({msg: 'User already exists'});
            }
            else if(isAlreadyExistuser){
                res.status(400).json({msg: 'username already exists'});
            }
            else{
                const newUser= new Users({username, email});
                bcryptjs.hash(password, 10, (err, hashedpassword) => {
                    newUser.set('password', hashedpassword);
                    newUser.save();
                    next();
                })
                return res.status(200).json({msg: 'User registered successfully'});
            }
        }
    } catch (error) {
        console.log('error:', error);
    }
})

//update userdata in DB while login_Login Route
app.post('/api/login', async(req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({msg: 'Please enter all fields'});
        }
        else{
            const user = await Users.findOne({username});
            if(!user){
                res.status(400).json({msg: 'Username or password is incorrect'});
            }
            else{
                const validUser= await bcryptjs.compare(password,user.password);
                if(!validUser){
                    res.status(400).json({msg: 'Username or password is incorrect'});
                }else{
                    const payload = {
                        userid: user._id,
                        name: user.username
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_JWT_SECRET_KEY';

                    jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: 86400}, async (err, token) => {
                        await Users.updateOne({_id: user._id}, { 
                            $set: { token } 
                        })
                        user.save();
                        next();
                    } )

                    res.status(200).json({ user })
                }
                
            }

        }

    } catch (error) {
        console.log('error:', error);
    }
})


//conversation Routes_store convo_id
app.post('/api/conversation', async(req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newConversation = new conversations({member: [senderId, receiverId]});
        await newConversation.save();
        res.status(200).json({msg: 'Conversation created successfully'});
    } catch (error) {
        console.log(error, 'Error');
    }
})

//get all user details in chatlist 
app.get('/api/conversation/:userId', async(req, res) => {
    try {
        const userId = req.params.userId;
        const convo = await conversations.find({member: { $in: [userId]}});
        const convoData = Promise.all(convo.map(async(conversation) => {
            const receiverId = conversation.member.find((membr) => membr !== userId);
            const user= await Users.findById(receiverId);
            return { user: { receiverId: user._id, email: user.email, username: user.username }, conversationId: conversation._id }
        }))

        res.status(200).json(await convoData);

    } catch (error) {
        console.log(error, 'Error');  
    }
})


//Message Routes
app.post('/api/messages', async(req, res) => {
    try {
        const {conversationId, senderId, message } = req.body;
        const newMessage = new messages({conversationId, senderId, message});
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    }catch( error ){
        console.log(error, 'Error');
    }
})

app.get('/api/messages/conversationId', async(req, res) => {
    try{

        const conversationId = req.params.conversationId;
        const msg = await messages.find( {conversationId} );

    }catch( error ){
        console.log(error, 'Error');
    }
})

app.listen(port, () => {
  console.log('Server is running on port' + port);
})