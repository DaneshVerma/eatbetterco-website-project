const userRepository = require("../repositories/implementations/mongoUserRepo");
const { z } = require("zod");
const { AppError } = require("../utils/errors");
const jwt = require("jsonwebtoken");
const { ADMIN_EMAIL } = require("../config/environments");

class userServices {
  constructor() {
    this.userRepository = new userRepository();
  }

  registerValidation(userData) {
    const RegisterSchema = z.object({
      email: z.string().email(),
      password: z.string().min(5),
      name: z.string().min(1),
      // role is not accepted from clients
    });
    try {
      RegisterSchema.parse(userData);
    } catch (error) {
      return error;
    }
  }
  loginValidation(userData) {
    const LoginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(5),
    });
    try {
      LoginSchema.parse(userData);
    } catch (error) {
      return error;
    }
  }
  updateValidation(userData) {
    const UpdateSchema = z.object({
      email: z.string().email().optional(),
      password: z.string().min(5).optional(),
      name: z.string().min(1).optional(),
      // role cannot be updated by users
    });
    try {
      UpdateSchema.parse(userData);
    } catch (error) {
      return error;
    }
  }

  async createUser(userData) {
    //validating input
    const registerValidation = this.registerValidation(userData);
    if (registerValidation) {
      throw new AppError("Validation failed", 400, registerValidation);
    }
    //checking if user already exists
    const existing = await this.userRepository.findUserByEmail(userData.email);
    if (existing) {
      throw new AppError("User already exists", 409);
    }
    // enforce role based on ADMIN_EMAIL
    const role = ADMIN_EMAIL && userData.email === ADMIN_EMAIL ? "Admin" : "User";
    //creating user with enforced role
    const created = await this.userRepository.createUser({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role,
    });
    const token = jwt.sign({ id: created._id, role: created.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      user: {
        id: created._id,
        email: created.email,
        name: created.name,
        role: created.role,
      },
      token,
    };
  }

  async loginUser(email, password) {
    //validating input
    const loginValidation = this.loginValidation({ email, password });
    if (loginValidation) {
      throw new AppError("Validation failed", 400, loginValidation);
    }
    //checking if user exists
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    //checking if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }
  async getUserProfileById(id) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
  async updateUser(id, userData) {
    // Never allow role updates from this path
    if (Object.prototype.hasOwnProperty.call(userData, "role")) {
      delete userData.role;
    }
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
