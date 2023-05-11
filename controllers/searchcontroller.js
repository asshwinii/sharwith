
const post = require("../model/post");

exports.getsearchcontroller = (req,res) =>{
    res.render("search.ejs");
};

exports.getsearchresults = async (req,res) =>{
try{
    const type = req.body.catergory;
    const author = req.body.username;
    const title = req.body.title;
    //console.log(type,title);
    //if(author=='')
    //console.log("author");

    let Post;
    if(type!='both' && author!='' && title!=''){
      Post = await post.find({type,author,title});
    }
     else if(type!='both' && author!='')
     {
         Post = await post.find({type,author});
     }
    else if(type!='both' && title!='')
     {
          Post = await post.find({type,title});
     }
     else if(author!='' && title!='')
     {
         Post = await post.find({author,title});
    }
     else if(type!='both')
     {
          Post = await post.find({type});
     }
     else if(author!='')
     {
          Post = await post.find({author});
     }
     else if(title!='')
     {
        Post = await post.find({title});
    }
     else {
        Post = await post.find({});
    }
    
    //console.log(Post);

   res.render("searchresult.ejs",{blogs:Post});
   //res.send("hii");
} catch(err)
{
    res.render("error.ejs");
}
};
