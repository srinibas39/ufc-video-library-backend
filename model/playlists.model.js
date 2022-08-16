const mongoose = require("mongoose");
const { Schema } = mongoose;

// create Schema
const playlistsSchema = new Schema({
    playlistName: String,
    _id: String,
    videos: [{
        _id: String,
        title: String,
        video: String,
        thumbnail: String,
        creator: String,
        playlist: Array,
        description: String,
        comments: Array,
        category: String
    }],
    userId:String

})

// create Model
const playlistsModel = mongoose.model("Playlists", playlistsSchema);

module.exports = playlistsModel;