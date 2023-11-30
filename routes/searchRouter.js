// searchRouter.js
const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const Playlist = require("../models/playlistModel");
const mongoose = require("mongoose");

router.get("/", async function (req, res) {
  const initialSongs = await Song.find().limit(5);
  const initialplaylists = await Playlist.find().limit(5);
  res.render("pages/search", {
    page_name: "search",
    message: null,
    songResults: initialSongs,
    playlistResults: initialplaylists,
  });
});

router.post("/", async (req, res) => {
  const query = req.body.search;
  let message = null;
  try {
    // Use a regular expression for a case-insensitive search
    const regex = new RegExp(query, "i");

    // Search in both Song and playlist for matching names
    const songResults = await Song.find({
      $or: [{ name: regex }, { artist: regex }, { genre: regex }],
    });
    const playlistResults = await Playlist.find({});

    if (songResults.length === 0 && playlistResults.length === 0) {
      message = "No results found";
    } else {
      // Render the search results page with the found songs and song lists
      res.render("pages/search", {
        page_name: "search",
        message: null,
        songResults: songResults,
        playlistResults: playlistResults,
      });
      return;
    }
  } catch (error) {
    console.error(error);
    message = "An error occurred during the search";
  }

  res.render("pages/search", {
    page_name: "search",
    message: message,
    songResults: null,
    playlistResults: null,
  });
});

router.post("/add", async (req, res) => {
  const songId = req.body.songId;
  const playlistId = req.body.selectedPlaylist;
  console.log(songId);
  console.log(playlistId);
  const song = await Song.findById(songId);
  // mongoose.Types.ObjectId(songId);

   // Assuming you have a method to add the song to the playlist
   const updatedplaylist = await Playlist.findOneAndUpdate(
    { id: playlistId }, 
    { $push: { songs: song._id} },
    { new: true } // To return the updated document
  );
  console.log("Here");
  // Redirect back to the time-slot page
  req.session.counter = playlistId;
  res.redirect(`/time-slot?counter=${playlistId}`);
});

module.exports = router;
