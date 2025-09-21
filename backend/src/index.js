const express = require("express");
const { PORT } = require("./config/environments");
const connectDB = require("./config/db");

const app = express();

function startServer() {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();
