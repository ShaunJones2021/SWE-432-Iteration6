const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: Number,
  image: String, // the path or link to the image
  audio: String, // the path or link(url) to the audio
  name: String, // the name of the song
  artist: String, // artist 
  genre: String,
  duration: String,
  list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlayList'
  }]
});

const Song = mongoose.model("Song", songSchema, "songs");

module.exports = Song;
