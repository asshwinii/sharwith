const Post = require("../model/post");
const User = require("../model/user");
const username = require("../array.js");
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
let n="";
const storage = multer.diskStorage({                    //changes
    destination : 'public/uploads',
    filename : function(req, file, cb) {
        n = 'file'+Date.now()+ path.extname(file.originalname);
        cb(null, n);
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: function( req, file, cb) {
     const validateExtension = ['.png','.jpg','.jpeg'];
     const ext = path.extname(file.originalname);
     if(!validateExtension.includes(ext)){
        return(cb(new Error("Please choose a '.png','.jpg' or '.jpeg' file ")));
     }
     cb(null, true);
    },
    limits: {fileSize: 125000 * 10},
 });

 exports.fileUpload = (req,res, next) => { 
    upload.single('file')( req, res, (err)=>{
    if( err){
        res.render("error.ejs");
    }
    else{
        console.log(req.body);
        next();
    }
})};

exports.createPosttemp = async (req, res) => {  
        
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
            image:n,
            hashtags:hashtag,
        });

        console.log(post);
        
        n="";
       // Nodemailer

       const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ashwinisinghh76@gmail.com',
          pass: 'gsjykdypnpjbnaxj'
        }
      });
      
      

      const mailOptions = {

        from: 'ashwinisinghh76@gmail.com',
        to: 'iec2019016@iiita.ac.in,iec2019017@iiita.ac.in,iec2019018@iiita.ac.in',
        subject: 'ShareWith',
        text: `Something new waitng for you. Open your sharewith account to check.`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
       // ends


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