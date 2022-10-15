
const express = require("express");
const cors = require("cors")
const app = express();



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

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("server started")
})