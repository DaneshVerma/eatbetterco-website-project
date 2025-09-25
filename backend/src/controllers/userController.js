const userServices = require("../services/userServices");

class userController {
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const result = await userServices.createUser({
        email,
        password,
        name,
      });
      const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000, // 1 hour
      };
      res.cookie("token", result.token, cookieOptions);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await userServices.loginUser(email, password);
      const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000, // 1 hour
      };
      res.cookie("token", result.token, cookieOptions);
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMe(req, res, next) {
    try {
      const user = await userServices.getUserProfileById(req.user.id);
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new userController();
