const mongoose = require("mongoose");
const {MONGO_URI} = require("../config/environments");
const logger = require("../utils/logger");

async function connectDB(){
    try {
        await mongoose.connect(MONGO_URI);
        logger.info("MongoDB connected");
    } catch (error) {
        logger.error("MongoDB connection error", error);
        process.exit(1);
    }
}
module.exports = connectDB;