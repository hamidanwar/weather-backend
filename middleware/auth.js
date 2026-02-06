const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.split(" ")[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
