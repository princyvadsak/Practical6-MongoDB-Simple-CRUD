const mongoose = require("mongoose");

const singerSchema = mongoose.Schema({
    singer_id : String,
    name : String,
    gender : String,
    age : Number,
    award : String
});

const singerModel = mongoose.model("Singer",singerSchema,"Singer");

module.exports = singerModel;