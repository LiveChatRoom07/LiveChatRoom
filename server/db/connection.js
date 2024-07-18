const mongoose = require("mongoose");

// export mongoose

const url = `mongodb+srv://Jahnvee:Jahnvee_012@cluster0.3pkjq5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB.")).catch((e) => console.log("Error:",e))