const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");

//routes aggregator
router.use("/user", userRoutes)

module.exports = router;
