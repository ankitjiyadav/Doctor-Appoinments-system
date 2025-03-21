const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("./models/adminmodels");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    try {
      const existingAdmin = await Admin.findOne({ email: "adminexample@gmail.com" });

      if (existingAdmin) {
        console.log("❌ Admin already exists!");
      } else {
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = new Admin({
          email: "adminexample@gmail.com",
          password: hashedPassword,
        });

        await admin.save();
        console.log("✅ Admin created successfully!");
      }
    } catch (error) {
      console.error("❌ Error creating admin:", error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch((err) => console.error("❌ Database connection error:", err));
