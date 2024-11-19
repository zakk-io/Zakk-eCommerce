const { log } = require("console");
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")



const app = express()
//contect to ecommerce database in mongodb server
mongoose.connect("mongodb://localhost:27017/ecommerce",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected!'));


//middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))



app.listen(7000,() => console.log("server is listening on port 7000"))