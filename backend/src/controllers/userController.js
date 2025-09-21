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
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new userController();
