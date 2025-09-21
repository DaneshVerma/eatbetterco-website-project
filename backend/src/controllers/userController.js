const userServices = require("../services/userServices");

class userController {
  async register(req, res, next) {
    try {
      const { email, password, name, role } = req.body;
      const user = await userServices.createUser({
        email,
        password,
        name,
        role,
      });
      res.cookie("token", user.token);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userServices.loginUser(email, password);
      res.cookie("token", user.token);
      res.status(200).json({
        success: true,
        message: "Login successful",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new userController();
