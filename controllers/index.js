var unirest = require("unirest");
const { Match } = require("../models/Match.model");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.fetchMatchesFromApi = async () => {
  try {
    var request = unirest("GET", process.env.API_URL);

    request.headers({
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
      useQueryString: true,
    });

    request.end(async function (response) {
      if (response.error) throw new Error(response.error);

      const matches = response.body;
      await insertMatchesIntoDb(matches);
      console.log({ success: true, size: matches.length });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMatchesFromApi = async (req, res, next) => {
  try {
    var request = unirest("GET", process.env.API_URL);

    request.headers({
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
      useQueryString: true,
    });

    request.end(async function (response) {
      if (response.error) throw new Error(response.error);

      const matches = response.body;
      await insertMatchesIntoDb(matches);
      res.json({ success: true, size: matches.length, matches });
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getMatchesFromDatabase = async (req, res, next) => {
  try {
    let matches = await Match.find().sort({ date: -1 });
    if (matches) {
      return res.json({ success: true, size: matches.length, matches });
    } else {
      return next(new ErrorResponse("no matches found", 404));
    }
  } catch (error) {
    return next(error);
  }
};

async function insertMatchesIntoDb(newMatches) {
  const currentMatches = await Match.find();
  let finalMatches = [];
  if (currentMatches) {
    let combined = [...newMatches, ...currentMatches];
    for (let i = 0; i < combined.length; i++) {
      let found = false;
      for (let j = 0; j < finalMatches.length; j++) {
        if (
          finalMatches[j].title === combined[i].title &&
          new Date(finalMatches[j].date).toISOString() ===
            new Date(combined[i].date).toISOString() &&
          finalMatches[j].url === combined[i].url
        ) {
          found = true;
          break;
        }
      }
      if (!found) {
        finalMatches.push(combined[i]);
      }
    }
  } else {
    finalMatches = [...newMatches];
  }

  await Match.create(finalMatches);
}
