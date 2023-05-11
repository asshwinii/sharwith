const { findByIdAndUpdate, findById } = require("../model/post");
const post = require("../model/post");

exports.getALLquestions = async (req,res) =>{
    try{

       const lost = await post.find({ type: "Lost" });
        res.render("lost.ejs", { lost });
    }
    catch{
        res.render("error.ejs");
    }
};