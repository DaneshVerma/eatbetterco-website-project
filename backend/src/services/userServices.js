const userRepository = require("../repositories/implementations/mongoUserRepo");
const { z } = require("zod");
const { AppError } = require("../utils/errors");
const jwt = require("jsonwebtoken");

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
  loginValidation(userData) {
    const LoginSchema = z.object({
      email: z.email(),
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
      role: z.enum(["Admin", "User"]).optional(),
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
    //creating user
    const created = await this.userRepository.createUser(userData);
    const token = jwt.sign({ id: created._id }, process.env.JWT_SECRET, {
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
