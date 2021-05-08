//LOAD ENV VARS
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
require("./config/db");
require("colors");
const cors = require("cors");

const { fetchMatchesFromApi } = require("./controllers/index");
fetchMatchesFromApi();
const CronJob = require("cron").CronJob;
const job = new CronJob(
  "0 */10 * * * *",
  fetchMatchesFromApi,
  null,
  true,
  "America/Los_Angeles"
);
job.start();

const express = require("express");
const ErrorHandler = require("./middlewares/error");

const app = express();
//import routes
const Router = require("./routes/index");

app.use(cors());
app.use(Router);
app.use(ErrorHandler);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Node js server running on port ${PORT}`));
