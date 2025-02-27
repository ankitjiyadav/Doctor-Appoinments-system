const User = require("../models/userProfilemodel");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getUserProfile };
