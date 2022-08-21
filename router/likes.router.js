const express = require("express");
const { addLikes, getAllLikes, removeLikes, removeAllLikes } = require("../controller/likes.controller");


const likesRouter = express.Router();

likesRouter
    .route("/:userId")
    .post(addLikes)
    .get(getAllLikes)
    .delete(removeAllLikes)

likesRouter
    .route("/:userId/:videoId")
    .delete(removeLikes)


   

module.exports = likesRouter;
