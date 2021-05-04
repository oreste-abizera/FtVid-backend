const express = require("express");

const Router = express.Router();
Router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FtVid api",
  });
});

module.exports = Router;
