const express = require("express");
const { getVideosFromApi } = require("../controllers");

const Router = express.Router();
Router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FtVid api",
  });
});

Router.get("/videos", getVideosFromApi);

module.exports = Router;
