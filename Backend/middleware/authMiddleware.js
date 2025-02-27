const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Backend JWT_SECRET
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(403).json({ message: "Invalid Token", error });
  }
};

module.exports = verifyToken;
