const mongoose = require("mongoose");

const songListSchema = new mongoose.Schema({
  id: Number,
  day: Number, 
  months: String,
  year: String, 
  startHour: String, 
  endHour: String, 
  totalSongs: Number,
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }]
});
const SongList = mongoose.model("SongList", songListSchema, "songLists");

module.exports = SongList;
