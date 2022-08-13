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


// connect To DB
const connectToDB = require("./db/connectToDB");

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
        console.log(videoItem);
        res.json(videoItem);
    }
    catch (error) {

    }
})


app.listen(3000, () => {
    console.log("server started")
})