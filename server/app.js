
//import important
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const nodemailer = require('nodemailer');
const { sendEmail } = require('./Autoemail');
const io = require('socket.io')(8080, {
    cors: {
        origin: 'http://localhost:3000',
    }
});


//socket.io
let activeUsers = [];
io.on('connection', socket => {
    console.log('User Connected!', socket.id);

    //get user information on backend from frontend
    socket.on('addUser', userId => {

        const userExist = activeUsers.find(user => user.userId === userId);
        if(!userExist)
        {
            const user = {userId, socketId: socket.id};
            activeUsers.push(user);
            io.emit('getUsers', activeUsers);
        }
    });


    //send realtime messages to reciever
    socket.on('sendMessage', async ({conversationId, senderId, message, receiverId }) => {
        const receiver = activeUsers.find(user => user.userId === receiverId);
        const sender = activeUsers.find(user => user.userId === senderId);
        const user = await Users.findById(senderId);
        console.log('sender:>>', sender);
        if(receiver){
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
                conversationId, 
                senderId, 
                message, 
                receiverId,
                user: {id:user._id, email: user.email, username: user.username}
            });
        }else{
            io.to(sender.socketId).emit('getMessage', {
                conversationId, 
                senderId, 
                message, 
                receiverId,
                user: {id:user._id, email: user.email, username: user.username}
            });
        }
    });

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', activeUsers);
    })

});


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
                    // newUser.save();
                    // next();
                    const payload = {
                        email: newUser.email,
                        name: newUser.username
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_JWT_SECRET_KEY';
        
                        //create and set token using secret key and payload, set that user will remains log in for 24 hours
                    jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: 86400}, async (err, token) => {
                        // await Users.updateOne({email: newUser.email}, { 
                        //     $set: { token } 
                        // })
                        newUser.set({token})
                        newUser.save();
                        return res.status(200).json({ user: { id: newUser._id, email: newUser.email, username: newUser.username }, token: token })
                    } )
                    
                    // next();
                })
                // res.status(200).send('User registered successfully');
            }
            // const user = await Users.findOne({username});

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

//comparing email for generate OTP
app.get('/api/findUser/:email', async(req, res) => {
    try{
        
        const email = req.params.email;
        const isAlreadyExist = await Users.findOne( {email} );
        // if{isAlreadyExist}
        // console.log(isAlreadyExist);
        // res.status(200).send('Email found');
        if(!isAlreadyExist)
            res.status(200).json(0);
        else
            res.status(200).json(1);

    } catch (error) {
        console.log('error:', error);
    }
})

// Send recovery email with OTP
app.post('/api/send_recovery_email/:email', async(req, res) => {
    const {otp}=req.body;
    const email = req.params.email;
    const subject = 'Your OTP Code';
    const text = `Your OTP code is ${otp}`;
    try {
        await sendEmail(email, subject, text);
        res.status(200).send({ message: 'Recovery email sent', otp: otp });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send recovery email', error });
    }
  });

//conversation Routes_store convo_id
app.post('/api/conversation', async(req, res) => {
    try {

        //get sender and reciever id of conversation and save it as an array in coversation database
        const { senderId, receiverId } = req.body;
        const newConversation = new conversations({member: [senderId, receiverId]});
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
        const convo = await conversations.find({member: { $in: [userId]}});
        const convoData = Promise.all(convo.map(async(conversation) => {
            const receiverId = conversation.member.find((membr) => membr !== userId);

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
        if(conversationId === 'new' && receiverId) {
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
        
        const checkMessages = async (conversationId) => {
            // console.log(conversationId, 'conversationId')
            const msg = await messages.find( {conversationId} );

            //find userdata with his/her msg in given conversationid
            const msgSenderdata = Promise.all(msg.map( async(message) => {
                const user = await Users.findById(message.senderId);
                return {user: {id:user._id, email: user.email, username: user.username}, message: message.message}
            } ));

            res.status(200).json(await msgSenderdata);
        }


        //find all msgs of given convoid
        const conversationId = req.params.conversationId;

        //check whether convoid exists or not
        if (conversationId === 'new') {
            const checkConversation = await conversations.find({ member: { $all: [req.query.senderId, req.query.receiverId] } });
            if (checkConversation.length > 0) {
                checkMessages(checkConversation[0]._id);
            } else {
                return res.status(200).json([])
            }
        } else {
            checkMessages(conversationId);
        }

        
    }catch( error ){
        console.log(error, 'Error');
    }
})


//get list of all users
app.get('/api/users/:userId', async(req, res) => {
    try{
        const userId = req.params.userId;
        const users = await Users.find( {_id : {$ne : userId}});
        const sort = users.sort((a, b) => (a.username < b.username ? -1 : 1));

        //get user data
        const userdata = Promise.all(sort.map( async(user) => 
        {
            return{user: {username: user.username, email: user.email, receiverId: user._id}}
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