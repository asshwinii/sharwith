const mongoose = require("mongoose");


const userschema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    email :{
        type : String,
        required:true,
        unique: true,
    },
    username: {
        type:String,
        unique:true,
    },
    password :{
        type:String,
        required: true,
    },
    posts :{
        type:Array,
    },
   
});

module.exports = mongoose.model('user',userschema);