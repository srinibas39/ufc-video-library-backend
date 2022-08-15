const mongoose = require("mongoose");
const { Schema } = mongoose;

// create Schema
const likesSchema = new Schema({
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
const likesModel = mongoose.model("Likes", likesSchema);

module.exports = likesModel;