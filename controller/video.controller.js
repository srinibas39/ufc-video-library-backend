const { v4: uuidv4 } = require('uuid');
const videos = require('../db/videos');


const getAllVideo = async (req, res) => {
    res.status(200).json({
        data: { videos }
    })
}

const getSingleVideo = async (req, res) => {
    const { videoId } = req.params;
    const video = videos.find((el) => el._id === videoId)

    if (video) {
        res.status(200).json({ data: { video } })
    }
    else {
        res.json({ message: "no video found" })
    }
}

module.exports = { getAllVideo, getSingleVideo }