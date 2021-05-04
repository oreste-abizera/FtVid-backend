const express = require("express");
const { getMatchesFromApi, getMatchesFromDatabase } = require("../controllers");

const Router = express.Router();
Router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FtVid api",
  });
});

Router.get("/videos/api", getMatchesFromApi);
Router.get("/videos", getMatchesFromDatabase);

module.exports = Router;
