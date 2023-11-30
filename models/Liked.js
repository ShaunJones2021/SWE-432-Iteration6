const mongoose = require("mongoose");

const likedSchema = new mongoose.Schema({
    url: String,
    img: String,
    name: String,
    dj: String
})

module.exports = mongoose.model("Liked", likedSchema);

