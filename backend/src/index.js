const express = require("express");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/erorrHandlerMiddleware");
const cors = require("cors");
const { FRONTEND_URL } = require("./config/environments");
const path = require("path");

//initialize middleware
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// configure CORS to allow your frontend and credentials
app.use(
  cors({
    origin: FRONTEND_URL ? [FRONTEND_URL] : true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies to be sent
  })
);

//routes
app.use("/api", router);

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
//error handler
app.use(errorHandler);

module.exports = app;
