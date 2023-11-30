const mongoose = require("mongoose");

const preferencesSchema = new mongoose.Schema({
    genre: String,
    language: String,
    autoplay: Boolean,
    explicit: Boolean,
    audioQuality: {
        streamQuality: String,
        download: Boolean,
        adjust: Boolean,
        normalize: Boolean,
        level: Number
    },
    social : {
        facebook: Boolean,
        private: Boolean,
        activity: Boolean,
        recent: Boolean
    },
    playback : {
        crossfade: Boolean,
        automix: Boolean,
        mono: Boolean,
        equalizer : Boolean
    },
    window : {
        auto: Boolean,
        minimize: Boolean
    },
    storage : {
        downloads: Boolean
    }
})

module.exports = mongoose.model("Preferences", preferencesSchema);

