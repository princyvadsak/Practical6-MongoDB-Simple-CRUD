const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
    song_id : String,
    title : String,
    movie : String,
    release : String,
    singer_id : String
});

const songModel = mongoose.model("Song",songSchema,"Song");

module.exports = songModel;