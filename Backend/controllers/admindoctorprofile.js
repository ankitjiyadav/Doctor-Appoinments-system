import Doctor from "../models/doctorsdetelesmodels";

// GET Single Doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
