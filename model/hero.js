const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 4,
        maxlength : 20,
        required : true
    },
    birthName : String,
    movies : {
        type : [String]
    },
    likeCount : Number,
    imgURL : {
        type : String,
        default : "placeholder.jpg"
    },
    deceased : Boolean
});

const Hero = mongoose.model('Hero', heroSchema);
module.exports = Hero;