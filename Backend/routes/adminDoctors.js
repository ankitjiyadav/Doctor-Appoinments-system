const express = require("express");
const mongoose = require("mongoose");
const Doctor = require("../models/adminadddoctors"); // ✅ सही मॉडल इम्पोर्ट किया
const router = express.Router();

// 🔹 1️⃣ सभी डॉक्टरों को प्राप्त करें (Get All Doctors)
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

// 🔹 2️⃣ डॉक्टर को ID से प्राप्त करें (Get Doctor by ID)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Doctor ID" });
    }

    console.log("Fetching doctor with ID:", id);

    // ✅ Use findById instead of find({_id:id})
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ success: false, message: "Error fetching doctor", error });
  }
});

// 🔹 3️⃣ डॉक्टर की जानकारी अपडेट करें (Update Doctor)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Doctor ID" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update Failed", error });
  }
});

// 🔹 4️⃣ डॉक्टर को हटाएं (Delete Doctor)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Doctor ID" });
    }

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, message: "Doctor Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete Failed", error });
  }
});

module.exports = router;
