const express = require("express");
const {
  getMatchesFromApi,
  getMatchesFromDatabase,
  getSingleMatch,
  searchMatch,
  getMatchesIndexes,
  addMatchManually,
} = require("../controllers");

const Router = express.Router();
Router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FtVid api",
  });
});

Router.get("/indexing", getMatchesIndexes);
Router.get("/videos/api", getMatchesFromApi);
Router.get("/videos", getMatchesFromDatabase);
Router.get("/videos/search", searchMatch);
Router.get("/videos/:id", getSingleMatch);
Router.post(`/add/${process.env.POST_URL}`, addMatchManually);

module.exports = Router;
