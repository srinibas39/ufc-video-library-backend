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

app.get("/videos", (req, res) => {
    res.status(200).json({
        data:{videos}
    })
})

app.listen(3000, () => {
    console.log("server started")
})