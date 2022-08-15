const mongoose = require("mongoose");
const { Schema } = mongoose;

// create Schema
const watchlaterSchema = new Schema({
    _id: String,
    title: String,
    video: String,
    thumbnail: String,
    creator: String,
    playlist: Array,
    description: String,
    comments: Array,
    category: String,
    userId:String

})

// create Model
const watchlaterModel = mongoose.model("Watchlater", watchlaterSchema);

module.exports = watchlaterModel;