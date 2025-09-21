const express = require("express");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/erorrHandlerMiddleware");
const cors = require("cors");
const { FRONTEND_URL } = require("./config/environments");

//initialize middleware
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
// configure CORS to allow your frontend and Authorization header
app.use(
  cors({
    origin: FRONTEND_URL ? [FRONTEND_URL] : true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//routes
app.use("/api", router);

//error handler
app.use(errorHandler);

module.exports = app;
