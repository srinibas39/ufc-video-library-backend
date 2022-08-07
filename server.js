const express = require("express");
const cors = require("cors")
const app = express();
const videos = require("./db/videos")

// connect To DB
const connectToDB = require("./db/connectToDB");
connectToDB();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.json("Hello Express App")
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
 
    if(video){
        res.status(200).json({data:{video}})
    }
    else{
        res.json({message:"no video found"})
    }
   
})


app.listen(3000, () => {
    console.log("server started")
})