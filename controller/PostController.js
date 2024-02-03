
const post = require('../Model/postModel');


const getAllPosts = async (req, res) => {
    try {
      const AllPosts = await post.find({});
  
      res.json({
        status: "success",
        massage: "All Posts",
        Allposts: AllPosts,
      });
    } catch (error) {
      console.log(error);
    }
  }


  const getSinglePost = async (req, res) => {
    try {
      const { id } = req.params;
      const singleUser = await post.findById(id);
  
      if (!singleUser) {
        res.status(404).json({
          status: "error",
          message: "User ID not found",
        });
        return;
      }
  
      res.json({
        status: "success",
        message: "User Info",
        singleUser: singleUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }


  const deleteSinglePost = async (req, res) => {
    try {
      const { id } = req.params;
      const singleUser = await post.findByIdAndDelete(id);
  
      if (!singleUser) {
        res.status(404).json({
          status: "error",
          message: "Post ID not found",
        });
        return;
      }
  
      res.json({
        status: "success",
        message: "Post Deleted Successfully",
        singleUser: singleUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "post Not Deleted Try Again",
      });
    }
  }


  const addPost = async (req, res) => {
    try {
      const { postImg, postTitle, postDescription,email } = req.body;
  
      if (!(postImg && postTitle && postDescription,email)) {
        return res.json({
          Status: "Success",
          Massage: "All Post Fields Are required",
        });
      }
  
      const newPost = await post.create({
        postImg,
        postTitle,
        postDescription,
        email
      });
  
      res.json({
        status: "success",
        massage: "Post Created Successfully",
        newPost: newPost,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "fail",
        massage: "Post not Created Successfully",
        newPost: newPost,
      });
    }
  }

  const updatePost = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updateUser = await post.findByIdAndUpdate(
        { _id: id },
        {
          postImg: req.body.postImg,
          postTitle: req.body.postTitle,
          postDescription: req.body.postDescription,
        }
      );
  
      if (updateUser) {
        return res.json({
          status: "success",
          message: "Post Updated successfully",
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }


  module.exports = {
    getAllPosts,
    getSinglePost,
    deleteSinglePost,
    addPost,
    updatePost
  }