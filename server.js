const { v4: uuidv4 } = require('uuid');
const express = require("express");
const cors = require("cors")
const dayjs = require('dayjs')
const app = express();
const videos = require("./db/videos");
const userModel = require("./model/user.model")
const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
const jwt = require('jsonwebtoken');
const authVerify = require('./middleware/verifyAuth');
const historyModel = require("./model/history.model");
const likesModel = require('./model/likes.model');
const watchlaterModel = require('./model/watchlater.model');
const playlistsModel = require('./model/playlists.model');
const { getAllPlaylist } = require('./controller/playlists.controller');

// connect To DB
const connectToDB = require("./db/connectToDB");
const signupRouter = require('./router/signup.router');
const loginRouter = require('./router/login.router');
const videoRouter = require('./router/video.router');
const historyRouter = require('./router/history.router');
const likesRouter = require('./router/likes.router');
const watchlaterRouter = require('./router/watchlater.router');
const playlistRouter = require('./router/playlist.router');


app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))

const secret = "SRINIBAS";

app.get("/", (req, res) => {
    res.json("Hello Express App")
})

app.use("/api/auth/signup", signupRouter);
app.use("/api/auth/signup", loginRouter);
app.use("/api/videos", videoRouter);
app.use("/api/user/history", historyRouter);
app.use("/api/user/likes", likesRouter);
app.use("/api/user/watchlater", watchlaterRouter);
app.use("/api/user/playlists", playlistRouter);

connectToDB();

app.listen(3000, () => {
    console.log("server started")
})