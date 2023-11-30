const mongoose = require("mongoose");

const topSchema = new mongoose.Schema({
    url: String,
    img: String,
    name: String,
    dj: String
})

module.exports = mongoose.model("Top", topSchema);

