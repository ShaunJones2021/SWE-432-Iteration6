const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  
    name: String,
    dj_name: String,
    playlist_image: String,
    queue: Number
  
  
});

const Schedule = mongoose.model('Schedule', scheduleSchema,'schedule');

module.exports = Schedule;