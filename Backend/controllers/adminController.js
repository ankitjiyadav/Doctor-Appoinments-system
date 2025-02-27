const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("./models/adminmodels"); // ✅ Correct Import

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new Admin({ email: "admin@example.com", password: hashedPassword });

    await admin.save();
    console.log("✅ Admin created successfully!");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    mongoose.connection.close();
  }
});
