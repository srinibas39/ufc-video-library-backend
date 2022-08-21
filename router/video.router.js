const express = require("express");
const { getSingleVideo, getAllVideo } = require("../controller/video.controller");

const videoRouter = express.Router();

videoRouter
    .route("/")
    .get(getAllVideo)


videoRouter
    .route("/:videoId")
    .get(getSingleVideo)

module.exports = videoRouter;