
exports.isauth = (req,res,next) =>{
    if(req.session.isloggedIn){
    
        res.redirect("/login");
    }
    else{

       next();
    }
};
   