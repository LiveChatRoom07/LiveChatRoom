const mongoose = require('mongoose');

// export mongoose

const url = `mongodb+srv://202103043:Dhruti_43@cluster0.qs6mawz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url).then(() => console.log("Connected to DB.")).catch((e) => console.log("Error:",e))