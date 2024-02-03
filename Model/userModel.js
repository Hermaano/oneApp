const mongoose = require("mongoose");


const UserSchem = mongoose.Schema({
    fullname : String,
    email : String,
    password : String
});


const user = mongoose.model('users',UserSchem);

module.exports = user;