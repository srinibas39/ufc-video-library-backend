const { v4: uuidv4 } = require('uuid');
const express = require("express");
const cors = require("cors")
const dayjs = require('dayjs')
const app = express();
const videos = require("./db/videos");
const userModel = require("./model/user.model")
const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
const jwt = require('jsonwebtoken');

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
    if (email && password && firstName, lastName) {
        const encodedToken = jwt.sign({ id: uuidv4()}, secret);
        const newUser = new userModel({ _id: uuidv4(), email, password, firstName, lastName, createdAt: formatDate(), updatedAt: formatDate() })
        newUser.save()
        .then((createdUser)=>res.json({data:{createdUser,encodedToken},status:200}))
        .catch((error)=>console.error(error))
    }

})

// Get all videos

app.get("/api/videos", (req, res) => {
    res.status(200).json({
        data: { videos }
    })
})

// Get single video

app.get("/api/video/:videoId", (req, res) => {
    const { videoId } = req.params;
    const video = videos.find((el) => el._id === videoId)

    if (video) {
        res.status(200).json({ data: { video } })
    }
    else {
        res.json({ message: "no video found" })
    }

})


app.listen(3000, () => {
    console.log("server started")
})