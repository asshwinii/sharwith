const { create } = require("domain");
const express = require("express");
const { getPostInput,createPost } = require("../controllers/createcontroller");
const {createPosttemp, fileUpload} = require("../controllers/createcontrollertemp");
const router = express.Router();
const {isauth} = require("../middleware/auth");
router.get("/create", isauth, getPostInput );


//router.post("/create",isauth, createPost);
router.post("/create",isauth, fileUpload, createPosttemp);
module.exports = router;