
const express = require("express");
const router = express.Router();
const {isauth} = require("../middleware/auth");
const Post = require("../model/post");

router.get( "/singleBlog/:id/delete",function(req,res){
    const post=  Post.findById(req.params.id);
    Post.findByIdAndRemove( req.params.id , function( err ){
        if(err) console.log(err);
        else {
            if(post.type=="Found")
            res.redirect("/found");
            else if(post.type=="Lost")
            res.redirect("/lost");
            else if(post.type=="Question")
            res.redirect("/forum");
            else if(post.type=="Notice")
            res.redirect("/notice");
            else
            res.redirect("/blog");
        }
    })

});