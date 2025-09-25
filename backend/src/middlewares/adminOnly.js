const { AppError } = require("../utils/errors");

// Ensure authMiddelware runs before this so req.user is populated with { id, role }
module.exports = function adminOnly(req, res, next) {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }
  if (req.user.role !== "Admin") {
    return next(new AppError("Admin access required", 403));
  }
  return next();
};
