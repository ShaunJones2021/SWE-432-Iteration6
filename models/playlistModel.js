const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  id: Number,
  day: Number, 
  months: String,
  year: String, 
  startHour: String, 
  endHour: String, 
  totalSongs: Number, //here
  name: String,
  dj_name: String,
  playlist_image: String,
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    }
  ]
});

const Playlist = mongoose.model('Playlist', playlistSchema,'playlist');

module.exports = Playlist;
