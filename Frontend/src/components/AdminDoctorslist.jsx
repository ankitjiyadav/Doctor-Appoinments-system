import React, { useState, useEffect } from "react";

const AdminDoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  // Backend se doctors ka data fetch karna
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/doctors");
        const data = await response.json();
        console.log("Fetched Doctors:", data); // ✅ Response Dekhne ke liye
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        Doctors List
      </h1>

      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {/* Image Section */}
              <div className="w-full h-60 bg-gray-100 flex justify-center items-center">
                <img
                  src={
                    doctor.image
                      ? doctor.image
                      : "http://localhost:5001/default-doctor.png"
                  }
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "http://localhost:5001/default-doctor.png";
                  }}
                />
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {doctor.name}
                </h2>

                <p className="text-blue-500 font-semibold mb-2">
                  {doctor.speciality || "General Physician"}
                </p>

                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Experience:</span>{" "}
                  {doctor.experience} Years
                </p>

                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Fees:</span> ₹{doctor.fees}
                </p>

                <p className="text-gray-500">
                  <span className="font-semibold">Address:</span>{" "}
                  {doctor.address1 || "Not provided"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No doctors added yet.
        </p>
      )}
    </div>
  );
};

export default AdminDoctorsList;
