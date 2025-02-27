const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// ✅ Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ 
      message: "User registered successfully", 
      token, 
      userId: user._id   // ✅ userId return kar rahe hain
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ 
      message: "Login successful", 
      token, 
      userId: user._id  // ✅ Fix: userId bhejna frontend ke liye
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerUser, loginUser };
