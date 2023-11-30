const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb'); // Add this line to import ObjectId
const Playlist = require('./models/playlistModel');
const Song = require('./models/song');
const DJ=require('./models/djsModel');
const Schedule=require('./models/scheduleModel');
const bodyParser = require('body-parser');

//BEN'S
const fs = require("fs");
const MongoStore = require('connect-mongo');
const session = require("express-session");
// const { name } = require("ejs");
const homeRouter = require("./routes/homeRouter");
const searchRouter = require("./routes/searchRouter");
const playlistRouter = require("./routes/playlistRouter");
const calendarRouter = require("./routes/calendarRouter");
const timeSlotRouter = require("./routes/timeSlotRouter");

const app = express();
const port = "8080";

mongoose.connect("mongodb://127.0.0.1:27017/appdbs", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const Preferences = require("./models/Preferences");
// const Liked = require("./models/Liked");
// const Recommended = require("./models/Recommended");
// const Top = require("./models/Top");
// const Images = require("./models/Images")

var userImages;
var topStations;
var favoriteStations;
var recStations;
var likedStations;

const info = {
    userImages : userImages,
    stationimages : userImages,
    topStations : topStations,
    favoriteStations : favoriteStations,
    recStations : recStations
}

const info2 = {
    likedStations : likedStations
}

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async function (req, res) {
    try {
        res.render("user_select.ejs", {
            userImages,
            topStations,
            favoriteStations,
            recStations
        });
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/shaun", async function (req, res) {
    try {
        
        const playlists = await Playlist.find().populate("songs").exec();
        res.render('home', {playlists});
        // const dbo = db;

        // // Fetch user images
        // const userImages = await dbo.collection("userImages").findOne({ _id: new ObjectId("6558bea1c7a4a9ad5eb05ff4") });

        // // Fetch top stations
        // const topStations = await dbo.collection("topstations").find({}).toArray();

        // // Fetch favorite stations
        // const favoriteStations = await dbo.collection("favoritestations").find({}).toArray();

        // // Fetch recommended stations
        // const recStations = await dbo.collection("recstations").find({}).toArray();

        // res.render("home.ejs", {
        //     userImages,
        //     topStations,
        //     favoriteStations,
        //     recStations
        // });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
// const information = new Preferences(req.body)
    // information.save((error, savedUser) => {
    //     if(error){
    //         throw error;
    //     } 
    //     res.json(savedUser);
    // })
    app.post("/api/preference/:id", async function (req, res) {
        try {
            const preferenceId = req.params.id;
    
            // Extract updated preference data from the request body
            const {
                genre,
                language,
                autoplay,
                explicit,
                audioQuality,
                social,
                playback,
                window,
                storage
            } = req.body;
    
            // Create an object with the updated data
            const updatedPreference = {
                genre,
                language,
                autoplay: Boolean(autoplay),
                explicit: Boolean(explicit),
                audioQuality,
                social,
                playback,
                window,
                storage
            };
    
            // Find the document by _id and replace it with the updated data
            const replacedPreference = await Preferences.findOneAndReplace(
                { _id: new ObjectId(preferenceId) },
                updatedPreference,
                { new: true } // Return the modified document
            );
    
            if (!replacedPreference) {
                return res.status(404).json({ error: 'Preference not found' });
            }
    
            // Render the updated view with the replacedPreference
            res.render("preferences.ejs", { updatedPreference });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
    

app.get("/likes", async function (req, res) {
    try {
        const playlists = await Playlist.find().populate("songs").exec();
        res.render('likes', {playlists});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/preferences/:id", async function (req, res) {
    try {
        // Extract preference data based on the provided ID
        const preferenceId = req.params.id;

        // Fetch preference data from the database based on the ID
        const updatedPreference = await Preferences.findById(preferenceId);

        // Render the preferences.ejs template with the fetched data
        res.render("preferences.ejs", { updatedPreference });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/recommendations", async function (req, res) {
    try {
        const playlists = await Playlist.find().populate("songs").exec();
        res.render('recommended', {playlists});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/station", async function (req, res) {
    const id = req.query.id;
    const song = await Song.findById(id);
    console.log(song.name);
    res.render("station.ejs", {id, song});
});

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// })

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/swe432', { useNewUrlParser: true, useUnifiedTopology: true });


// // Check for successful connection
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// Set the view engine to EJS
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Serve static files from the 'public' directory
//app.use(express.static('public'));

// Define your routes
// Example route to get all playlists


// Default route to render common_page.ejs on application start
app.get('/brandon', async (req, res) => {
    console.log('Common Page route triggered');
    try {
      const playlists = await Playlist.find().populate("songs").exec();
    //   const s = await Song.find();
      res.render('common_page', { pageTitle: 'Common Page', playlists });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

// Producer pages
app.get('/producer1', async(req, res) => {
    console.log('Producer 1 route triggered');
    try {
      const schedule = await Schedule.find();
      res.render('producer1', { pageTitle: 'Producer 1', schedule });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
});

app.post('/updateScheduleToDefault', async (req, res) => {
  const { queue } = req.body;
  console.log("Update Schedule to Default route triggered. Queue:", queue);
  try {
      const updatedSchedule = await Schedule.findOneAndUpdate(
          { queue: queue },
          {
              dj_name: "Open Slot",
              name: "Open Slot",
              playlist_image: "/images/station_placeholder.jpg"
          },
          { new: true }
      ).exec();

      if (!updatedSchedule) {
          return res.status(404).json({ error: 'Schedule not found' });
      }

      //return res.status(200).json({ message: 'Schedule updated to default', updatedSchedule });
      return res.status(200).json({ message: 'Schedule updated to default', updatedSchedule, reload: true });

      //return res.redirect('/');
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/producer2', async(req, res) => {
    console.log('Producer 2 route triggered');
    const queue = req.query.queue || 'Default Queue Number';

    console.log('Queue Number:', queue);
    try {
      const dj = await DJ.find();
      res.render('producer2', { pageTitle: 'Producer 2', dj,queue });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
});

app.get('/producer3', async(req, res) => {
    console.log('Producer 3 route triggered');
    const djName = req.query.djName || 'Default DJ Name';
    const queue = req.query.queue || 'Default Queue Number';
    console.log('DJ Name:', djName);
    console.log('Queue Number:', queue);
  
    try {
      const playlists = await Playlist.find();
      const s = await Song.find();
  
      res.render('producer3', { pageTitle: 'Producer 3', playlists, djName,queue });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

app.post('/updateSchedule', async (req, res) => {
  const { djName, queue, playlistName, playlistImage } = req.body;
  console.log('DJ Name:', djName);
  console.log('Queue Number:', queue);
  console.log('P Name:', playlistName);
  console.log('P image:', playlistImage);
  try {
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { queue: queue },
      { dj_name: djName, name: playlistName, playlist_image: playlistImage },
      { new: true }
  ).exec();
  

    if (!updatedSchedule) {
        // Handle the case where the document with the given queue wasn't found
        return res.status(404).json({ error: 'Schedule not found' });
    }

    //return res.status(200).json({ message: 'Schedule updated successfully', updatedSchedule });
    return res.redirect('/');
} catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
}
});

app.get('/producer4', async (req, res) => {
    const playlistName = req.query.playlistName;
  
    try {
      if (!playlistName) {
        return res.status(400).json({ error: 'PlaylistName parameter is required' });
      }
  
      const playlist = await Playlist.findOne({ name: playlistName }).populate("songs").exec();
  
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
  
    //   // Assuming songs is an array field in your playlist document
    //   const songs;
  
      // Render your producer4.ejs template with the playlist and songs data
      res.render('producer4', { pageTitle: 'Producer 4', playlist});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/updatePlaylist', async (req, res) => {
    const { songId, playlistName, songName, artist, artistImage, audioFile } = req.query;
  
    try {
      // Find the playlist document based on the playlist name
      const playlist = await Playlist.findOne({ name: playlistName });
  
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
  
      const existingSong = false;

      // Check if the songId already exists in the playlist's songs array
      for(var i = 0; i < playlist.songs.length; i++){
        if(playlist.songs[i].toString() == songId){
            existingSong = true;
        }
      }
  
      if (!existingSong) {
        // If the songId is not in the playlist, add it to the songs array
        const temp = await playlist.updateOne(
            { $push: { songs: songId} },
            { new: true }
        );
  
        // Save the updated playlist document
        // await playlist.save();
        return res.redirect('/brandon');
        //return res.status(200).json({ message: 'Song added to playlist', playlist });
      } else {
        return res.redirect('/brandon');
        //return res.status(400).json({ error: 'Song already exists in the playlist' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/producer5', async (req, res) => {
    console.log('Producer 5 route triggered');
  
    try {
      // Fetch all song documents from the database
      const playlistName = req.query.playlistName;
      const songs = await Song.find();
  
      // Render the producer5 view and pass the songs data
      res.render('producer5', { pageTitle: 'Producer 5', songs, playlistName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/removeSongFromPlaylist', async (req, res) => {
    const { songName, playlistName } = req.query;
  
    try {
      // Find the playlist document based on the playlist name
      const playlist = await Playlist.findOne({ name: playlistName });
  
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
  
      // Remove the song from the playlist's songs array based on the song name
      playlist.songs = playlist.songs.filter(song => song.song_name !== songName);
  
      // Save the updated playlist document
      await playlist.save();
  
      return res.status(200).json({ message: 'Song removed from playlist', playlist });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//BEN'S STUFF
// Use the session middleware
app.use(
    session({
      secret: "mysecretcode",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/appdbs",
        autoRemove: "interval",
        autoRemoveInterval: 10, // In minutes. Default
      }),
    })
  );
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname + "/public")));
  app.use("/ben", homeRouter);
  app.use("/search", searchRouter);
  app.use("/playlist", playlistRouter);
  app.use("/calendar", calendarRouter);
  app.use("/time-slot", timeSlotRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
