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

    request.end(function (response) {
      if (response.error) {
        console.log(response.error);
        return;
      }

      const matches = response.body;
      insertMatchesIntoDb(matches);
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

    request.end(function (response) {
      if (response.error) throw new Error(response.error);

      const matches = response.body;
      insertMatchesIntoDb(matches);
      res.json({ success: true, size: matches.length, matches });
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getMatchesFromDatabase = async (req, res, next) => {
  try {
    if (!req.query.page) {
      return next(new ErrorResponse("please provide the page to fetch", 400));
    }
    const options = {
      page: req.query.page,
      limit: 21,
      collation: {
        locale: "en",
      },
      sort: { date: -1 },
    };
    // let matches = await Match.find().sort({ date: -1 });
    let matches = await Match.paginate({}, options);
    if (matches) {
      return res.json({ success: true, size: matches.length, matches });
    } else {
      return next(new ErrorResponse("no matches found", 404));
    }
  } catch (error) {
    return next(error);
  }
};

module.exports.searchMatch = async (req, res, next) => {
  try {
    if (!req.query.search) {
      return next(new ErrorResponse("please provide a search key"));
    }
    let results = await Match.find({
      title: new RegExp(req.query.search, "i"),
    }).sort({ date: -1 });
    if (results) {
      return res.json({
        success: true,
        matches: results,
      });
    }
  } catch (error) {
    return next(new ErrorResponse("error occured while searching", 400));
  }
};

module.exports.getSingleMatch = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next("Please provide match id", 400);
    }

    let match = await Match.findById(req.params.id);
    if (match) {
      return res.json({
        success: true,
        match,
      });
    }

    return next(new ErrorResponse("match not found", 404));
  } catch (error) {
    return next(new ErrorResponse("error occured"));
  }
};

async function insertMatchesIntoDb(newMatches) {
  try {
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
  } catch (error) {
    console.log("Error occured" + error);
  }
}
