var unirest = require("unirest");
const { Match } = require("../models/Match.model");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.getMatchesFromApi = async (req, res, next) => {
  try {
    var request = unirest("GET", process.env.API_URL);

    request.headers({
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
      useQueryString: true,
    });

    request.end(function (response) {
      if (response.error) throw new Error(response.error);

      res.json({ success: true, matches: response.body });
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getMatchesFromDatabase = async (req, res, next) => {
  try {
    let matches = await Match.find();
    if (matches) {
      return res.json({ success: true, matches });
    } else {
      return next(new ErrorResponse("no matches found", 404));
    }
  } catch (error) {
    return next(error);
  }
};
