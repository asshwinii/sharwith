
const User = require("../model/user");
const bcrypt = require ('bcrypt');
const { findOne } = require("../model/user");

exports.logoutcontroller = async (req,res) =>{
    
   await req.session.destroy();
    res.redirect("/");
};


exports.postsigup = async (req,res) =>{
    let fullname = req.body.fname +' '+ req.body.lname , email = req.body.email , password = req.body.password, confrim = req.body.confrim ;
    //console.log(fullname,password,email);
    let check = User.findOne({email});
    if(password!= confrim ){
        await req.flash('message',"password not matched");
        res.redirect("/signup");
    }
    else if(check==email){
        await req.flash('message', "user already exists");
        res.redirect("/login");
    }
    else{

    let username = email.split("@")[0];

    let hashedpassword = await bcrypt.hash(password, 12);
   // console.log(hashedpassword);
try{
    const user = await User.create({
        name : fullname,
        email : email,
        password : hashedpassword,
        username: username,
        posts: [{}],
    });
    
    //console.log(user);
    req.session.isloggedIn =true;
    req.session.user = user;
}catch (err){
    res.render("error.ejs");
}
    res.redirect("/");
};
};
exports.postlogin = async (req,res) =>{
    let username = req.body.email.split("@")[0];
    try{
    let user =  await User.findOne({username});

    if(user)
    {
        let hashedpassword = user.password , password = req.body.password;
        const result =  await bcrypt.compare(password, hashedpassword);
       if(result){
        req.session.isloggedIn = true;
        req.session.user = user;
        res.redirect("/");
       }
       else{
         await req.flash('message', "Invalid password");
         res.redirect("/login");
       }
    }
    else{
        await req.flash('message', "Invalid username");
        res.redirect("/login");
    }
  } catch(err)
     {
         res.render("error.ejs");
     }
};

exports.logincontroller = async (req,res) =>{
   const csrfToken = req.csrfToken(); 
    const message = await req.consumeFlash('message');
    res.render("login.ejs",{message:message[0]});
};

exports.signupcontroller = async(req,res) =>{
    const message = await req.consumeFlash('message');
    res.render("signup.ejs",{message:message[0]});
};




