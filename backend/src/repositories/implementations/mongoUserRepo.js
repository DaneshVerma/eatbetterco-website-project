const userRepository = require("../contracts/userRepository");
const User = require("../../models/user.model");

class mongoUserRepo extends userRepository {
  async createUser(userData) {
    const created = await User.create(userData);
    return created;
  }
  async findUserByEmail(email) {
    return await User.findOne({ email });
  }
  async findUserById(id) {
    return await User.findById(id);
  }
  async updateUser(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }
}
module.exports = mongoUserRepo;
