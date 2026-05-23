const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // GET TOKEN FROM HEADERS
  const authHeader = req.headers.authorization;

  // TOKEN NOT FOUND
  if (!authHeader) {
    return res.status(401).json({ message: "No token found" });
  }

  // EXTRACT TOKEN
  const token = authHeader.split(" ")[1];

  try {
    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // STORE USER DATA
    req.user = decoded;

    // MOVE TO NEXT FUNCTION
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
