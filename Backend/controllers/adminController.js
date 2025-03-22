const mongoose = require("mongoose");
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
        const admin = new Admin({
          email: "adminexample@gmail.com",
          password: "admin123",  // ✅ No Hashing
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
