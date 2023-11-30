// homeRouter.js
const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const SongList = require("../models/songList");
const Playlist = require("../models/playlistModel");


router.get("/", async function (req, res) {
  const songResults = await Song.find();
  const playlistResults = await Playlist.find();
  res.render("pages/home", {
    page_name: "home",
    message: null,
    songResults,
    playlistResults
  });
});

router.get("/home", async function (req, res) {
  const songResults = await Song.find();
  const playlistResults = await Playlist.find();
  res.render("pages/home", {
    page_name: "home",
    message: null,
    songResults,
    playlistResults
  });
});


module.exports = router;