const express = require("express");
const path = require("path");
const { getsingleBlog, getAllblogs, getAllnotices, getUpvote, commentPost  }= require("../controllers/postcontroller");
const router = express.Router();
const auth = require("../middleware/auth");
const Post = require("../model/post");


router.get("/singleBlog/:id",auth.isauth,getsingleBlog);
router.get("/singleBlog/upvote/:id", getUpvote);
router.post("/singleBlog/:id/create",commentPost);
router.get("/blog", auth.isauth ,getAllblogs);
router.get("/notice", auth.isauth ,getAllnotices);

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


module.exports =router;