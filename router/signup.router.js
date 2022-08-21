const express = require("express");
const { signup } = require("../controller/auth.controller");

const signupRouter = express.Router();

signupRouter
    .route("/")
    .post(signup)

module.exports = signupRouter;    
