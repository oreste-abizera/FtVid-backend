const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// mongoosePaginate.paginate.options = {
//   lean: true,
//   limit: 20,
// };

const MatchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title of the match is required"],
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

MatchSchema.index({ title: 1, date: 1, url: 1 }, { unique: 1 });

MatchSchema.plugin(mongoosePaginate);

MatchSchema.pa;

module.exports.Match = new mongoose.model("Match", MatchSchema);
