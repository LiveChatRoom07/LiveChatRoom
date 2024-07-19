const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('./db/connection');
const Users = require('./Models/Users');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World');
})

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
                res.status(400).json({msg: 'Username already exists'});
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

app.listen(port, () => {
  console.log('Server is running on port' + port);
})