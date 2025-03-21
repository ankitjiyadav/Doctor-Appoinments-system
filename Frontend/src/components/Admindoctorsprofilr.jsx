import React, { useState, useEffect } from "react";
import axios from "axios";

const Admindoctorsprofile = () => {
  const doctorInfo = localStorage.getItem("doctor"); 

  const doctorData = doctorInfo ? JSON.parse(doctorInfo) : null;
  const id = doctorData && doctorData._id ? doctorData._id : null; 

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("Doctor Object:", doctorInfo);
  console.log("Doctor ID:", id);

  useEffect(() => {
    if (!id) {
      console.error("Doctor ID missing!");
      setLoading(false);
      return;
    }

    const fetchDoctor = async () => {
      try {
        const url = `https://doctor-appoinments-system-1.onrender.com/api/admindoctor/${id}`;
        console.log("Fetching data from:", url);

        const res = await axios.get(url);  // ✅ Await added
        console.log("API Response:", res.data);

        setDoctor(res.data.doctor);
      } catch (error) {
        console.error("API Error:", error.message);
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading doctor details...</p>
      ) : doctor ? (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={doctor.image ? `https://doctor-appoinments-system-1.onrender.com/${doctor.image}` : "/default-avatar.png"}
            alt="Doctor"
            className="w-32 h-32 rounded-full border-2 border-gray-300"
          />
          <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
          <p className="text-gray-700"><strong>Speciality:</strong> {doctor.speciality}</p>
          <p className="text-gray-700"><strong>Experience:</strong> {doctor.experience} Years</p>
          <p className="text-gray-700"><strong>Fees:</strong> ₹{doctor.fees}</p>
          <p className="text-gray-700"><strong>Email:</strong> {doctor.email}</p>
          <p className="text-gray-700"><strong>Degree:</strong> {doctor.degree}</p>
          <p className="text-gray-700"><strong>Address:</strong> {doctor.address}</p>
          <p className="text-gray-600 text-center max-w-lg">
            <strong>About:</strong> {doctor.about}
          </p>
        </div>
      ) : (
        <p className="text-center text-red-500">Doctor Not Found</p>
      )}
    </div>
  );
};

export default Admindoctorsprofile;
