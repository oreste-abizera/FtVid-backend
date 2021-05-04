const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [trur, "title of the match is required"],
  },
  embed: {
    type: String,
  },
  url: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  date: {
    type: Date,
  },
  side1: {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  side2: {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  competition: {
    name: {
      type: String,
    },
    id: {
      type: Number,
    },
    url: {
      type: String,
    },
  },
  videos: [
    {
      title: {
        type: String,
      },
      embed: {
        type: String,
      },
    },
  ],
});

module.exports.Match = new mongoose.model("Match", MatchSchema);
