var unirest = require("unirest");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.getVideosFromApi = async (req, res, next) => {
  try {
    var request = unirest("GET", process.env.API_URL);

    request.headers({
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
      useQueryString: true,
    });

    request.end(function (response) {
      if (response.error) throw new Error(response.error);

      res.json(response.body);
    });
  } catch (error) {
    return next(error);
  }
};
