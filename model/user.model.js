const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: String,
    updatedAt: String,

})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel;