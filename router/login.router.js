const express = require("express");
const { login } = require("../controller/auth.controller");

const loginRouter = express.Router();

loginRouter
    .route("/")
    .post(login)

module.exports = loginRouter;
