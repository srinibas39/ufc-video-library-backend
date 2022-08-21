const express = require("express");
const { removeLikes, removeAllLikes } = require("../controller/likes.controller");
const { addWatchlater, getAllWatchlater } = require("../controller/watchlater,controller");

const watchlaterRouter = express.Router();

watchlaterRouter
    .route("/:userId")
    .post(addWatchlater)
    .get(getAllWatchlater)
    .delete(removeAllLikes)

watchlaterRouter
    .route("/:userId/:videoId")
    .delete(removeLikes)

module.exports = watchlaterRouter;
