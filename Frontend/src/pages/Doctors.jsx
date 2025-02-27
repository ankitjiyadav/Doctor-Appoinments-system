import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check if user is logged in
    const token = localStorage.getItem("token"); // Token ya kisi bhi auth method ka use karein
    if (!token) {
      navigate("/login"); // Login page pe redirect karna
      return;
    }

    // ✅ Fetch doctors only if user is logged in
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/doctors", {
          headers: {
            Authorization: `Bearer ${token}`, // Agar API ke liye token required hai
          },
        });
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [navigate]);

  const specialties = [
    "All",
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const filteredDoctors =
    selectedSpecialty === "All"
      ? doctors
      : doctors.filter((doctor) => doctor.speciality === selectedSpecialty);

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctorsdetails/${doctorId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        Browse Through the Doctors Specialist
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ✅ Specialty Filter */}
        <div className="w-full md:w-1/4 flex flex-col gap-2">
          {specialties.map((specialty, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded-lg text-lg font-semibold ${
                selectedSpecialty === specialty
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-blue-400 transition`}
              onClick={() => setSelectedSpecialty(specialty)}
            >
              {specialty}
            </button>
          ))}
        </div>

        {/* ✅ Doctors List */}
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="border rounded-lg p-6 shadow-xl bg-white hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
                onClick={() => handleDoctorClick(doctor._id)}
              >
                <div className="w-32 h-32 mb-3 flex justify-center">
                  <img
                    src={doctor.image || "/default-image.png"}
                    alt={doctor.name}
                    className="w-full h-full object-cover rounded-full border-2 border-gray-300 shadow-md"
                    onError={(e) => {
                      if (e.target.src !== "/default-image.png") {
                        e.target.src = "/default-image.png"; // ✅ Sirf ek baar default image lagayega
                      }
                    }}
                  />
                </div>
                <p className="text-green-600 font-semibold">● Available</p>
                <h3 className="text-lg font-bold text-center">{doctor.name}</h3>
                <p className="text-gray-600 text-center">
                  {doctor.speciality ? doctor.speciality : "General Physician"}
                </p>
                <p className="text-gray-700 font-semibold text-center">
                  Fees: ₹{doctor.fees || "N/A"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 w-full">
              No doctors available in this specialty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
