const mongoose = require("mongoose");
const { Schema } = mongoose;

// create Schema
const historySchema = new Schema({
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
const historyModel = mongoose.model("History", historySchema);

module.exports = historyModel;