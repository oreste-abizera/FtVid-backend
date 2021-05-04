//LOAD ENV VARS
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
require("./config/db");
require("colors");

const express = require("express");
const ErrorHandler = require("./middlewares/error");

const app = express();
//import routes
const Router = require("./routes/index");

app.use(Router);
app.use(ErrorHandler);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Node js server running on port ${PORT}`));
