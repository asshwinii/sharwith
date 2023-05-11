
const express = require("express");
const router = express.Router();
const path = require("path");
const { getALLquestions } = require("../controllers/forumcontroller");
const { getsingleBlog, getUpvote } = require("../controllers/postcontroller");
const {isauth} = require("../middleware/auth");
router.get("/forum", isauth, getALLquestions );
router.get("/singleBlog/:id",getsingleBlog);
router.get("/singleBlog/upvote/:id", getUpvote);

module.exports =router;