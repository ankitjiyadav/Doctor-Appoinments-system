const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const verifyToken = require("../middleware/authMiddleware"); // ✅ Middleware Import

router.get("/me", verifyToken, async (req, res) => {
  try {
    console.log("Decoded Token UserID:", req.user.userId); // ✅ Debugging Token
    const user = await User.findById(req.user.userId).select("-password");
    
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
