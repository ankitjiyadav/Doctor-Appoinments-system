const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../models/adminmodels");
const Doctor = require("../models/adminadddoctors") 
dotenv.config();

const router = express.Router();

// 🔹 **Admin Login API**
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔍 Checking Admin with email:", email);

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("❌ Admin not found in database!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("🔍 Admin Found:", admin);

    console.log("🔍 Comparing passwords...");
    console.log("🔹 Entered Password:", password);
    console.log("🔹 Stored Hashed Password:", admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("❌ Password mismatch!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password matched!");
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    console.error("❌ Error creating admin:", error.message);
        res.status(500).json({ error: err.message });
  }
});



router.post("/doctor-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if Doctor Exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Compare Passwords
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Generate JWT Token
    const token = jwt.sign({ doctorId: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Doctor login successful" ,doctor});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
