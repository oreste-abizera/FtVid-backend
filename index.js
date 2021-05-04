const express = require("express");

const app = express();
//import routes
const Router = require("./routes/index");

app.use(Router);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Node js server running on port ${PORT}`));
