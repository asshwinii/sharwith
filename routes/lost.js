const express = require("express");
const router = express.Router();
const {getALLquestions} = require("../controllers/lostcontroller");
const {isauth} = require("../middleware/auth");
const { getsingleBlog } = require("../controllers/postcontroller");
router.get("/lost",isauth, getALLquestions);
router.get("/singleBlog/:id",getsingleBlog);


module.exports =router;