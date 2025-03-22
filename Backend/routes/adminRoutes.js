const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../models/adminmodels");
const Doctor = require("../models/adminadddoctors");

dotenv.config();
const router = express.Router();


// ✅ Static Admin Credentials (Backend में Defined)
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

// 🔹 **Admin Login API (Without Database)**
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔍 Checking Admin with email:", email);
    console.log("🔹 Entered Password:", password);

    // ✅ Directly Check Hardcoded Credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      console.log("❌ Invalid credentials!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Admin Authenticated!");
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Admin login successful" });
  } catch (err) {
    console.error("❌ Error during login:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// 🔹 **Doctor Login API (without bcrypt)**
router.post("/doctor-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if Doctor Exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ message: "Invalid credentials" });

    console.log("🔹 Entered Password:", password);
    console.log("🔹 Stored Password:", doctor.password);

    // ✅ Compare Passwords Directly
    if (password !== doctor.password) {
      console.log("❌ Password mismatch!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ doctorId: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Doctor login successful", doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
