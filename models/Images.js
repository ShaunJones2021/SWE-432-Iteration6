const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
    images: [{type: String}]
})

module.exports = mongoose.model("Images", imagesSchema);

