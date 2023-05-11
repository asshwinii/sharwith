const express = require("express");
const path = require("path");
const { getsearchcontroller, getsearchresults } = require("../controllers/searchcontroller");
const { isauth } = require("../middleware/auth");
const router = express.Router();

router.get("/search",getsearchcontroller);
router.post("/search/result",isauth, getsearchresults);

module.exports =router;