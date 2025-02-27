const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Appointment = require("../models/appoinmentsmodels");

// ✅ Book an appointment
router.post("/book", async (req, res) => {
    try {
        const { userId, doctorId, date, time, slot } = req.body;

        if (!userId || !doctorId || !date || !time || !slot) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newAppointment = new Appointment({ userId, doctorId, date, time, slot });
        await newAppointment.save();

        res.status(201).json({ success: true, message: "Appointment booked successfully", appointment: newAppointment });

    } catch (error) {
        console.error("❌ Error booking appointment:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

// ✅ Get User's Appointments
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("✅ Fetching appointments for user:", userId);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        // ✅ Fix ObjectId issue
        const appointments = await Appointment.find({ userId: new mongoose.Types.ObjectId(userId) })
            .populate({ path: "doctorId", select: "name speciality" });

        if (appointments.length === 0) {
            return res.status(404).json({ success: false, message: "No appointments found for this user." });
        }

        res.status(200).json({ success: true, appointments });

    } catch (error) {
        console.error("❌ Error fetching appointments:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;
