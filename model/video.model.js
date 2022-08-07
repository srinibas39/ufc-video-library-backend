const mongoose = require("mongoose");
const { Schema } = mongoose;

// create Schema
const videoSchema = new Schema({

    _id: String,
    title: String,
    video: String,
    thumbnail: String,
    creator: String,
    playlist: Array,
    description: String,
    comments: Array,
    category: String

})

// create model
const Video=mongoose.model("Video",videoSchema);

module.exports=Video