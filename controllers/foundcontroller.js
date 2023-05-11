const { findByIdAndUpdate, findById } = require("../model/post");
const post = require("../model/post");

exports.getALLquestions = async (req,res) =>{
    try{

       const found = await post.find({ type: "Found" });
        res.render("found.ejs", { found });
    }
    catch{
        res.render("error.ejs");
    }
};