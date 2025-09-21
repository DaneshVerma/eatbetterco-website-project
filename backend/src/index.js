const express = require("express");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/erorrHandlerMiddleware");

//initialize middleware
const cors = require("cors");
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api", router);

//error handler
app.use(errorHandler);

module.exports = app;
