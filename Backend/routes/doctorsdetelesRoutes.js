const express = require("express");
const Doctor = require("../models/doctorsdetelesmodels");
const router = express.Router();

// ✅ Create a new doctor
router.post("/", async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, fees, address1 } = req.body;

    if (!name || !email || !password || !speciality || !degree || !experience || !fees || !address1) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const doctor = new Doctor({ ...req.body, slots: [] }); // Ensure slots array is initialized
    await doctor.save();
    res.status(201).json({ success: true, doctor });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ success: false, message: "Error creating doctor", error });
  }
});

// ✅ Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ success: false, message: "Error fetching doctors", error });
  }
});

// ✅ Get a single doctor by ID (with slots)
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ success: false, message: "Error fetching doctor", error });
  }
});

// ✅ Add a new slot to a doctor
router.post("/:id/slots", async (req, res) => {
  try {
    const { day, date, time } = req.body;
    if (!day || !date || !time) {
      return res.status(400).json({ success: false, message: "Day, Date, and Time are required" });
    }

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    const newSlot = { day, date, time, _id: new Date().getTime().toString() }; // Assign unique ID
    doctor.slots.push(newSlot);
    await doctor.save();

    res.status(200).json({ success: true, slots: doctor.slots });
  } catch (error) {
    console.error("Error adding slot:", error);
    res.status(500).json({ success: false, message: "Error adding slot", error });
  }
});

// ✅ Update a slot
router.put("/:doctorId/slots/:slotId", async (req, res) => {
  try {
    const { day, date, time } = req.body;
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    const slot = doctor.slots.find(s => s._id === req.params.slotId);
    if (!slot) return res.status(404).json({ success: false, message: "Slot not found" });

    slot.day = day || slot.day;
    slot.date = date || slot.date;
    slot.time = time || slot.time;

    await doctor.save();
    res.status(200).json({ success: true, slots: doctor.slots });
  } catch (error) {
    console.error("Error updating slot:", error);
    res.status(500).json({ success: false, message: "Error updating slot", error });
  }
});

// ✅ Delete a slot
router.delete("/:doctorId/slots/:slotId", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    doctor.slots = doctor.slots.filter(slot => slot._id !== req.params.slotId);
    await doctor.save();

    res.status(200).json({ success: true, slots: doctor.slots });
  } catch (error) {
    console.error("Error deleting slot:", error);
    res.status(500).json({ success: false, message: "Error deleting slot", error });
  }
});

module.exports = router;
