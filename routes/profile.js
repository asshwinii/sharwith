const { Router } = require("express");
const express = require("express");
const path = require("path");
const { profile } = require("../controllers/profilecontroller");
const router = express.Router();
const {isauth} = require("../middleware/auth");
const user = require("../model/user");
const User  = require("../model/user");
const mongoose = require("mongoose");


router.get("/profile", isauth , profile );

module.exports = router;
