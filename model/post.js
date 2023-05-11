const mongoose = require("mongoose");


const postschema = new mongoose.Schema({
    title:{
     type:String,
     required: true,
    },
    type:{
        type: String,
        required:true,
    },
    content:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    date :{
        type: Date,
        required:true,
    },
    upvote:{
        type: Array,
    },
    image:{
        type: String,
    },
    comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
});

module.exports = mongoose.model('post',postschema);