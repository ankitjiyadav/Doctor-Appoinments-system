const Doctor = require("../models/adminadddoctors");
const bcrypt = require("bcryptjs");

// ✅ Add a new doctor
exports.addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      address1,
      address2,
      experience,
      fees,
      about,
      slot,
      time,
      date,
      day,
    } = req.body;

    // ✅ Normalize email
    const normalizedEmail = email.toLowerCase();

    // ✅ Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email: normalizedEmail });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // ✅ Hash Password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Store image path if uploaded
    const imagePath = req.file ? `uploads/${req.file.filename}` : "";

    // ✅ Create new doctor instance
    const doctor = new Doctor({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      speciality,
      degree,
      address1,
      address2,
      experience,
      fees,
      about,
      image: imagePath,
      slot,
      time,
      date,
      day,
    });

    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully!", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    // ✅ Ensure correct image URL
    const doctorsWithImage = doctors.map((doctor) => ({
      ...doctor._doc,
      image: doctor.image
        ? `http://localhost:5001/${doctor.image}` // ✅ Correct image URL
        : "",
    }));

    res.json(doctorsWithImage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
