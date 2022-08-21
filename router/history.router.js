const express = require("express");
const { addHistory, removeHistory, getAllHistory, removeAllHistory } = require("../controller/history.controller");

const historyRouter = express.Router();

historyRouter
    .route("/:userId")
    .post(addHistory)
    .get(getAllHistory)
    .delete(removeAllHistory)

historyRouter
    .route("/:userId/:videoId")
    .delete(removeHistory)

module.exports = historyRouter;


