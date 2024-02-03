const mongoose = require("mongoose");


const PostSchem = mongoose.Schema({

    postImg : String,
    postTitle : String,
    postDescription : String,
    email : String
});

const post = mongoose.model('posts',PostSchem);

module.exports = post;