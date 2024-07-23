
//import important
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//connect DB
require('./db/connection');


//import files
const Users = require('./Models/Users');
const messages = require('./Models/Messages');
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

        //get user details via new registration
        const { username, email, password } = req.body;

        //check if none of the required feild are empty
        if (!username || !email || !password) {
            res.status(400).send('Please enter all fields');
        }
        else{

            //check if email address is already exists
            const isAlreadyExist = await Users.findOne({email});

            //check if username is not unique
            const isAlreadyExistuser = await Users.findOne({username});

            if(isAlreadyExist){
                res.status(400).send('User already exists');
            }
            else if(isAlreadyExistuser){
                res.status(400).send('username already exists');
            }
            else{

                //save user details in DB
                const newUser= new Users({username, email});

                //save encrypted password
                bcryptjs.hash(password, 10, (err, hashedpassword) => {
                    newUser.set('password', hashedpassword);
                    newUser.save();
                    next();
                })
                return res.status(200).send('User registered successfully');
            }
        }
    } catch (error) {
        console.log('error:', error);
    }
})

//update userdata in DB while login_Login Route
app.post('/api/login', async(req, res, next) => {
    try {

        //get user details while login
        const { username, password } = req.body;

        //check whether anything is not empty
        if (!username || !password) {
            res.status(400).send('Please enter all fields');
        }
        else{

            //find that userName is already exits or not and if not then response an error
            const user = await Users.findOne({username});
            if(!user){
                res.status(400).send('Username or password is incorrect');
            }
            else{

                //check whether encrypted password of user is as same as given password
                const validUser= await bcryptjs.compare(password,user.password);
                if(!validUser){
                    res.status(400).send('Username or password is incorrect');
                }else{

                    //if user and and password match then update the user details by creating user's token
                    //make payload using userid and username
                    const payload = {
                        userid: user._id,
                        name: user.username
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_JWT_SECRET_KEY';

                    //create and set token using secret key and payload, set that user will remains log in for 24 hours
                    jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: 86400}, async (err, token) => {
                        await Users.updateOne({_id: user._id}, { 
                            $set: { token } 
                        })
                        user.save();
                        return res.status(200).json({ user: { id: user._id, email: user.email, username: user.username }, token: token })
                    } )
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

        //get sender and reciever id of conversation and save it as an array in coversation database
        const { senderId, receiverId } = req.body;
        const newConversation = new conversations({members: [senderId, receiverId]});
        await newConversation.save();
        res.status(200).send('Conversation created successfully');
    } catch (error) {
        console.log(error, 'Error');
    }
})

//get all user details in chatlist 
app.get('/api/conversation/:userId', async(req, res) => {
    try {

        //find ids all friends of an user using its userid and conversation database
        const userId = req.params.userId;
        const convo = await conversations.find({members: { $in: [userId]}});
        const convoData = Promise.all(convo.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);

            //find all details of friend using their ids
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
        //save convoid, senderid and msg into dataset
        const {conversationId, senderId, message, receiverId='' } = req.body;

        if(!senderId || !message) return res.status(400).send("fill all required feilds");

        //usefull while making new connections_creating new convo if this is first msg
        if(!conversationId && receiverId) {
            const newConversation = new conversations({member: [senderId, receiverId]});
            await newConversation.save();
            const newMessage = new messages({conversationId: newConversation._id, senderId, message});
            await newMessage.save();
            return res.status(200).send('Message sent successfully');
        }else if(!conversationId && !receiverId){
            return res.status(400).send("fill all required feilds");
        }

        const newMessage = new messages({conversationId, senderId, message});
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    }catch( error ){
        console.log(error, 'Error');
    }
})

app.get('/api/messages/:conversationId', async(req, res) => {
    try{
        
        //find all msgs of given convoid
        const conversationId = req.params.conversationId;

        //check whether convoid exists or not
        if(!conversationId) return res.status(200).json([]);

        const msg = await messages.find( {conversationId} );

        //find userdata with his/her msg in given conversationid
        const msgSenderdata = Promise.all(msg.map( async(message) => {
            const user = await Users.findById(message.senderId);
            return {user: {Name: user.username}, message: message.message}
        } ));

        res.status(200).json(await msgSenderdata);
    }catch( error ){
        console.log(error, 'Error');
    }
})


//get list of all users
app.get('/api/users', async(req, res) => {
    try{
        const users = await Users.find();

        //get user data
        const userdata = Promise.all(users.map( async(user) => 
        {
            return{user: {name: user.username, email: user.email}, userId: user._id}
        }));
        res.status(200).json(await userdata);
    }
    catch( error ){
        console.log(error, 'Error');
    }
})

app.listen(port, () => {
  console.log('Server is running on port' + port);
})


//we will be using convo id for finding out whether this is our first conversation(msg) or not and if so then we will add it to conversation database.