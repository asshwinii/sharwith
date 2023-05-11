const { findByIdAndUpdate, findById } = require("../model/post");
const post = require("../model/post");

exports.getALLquestions = async (req,res) =>{
    try{

       const question = await post.find({ type: "Question" });
        res.render("forum.ejs", { question });
    }
    catch{
        res.render("error.ejs");
    }
};

