const req = require("express/lib/request");

exports.isauth = (req,res,next) =>{
    if(req.session.isloggedIn){
    
        next();
    }
    else{

        res.redirect("/login");
    }
};
   