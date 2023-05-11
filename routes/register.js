const express = require("express");
const req = require("express/lib/request");

const {logincontroller , signupcontroller , postlogin , postsigup , logoutcontroller} = require("../controllers/registercontroller");

const router = express.Router();

router.get("/login",logincontroller);

router.get("/signup",signupcontroller);

router.post("/signup",postsigup);
router.post("/login",postlogin);

router.get("/logout",logoutcontroller);
module.exports = router;