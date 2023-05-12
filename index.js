require('dotenv').config();
const express = require("express");
const app = express();
const session = require("express-session");
const path = require('path');
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const mongoDBstore = require("connect-mongodb-session")(session);
const { flash } = require('express-flash-message');

const Post = require("./model/post.js");
const PORT = process.env.PORT || 3000;


const csrf = require("csurf");
const csrfProtection = csrf();


const registerRoutes = require('./routes/register');
const postRoutes = require('./routes/post');
const createRoutes = require('./routes/create');
const searchRoutes = require('./routes/search');
const profileRoutes = require('./routes/profile');
const lostRoutes = require('./routes/lost');
const foundRoutes = require('./routes/found');
const forumRoutes = require('./routes/forum');

const res = require("express/lib/response");
const { render } = require("express/lib/response");
const req = require("express/lib/request");
const { nextTick } = require("process");
const { post } = require("request");
mongoose.set('strictQuery', false);
const mongoDB_URI = "mongodb://localhost:27017/sharewith";



const store =  new mongoDBstore({
    uri : process.env.MONGO_URI,
    collection: 'sessions',
});

const connectDB = async ()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected : ${conn.connection.host}`);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

app.use(bodyparser.urlencoded({extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret:'my secret code' , resave: false , saveUninitialized: false, store:store}));
app.set("view engine","ejs");
app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(csrfProtection);
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next) =>{
    res.locals.isloggedIn = req.session.isloggedIn;

    if(req.session.user)
    res.locals.username = req.session.user.username;
    
    res.locals.csrfToken = req.csrfToken();
    next();
});


app.use(registerRoutes);
app.use(createRoutes);
app.use(postRoutes);
app.use(searchRoutes);
app.use(profileRoutes);
app.use(lostRoutes);
app.use(forumRoutes);
app.use(foundRoutes);
//app.use(deleteRoutes);



app.get("/", async(req,res) =>{
    try{
   
    res.render("home.ejs");
    } catch(err)
    {
       res.render("error.ejs");
    }
});


app.listen(PORT, () =>{
    console.log("Listening at 3000")
});

// mongoose.connect(mongoDB_URI, () => {
//     console.log("connected to db");
// });