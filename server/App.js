const express = require('express');

const app = express();

//Connect DB

require('./db/connection');


//Import Files

const Users = require('./Models/Users')

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Routes

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log('Server is running on port' + port);
})