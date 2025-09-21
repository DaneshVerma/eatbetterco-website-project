const { PORT } = require("./src/config/environments");
const app = require("./src/index");
const connectDB = require("./src/config/db");
const logger = require("./src/utils/logger");

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
}

startServer();
