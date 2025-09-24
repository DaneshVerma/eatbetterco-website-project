const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/environments");
const { AppError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;
  // Prefer Authorization header, else fall back to cookie named "token"
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new AppError("Authentication token required", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
};
