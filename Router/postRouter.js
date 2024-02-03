const express = require("express");

const Router = express.Router();


const {getAllPosts, getSinglePost,deleteSinglePost,addPost,updatePost} =  require("../controller/PostController");


  Router.get("/posts",getAllPosts);
  
  Router.get("/posts/:id", getSinglePost);
  
  Router.delete("/posts/:id",deleteSinglePost);
  
  Router.post("/Addpost", addPost);
  
  Router.put("/update/:id", updatePost);


  module.exports = Router;
  