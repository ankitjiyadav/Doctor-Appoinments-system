import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  experience: { type: Number, required: true },
  fees: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  degree: { type: String, required: true },
  address: { type: String, required: true },
  about: { type: String },
  image: { type: String }, // Image URL ya path
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
