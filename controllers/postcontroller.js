
const Comment = require("../model/comment");
const { findByIdAndUpdate, findById } = require("../model/post");
const post = require("../model/post");

exports.getUpvote = async (req,res) =>{
     try{
        
         const id = req.params.id;
        const blog = await post.findById({_id: id});

        const userid = req.session.user._id;
        const newupvote = [];

        blog.upvote.map( id =>{
            if(userid.toString()!= id)
            {
                newupvote.push(id);
            }     
        });
        //console.log(newupvote);
        if(blog.upvote.length == newupvote.length)
        {
            blog.upvote.push(userid.toString());
        }
         else{
            blog.upvote = newupvote;
        }
       const updatedblog = await blog.save();
        //console.log(updatedblog);
        let data = await JSON.stringify({upvote:blog.upvote.length-1});
        res.send(data);
        
        //let data = JSON.stringify({upvote: updatedblog.upvote})
     } catch (err){
        res.render("error.ejs");
    }
};




exports.getsingleBlog = async (req, res) => {

    try {

        const id = req.params.id;
        
        const blog = await post.findById({ _id: id });
        const comments = await Comment.find({ post_id: id});
       
        res.render("singleBlog.ejs", {blog:blog, comments });
    } catch (err) {
        res.render("error.ejs");
    }
};



exports.getAllblogs = async (req, res) => {

    try {

        const blogs = await post.find({ type: "Blog" });
        res.render("blog.ejs", { blogs });

    } catch (err) {
        res.render("error.ejs");
    }
};

exports.getAllnotices = async (req, res) => {
    try {
        const notices = await post.find({ type: "Notice" });
        res.render("notice.ejs", { notices });
    } catch (err) {
        res.render("error.ejs");
    }
};

exports.commentPost = async (req, res) =>{
    
    try{
        const id = req.params.id
        const comment = await Comment.create({
           
            content: req.body.content,
            type: req.body.category,
            author: req.session.user.username,
            date: new Date(),
            post_id:id ,
        });

        console.log(comment);

        let commentData= await comment.save();
        const blog = await post.findById({ _id: id });
        blog.comments.push(commentData._id);
         console.log(blog);
        res.redirect('/singleblog/'+id);
    } catch (err){
        res.render("error.ejs");
    }
};