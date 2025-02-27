const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();  // ✅ dotenv sabse pehle load karein

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminadddocterroutes = require('./routes/adminadddoctorsRoutes')
const doctorRoutes = require("./routes/doctorsdetelesRoutes");
const appointmentRoutes = require("./routes/appoinmentsRoutes");
const userprofileRoutes = require('./routes/userProfileRoutes')
const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();


// Middleware
app.use(bodyParser.json());

// ✅ Static folder for images
app.use("/uploads", express.static("uploads"));

// ✅ Make sure MONGO_URI is read from .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use("/api/admin", adminRoutes); 
app.use("/api/doctors", adminadddocterroutes);
app.use("/api/doctorss", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userprofileRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
