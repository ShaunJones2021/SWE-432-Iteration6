// timeSlotRouter.js
const express = require("express");
const router = express.Router();

const Song = require("../models/song");
const Playlist = require("../models/playlistModel");

router.get("/", async function (req, res) {
  try {
    const data = await Playlist.find().populate("songs").exec();
    const songs = await Song.find();

    let counter = req.session.counter || 0;

    // Update the session with the new counter value
    req.session.counter = counter;
    // Store the counter value in the session
    if (req.query.counter !== undefined) {
      req.session.counter = parseInt(req.query.counter);
    } else {
      // Set a default counter value if not provided
      req.session.counter = 0;
    }

    res.render("pages/time-slot", {
      page_name: "time-slot",
      data,
      songs,
      counter,
    });
  } catch (error) {
    console.error(error);
    // Handle error
    res.status(500).send("Internal Server Error");
  }
});


router.post("/", async function (req, res) {
  try {
    var counter = parseInt(req.body.counter);
    const direction = req.body.direction;

    req.session.counter =
      direction === "left" ? req.session.counter - 1 : req.session.counter + 1;
    const data = await Playlist.find().populate("songs").exec();
    const songs = await Song.find();

    // Check if the counter is within bounds
    if (req.session.counter < 0) {
      req.session.counter = data.length - 1;
    } else if (req.session.counter >= data.length) {
      req.session.counter = 0;
    }
    console.log(req.session.counter);
    res.render("pages/time-slot", {
      page_name: "time-slot",
      data,
      counter: req.session.counter,
      songs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/delete/:counter", async function (req, res) {
  try {
    console.log(req.params["counter "]);
    console.log(req.body.id);
    const counter = parseInt(req.params.counter);
    const songId = req.body.id;

    // Assuming you have a method to remove the song from the list
    const updatedplaylist = await Playlist.findOneAndUpdate(
      { id: counter }, // Use the correct field in the query
      { $pull: { songs: songId } },
      { new: true } // To return the updated document
    );

    // Redirect back to the time-slot page
    res.redirect(`/time-slot?counter=${counter}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/add/:counter", async function (req, res) {
  try {
    const counter = parseInt(req.params.counter);
    const songId = req.body.selectedSong;
    console.log("Song ID:", songId);
    // Assuming you have a method to find the song by ID
    const songToAdd = await Song.findById(songId);

    if (!songToAdd) {
      return res.status(404).send("Song not found");
    }

    // Assuming you have a method to add the song to the playlist
    const updatedplaylist = await Playlist.findOneAndUpdate(
      { id: counter }, // Use the correct field in the query
      { $push: { songs: songId } },
      { new: true } // To return the updated document
    );

    // Redirect back to the time-slot page
    res.redirect(`/time-slot?counter=${counter}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;