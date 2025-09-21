const userRepository = require("../repositories/implementations/mongoUserRepo");
const { z } = require("zod");
const {AppError} = require("../utils/errors");
class userServices {
  constructor() {
    this.userRepository = new userRepository();
  }

  registerValidation(userData) {
    const RegisterSchema = z.object({
      email: z.string().email(),
      password: z.string().min(5),
      name: z.string().min(1),
      role: z.enum(["Admin", "User"]),
    });
    try {
      RegisterSchema.parse(userData);
    } catch (error) {
      return error;
    }
  }
  updateValidation(userData) {
    const UpdateSchema = z.object({
      email: z.string().email().optional(),
      password: z.string().min(5).optional(),
      name: z.string().min(1).optional(),
      role: z.enum(["Admin", "User"]).optional(),
    });
    try {
      UpdateSchema.parse(userData);
    } catch (error) {
      return error;
    }
  }
  async createUser(userData) {
    const registerValidation = this.registerValidation(userData);
    if (registerValidation) {
      throw new AppError("Validation failed", 400, registerValidation);
    }
    const existing = await this.userRepository.findUserByEmail(userData.email);
    if (existing) {
      throw new AppError("User already exists", 409);
    }
    const created = await this.userRepository.createUser(userData);
    return created;
  }
  async findUserByEmail(email) {
    return await this.userRepository.findUserByEmail(email);
  }
  async findUserById(id) {
    return await this.userRepository.findUserById(id);
  }
  async updateUser(id, userData) {
    const validation = this.updateValidation(userData);
    if (validation) {
      throw new AppError("Validation failed", 400, validation);
    }
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return await this.userRepository.updateUser(id, userData);
  }
}

module.exports = new userServices();
