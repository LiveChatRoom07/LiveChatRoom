const express = require('express');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('api/register', (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({msg: 'Please enter all fields'});
        }
        else{
            const isAlreadyExist = await User.findOne({email});
            const isAlreadyExistuser = await User.findOne({username});
            if(isAlreadyExist){
                res.status(400).json({msg: 'User already exists'});
            }
            else if(isAlreadyExistuser){
                res.status(400).json({msg: 'Username already exists'});
            }
            else{
                const newUser= new User({username, email, password});
            }

        }

    } catch (error) {
        
    }
})

app.listen(port, () => {
  console.log('Server is running on port' + port);
})