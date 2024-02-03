require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const UserRoute = require("./Router/userRoute");
const PostRoute = require("./Router/postRouter");
const verifyUser = require("./controller/verifyUser");
const Home = require("./controller/Home");

app.use("", UserRoute);
app.use("", PostRoute);

app.get("/home", verifyUser, Home);

mongoose.connect(MONGO_URL).then(() => {
  console.log("DB Is Connected ");
  app.listen(PORT, () => {
    console.log(`app is running on port : ${PORT}`);
  });
});
