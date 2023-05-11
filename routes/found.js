const express = require("express");
const router = express.Router();
const {getALLquestions} = require("../controllers/foundcontroller");
const {isauth} = require("../middleware/auth");
const { getsingleBlog } = require("../controllers/postcontroller");
router.get("/found",isauth, getALLquestions);
router.get("/singleBlog/:id",getsingleBlog);


module.exports =router;