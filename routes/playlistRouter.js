// playlistRouter.js
const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const Playlist = require("../models/playlistModel");

router.get("/", async function (req, res) {
  const songResults = await Song.find();
  const playlistResults = await Playlist.find();
  res.render("pages/playlist", {
    page_name: "playlist",
    message: null,
    playlistResults,
  });
});

router.post("/", async (req, res) => {
  const query = req.body.search;
  let message = null;
  try {
    // Use a regular expression for a case-insensitive search
    const regex = new RegExp(query, "i");
    // Search in both Song and playlist for matching names
    const playlistResults = await Playlist.find({
      $or: [{name: regex}, { startHour: regex }, { endHour: regex }],
    });

    if (playlistResults.length === 0) {
      message = "No results found";
    } else {
      // Render the search results page with the found songs and song lists
      res.render("pages/playlist", {
        page_name: "playlist",
        message: null,
        playlistResults,
      });
      return;
    }
  } catch (error) {
    console.error(error);
    message = "An error occurred during the search";
  }
});

router.get("/:id", async (req, res) => {
  const playlistId = req.params.id;
  req.session.counter = parseInt(playlistId); // Set the counter to the playlistId
  res.redirect(`/time-slot?counter=${playlistId}`);
});

module.exports = router;
