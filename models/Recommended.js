const mongoose = require("mongoose");

const recommendedSchema = new mongoose.Schema({
    url: String,
    img: String,
    name: String,
    dj: String
})

module.exports = mongoose.model("Recommeded", recommendedSchema);

