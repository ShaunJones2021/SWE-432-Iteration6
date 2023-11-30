const mongoose = require('mongoose');

const djsSchema = new mongoose.Schema({
  dj_name: String,
  dj_image: String,
  
});

const DJ = mongoose.model('DJ', djsSchema,'djs');

module.exports = DJ;
