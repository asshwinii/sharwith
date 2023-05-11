const mongoose = require("mongoose");
 
const commentschema = new mongoose.Schema({
    type:{
        type: String,
        required:true,
    },
    content:{
        type: String,
        required: true,
    },
    author:{
        type:String,
        required: true,
    },
    date :{
        type: Date,
        required:true,
    },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
});

module.exports = mongoose.model('comment',commentschema);