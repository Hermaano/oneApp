
const express = require("express");

const Router = express.Router();

const {AllUsers,AddUser,Login,logout} = require('../controller/UserController');


const user = require("../Model/userModel");

Router.get("/AllUsers",AllUsers);
  
  Router.post("/AddUser", AddUser);
  
  Router.post("/Login", Login);

  Router.get("/logout",logout );


  module.exports = Router;