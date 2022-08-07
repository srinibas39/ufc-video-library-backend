const mongoose = require("mongoose");

function connectToDB() {
    mongoose.connect("mongodb+srv://srinibas:1234@cluster0.i5dmocy.mongodb.net/test", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(() => console.log("database connected successfully"))
        .catch((error) => console.error(error))
}

module.exports = connectToDB;