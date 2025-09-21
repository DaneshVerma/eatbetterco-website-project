const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//public routes
router.post("/register", userController.register);

//protected routes

module.exports = router;
