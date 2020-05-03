const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name : { 
        type : String,
        required : true,
        min : 6,
        max : 50,
    },
    email : {
        type : String,
        reqiored : true,
        min : 6, 
        max : 255,
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 1024
    }
});


module.exports = mongoose.model("User" , userSchema);