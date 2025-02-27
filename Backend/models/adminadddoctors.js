const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  experience: { type: Number, required: true },
  fees: { type: Number, required: true },
  about: { type: String },
  image: { type: String },  // Store image path
  slot: { type: String },
  time: { type: String },
  date: { type: String },
  day: { type: String },
});

module.exports = mongoose.model("Doctor", doctorSchema);
