
const { AppError } = require("../../utils/errors");
class userRepository {
  async createUser(userData) {
    throw new AppError("Method not implemented");
  }

  async findUserByEmail(email) {
    throw new AppError("Method not implemented");
  }

  async findUserById(id) {
    throw new AppError("Method not implemented");
  }

  async updateUser(id, userData) {
    throw new AppError("Method not implemented");
  }
}
module.exports = userRepository;
