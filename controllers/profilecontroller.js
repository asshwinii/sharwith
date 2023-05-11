const Post = require("../model/post");

exports.profile = async (req,res) =>{

    const { username ,name ,email } = req.session.user;
    //console.log(name);
    try{
    let blogs = await Post.find({username,type:"Blog"});
    //console.log(blogs);
    let notices = await Post.find({username,type:"Notice"});
    //console.log(notices);
    res.render("profile.ejs",{blogs,notices,username,name,email});
    } catch{
        res.render("error.ejs");
    };
    
};