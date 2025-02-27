const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  day: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const DoctorSchema = new mongoose.Schema(
  {
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
    image: { type: String },
    slots: [SlotSchema], // ✅ Slots को Array में रखा गया है
  },
  { timestamps: true }
);
const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;
