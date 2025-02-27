const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../models/adminmodels"); // ✅ Ensure Correct Model Import
dotenv.config();  // ✅ Load .env variables

const router = express.Router();

// 🔹 **Admin Login API**
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if Admin Exists
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Compare Passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Generate JWT Token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is missing in .env file" });
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,  // ✅ Ensure JWT_SECRET is defined
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
