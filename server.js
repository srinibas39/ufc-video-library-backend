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


// connect To DB
const connectToDB = require("./db/connectToDB");
const playlistsModel = require('./model/playlists.model');


connectToDB();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
const secret = "SRINIBAS"

app.get("/", (req, res) => {
    res.json("Hello Express App")
})

// signup
app.post("/api/auth/signup", (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (email && password && firstName && lastName) {
        const encodedToken = jwt.sign({ id: uuidv4() }, secret);
        const newUser = new userModel({ _id: uuidv4(), email, password, firstName, lastName, createdAt: formatDate(), updatedAt: formatDate() })
        newUser.save()
            .then((createdUser) => res.json({ data: { createdUser, encodedToken }, status: 200 }))
            .catch((error) => res.json({ ErrorMessage: error }))
    }

})

// login
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        try {

            const encodedToken = jwt.sign({ id: uuidv4() }, secret);
            const foundUser = await userModel.findOne({ email })
            if (password === foundUser.password) {

                res.json({ data: { foundUser, encodedToken }, status: 200 })
            }
            else {
                res.json({ message: "Please check your password" })
            }
        }
        catch (error) {
            res.json({ ErrorMessage: error })
        }


    }
})

// Get all videos
app.get("/api/videos", (req, res) => {
    res.status(200).json({
        data: { videos }
    })
})

// Get single video
app.get("/api/video/:videoId", authVerify, (req, res) => {
    const { videoId } = req.params;
    const video = videos.find((el) => el._id === videoId)

    if (video) {
        res.status(200).json({ data: { video } })
    }
    else {
        res.json({ message: "no video found" })
    }

})

// add history
app.post("/api/user/history/:userId", async (req, res) => {
    const videoItem = req.body;
    const { userId } = req.params;
    const newHistory = new historyModel({ ...videoItem, userId })

    newHistory.save()
        .then(async (savedItem) => {
            const history = await historyModel.find({ userId: userId })
            res.json({ data: { history: history.slice(0).reverse() } })
        })
        .catch(async (error) => {
            const historyDelete = await historyModel.findOneAndDelete({ _id: videoItem._id })
            newHistory.save()
                .then(async (savedItem) => {

                    const history = await historyModel.find({ userId: userId })
                    res.json({ data: { history: history.slice(0).reverse() } })
                })



        })


})

// remove history
app.delete("/api/user/history/:userId/:videoId", async (req, res) => {
    const { userId, videoId } = req.params;
    try {
        const videoItem = await historyModel.findOneAndDelete({ userId: userId, _id: videoId })
        const history = await historyModel.find({ userId: userId })
        res.json({ data: { history: history.slice(0).reverse() } })
    }
    catch (error) {
        const history = await historyModel.find({ userId: userId })
        res.json({ data: { history: history.slice(0).reverse() } })
    }
})

// get all history
app.get("/api/user/history/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const history = await historyModel.find({ userId: userId })
        res.json({ data: { history: history.slice(0).reverse() } })
    }
    catch (error) {
        res.json({ message: error })
    }

})

// remove all history
app.delete("/api/user/history/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const history = await historyModel.deleteMany({ userId: userId })
        res.json({ data: { history: [] } })
    }
    catch (error) {
        res.json({ message: error })
    }
})

// add likes
app.post("/api/user/likes/:userId", async (req, res) => {
    const videoItem = req.body;
    const { userId } = req.params;
    const newLikes = new likesModel({ ...videoItem, userId })

    newLikes.save()
        .then(async (savedItem) => {
            const likes = await likesModel.find({ userId: userId })
            res.json({ data: { likes: likes.slice(0).reverse() } })
        })
        .catch(async (error) => {
            res.json({ message: error })
        })
})

// remove likes
app.delete("/api/user/likes/:userId/:videoId", async (req, res) => {
    const { userId, videoId } = req.params;
    try {
        const likeItem = await likesModel.findOneAndDelete({ userId: userId, _id: videoId })
        const likes = await likesModel.find({ userId })
        res.json({ data: { likes: likes.slice(0).reverse() } })
    }
    catch (error) {
        res.json({ message: error })
    }
})

// get all likes
app.get("/api/user/likes/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const likes = await likesModel.find({ userId });
        res.json({ data: { likes: likes.slice(0).reverse() } });
    }
    catch (err) {
        res.json({ message: err });
    }

})

// remove all likes
app.delete("/api/user/likes/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedLikes = await likesModel.deleteMany({ userId });
        res.json({ data: { likes: [] } });
    }
    catch (error) {
        res.json({ message: error })
    }
})

// add watchlater
app.post("/api/user/watchlater/:userId", async (req, res) => {
    const videoItem = req.body;
    const { userId } = req.params;
    const newWatchlater = new watchlaterModel({ ...videoItem, userId })

    newWatchlater.save()
        .then(async (savedItem) => {
            const watchlater = await watchlaterModel.find({ userId: userId })
            res.json({ data: { watchlater: watchlater.slice(0).reverse() } })
        })
        .catch(async (error) => {
            res.json({ message: error })
        })
})

// remove watchlater
app.delete("/api/user/watchlater/:userId/:videoId", async (req, res) => {
    const { userId, videoId } = req.params;
    try {
        const likeItem = await watchlaterModel.findOneAndDelete({ userId: userId, _id: videoId })
        const likes = await watchlaterModel.find({ userId })
        res.json({ data: { likes: likes.slice(0).reverse() } })
    }
    catch (error) {
        res.json({ message: error })
    }
})

// get all watchlater
app.get("/api/user/watchlater/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const watchlater = await watchlaterModel.find({ userId });
        res.json({ data: { watchlater: watchlater.slice(0).reverse() } });
    }
    catch (err) {
        res.json({ message: err });
    }

})

// remove all watchlater
app.delete("/api/user/watchlater/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedWatchlater = await watchlaterModel.deleteMany({ userId });
        res.json({ data: { watchlater: [] } });
    }
    catch (error) {
        res.json({ message: error })
    }
})

// add a playlist
app.post("/api/user/playlists/:userId", async (req, res) => {
    const playlist = req.body;
    const { userId } = req.params;
    const newPlaylist = new playlistsModel({ ...playlist, _id: uuidv4(), userId })
    newPlaylist.save()
        .then(async (savedPlaylist) => {
            const playlists = await playlistsModel.find({ userId })
            res.json({ data: { playlists: playlists.slice(0).reverse() } })
        })
        .catch((error) => {
            res.json({
                message: error
            })
        })

})
//  add videos to playlist
app.post("/api/user/playlists/:playlistId/:userId", async (req, res) => {
    const video = req.body;
    const { playlistId, userId } = req.params;
    try {
        const playlist = await playlistsModel.findOne({ _id: playlistId });
        const updatePlaylist = await playlistsModel.updateOne({ _id: playlistId }, { videos: [...playlist.videos, video] })
        // const updatePlaylist=await playlistsModel.updateOne({videos:[]})
        const playlists = await playlistsModel.find({ userId: userId })
        res.json({ data: { playlists: playlists.slice(0).reverse() } })


    }
    catch (error) {
        res.json({ message: error })
    }


})

// remove a playlist
app.delete("/api/user/playlists/:playlistId", async (req, res) => {
    const { playlistId } = req.params;
    try {
        const deletedPlaylist = await playlistsModel.findOneAndDelete({ _id: playlistId });
        const playlists = await playlistsModel.find({ userId: deletedPlaylist.userId })
        if (playlists.length) {

            res.json({ data: { playlists: playlists.slice(0).reverse() } })
        }
        else {
            res.json({ data: { playlists: [] } })
        }

    }
    catch (error) {
        res.json({ message: error })
    }

})

// remove videos from playlist
app.delete("/api/user/playlists/:playlistId/:videoId", async (req, res) => {
    const { playlistId, videoId } = req.params;
    try {
        const playlist = await playlistsModel.findOne({ _id: playlistId });
        if (playlist.videos.length) {
            const videos = playlist.videos.filter((vid) => vid._id !== videoId);
            const updatedPlaylist = await playlistsModel.findOneAndUpdate({ _id: playlistId }, { videos })
        }
        const playlists = await playlistsModel.find({ userId: playlist.userId })
        if (playlists.length) {

            res.json({ data: { playlists: playlists.slice(0).reverse() } })
        }
        else {
            res.json({ data: { playlists: [] } })
        }

    }
    catch (error) {
        res.json({ message: error })
    }
})

// get all playlist
app.get("/api/user/playlists/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const playlists = await playlistsModel.find({ userId })
        res.json({ data: { playlists: playlists.slice(0).reverse() } })
    }
    catch (error) {
        res.json({ message: error })
    }
})


app.listen(3000, () => {
    console.log("server started")
})