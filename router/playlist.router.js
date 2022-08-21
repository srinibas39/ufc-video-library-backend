const express = require("express");
const { addPlaylist, getAllPlaylist, removePlaylist, removeVideosPlaylist, addVideosPlaylist, removeAllPlaylist } = require("../controller/playlists.controller");

const playlistRouter = express.Router();

playlistRouter
    .route("/:userId")
    .post(addPlaylist)
    .get(getAllPlaylist)
    .delete(removeAllPlaylist)

playlistRouter
    .route("/:playlistId/:userId")
    .post(addVideosPlaylist)

playlistRouter
    .route("/:playlistId")
    .delete(removePlaylist)

playlistRouter
    .route("/:playlistId/:videoId")
    .delete(removeVideosPlaylist)

module.exports = playlistRouter;
