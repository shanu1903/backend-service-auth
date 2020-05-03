const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/auth')
const postRoutes = require('./Routes/post')
const verify = require("./Routes/verifyToken")


app.use(bodyParser.json());

app.use('/api' , authRoutes);

app.use('/api/post/' , verify, postRoutes)

/**
 * making mongodb connection
 */

 mongoose.connect("mongodb+srv://sentinel:sentinel1903@sentinelcluster-nqvml.mongodb.net/test?retryWrites=true&w=majority" ,
 { useNewUrlParser: true },
 ()=>{
     console.log('mongoDB connected');
 },
 )

 app.get('/' , (req ,res)=>{
     res.send("hi");
 })



app.listen(3000 , ()=>{
    console.log('app is running at localhost:3000');
})