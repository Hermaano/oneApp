const bcry = require("bcrypt");
const jwt = require("jsonwebtoken");


const user = require("../Model/userModel");

const AllUsers = async (req, res) => {
    try {
      const AllUsers = await user.find({});
      res.json({
        status: "Success ",
        Massage: "All Users",
        users: AllUsers,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const AddUser = async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
  
      if (!(fullname && email && password)) {
        return res.json({
          Status: "Success",
          Massage: "All Fields Are required",
        });
      }
  
      const existingUser = await user.findOne({ email });
  
      if (existingUser) {
        return res.json({
          Status: "Success",
          Massage: "This Email All Ready In Our DB Use Another Email ",
        });
      }
  
      const myEncPassword = await bcry.hash(password, 10);
  
      const newUser = await user.create({
        fullname,
        email,
        password: myEncPassword,
      });
  
      return res.json({
        Status: "Success",
        Registration : true,
        Massage: "Registration Successfull ",
        user: newUser,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        return res.json({
          Status: "Success",
          Massage: "All Fields Are required",
        });
      }
  
      const existingUser = await user.findOne({ email });
  
      if (!existingUser) {
        return res.json({
          Status: "Success",
          Massage: "This Email Is Not Valid Email ",
        });
      }
  
      const myDecPassword = await bcry.compare(password, existingUser.password);
  
      if (!myDecPassword) {
        return res.json({
          Status: "Success",
          Massage: "Your Password Is Wrong",
        });
      }
  
      const token = jwt.sign(
        {
          email: existingUser.email,
          fullname: existingUser.fullname,
        },
        "Nucmaan",
        {
          expiresIn: "2d",
        }
      );
  
      res.cookie("token", token);
  
      return res.json({
        success: true,
        Massage: "Login Successfull ",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const logout = async(req, res) => {
    try {
  
      res.clearCookie('token');
  
      return res.json({
        logout: true,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  module.exports = {
    AllUsers,
    AddUser,
    Login,
    logout
  }