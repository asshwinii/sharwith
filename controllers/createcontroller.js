const Post = require("../model/post");

exports.getPostInput =(req,res) =>{
    res.render("create.ejs");
};

exports.createPost = async (req, res) => {  
    
    
    try{
        
        let words = req.body.content.split(" ");
        let hashtag =words.filter(st => st.startsWith( "#"));
    
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            type: req.body.category,
            author: req.session.user.username,
            date: new Date(),
            upvote: 0,
            downvote: 0,
            hashtags:hashtag,
        });

        console.log(post);

        
        
       if(req.body.category =="Blog")
         res.redirect("/blog");
        else if(req.body.category =="Notice")
          res.redirect("/notice"); 
        else if(req.body.category == "Question")
          res.redirect("/forum");
        else if(req.body.category == "Found")
          res.redirect("/found");
        else if(req.body.category == "Lost")
           res.redirect("/lost");    

    }catch (err){
        res.render("error.ejs");
    }
};

