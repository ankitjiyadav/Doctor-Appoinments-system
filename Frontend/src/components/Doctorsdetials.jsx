import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({});
  const [message, setMessage] = useState("");

  // ✅ Fetch User Data from Local Storage
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userId = user && user.userId ? user.userId : null; // ✅ Corrected Key

  console.log("User Data from Local Storage:", user); // Debugging
  console.log("Extracted User ID:", userId); // Debugging

  useEffect(() => {
    axios.get(`http://localhost:5001/api/doctorss/${id}`)
      .then(response => {
        console.log("Doctor API Response:", response.data); // ✅ Debugging
        if (response.data.success && response.data.doctor) {
          setDoctor(response.data.doctor);
        } else {
          console.error("Doctor data not found.");
          setDoctor(null);
        }
      })
      .catch(error => {
        console.error("Error fetching doctor details:", error.response?.data || error.message);
      });
  }, [id]);

  const handleAppointment = () => {
    // ✅ Check if user is logged in
    if (!userId) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    // ✅ Check if doctor details are available
    if (!doctor || !doctor._id || !doctor.date || !doctor.time || !doctor.slot) {
      alert("Doctor details are incomplete!");
      return;
    }

    // ✅ Debugging: Check data before sending request
    console.log("Booking Appointment Data:", {
      userId: userId,
      doctorId: doctor._id,
      date: doctor.date,
      time: doctor.time,
      slot: doctor.slot
    });

    axios.post("http://localhost:5001/api/appointments/book", {
      userId: userId,
      doctorId: doctor._id,
      date: doctor.date,
      time: doctor.time,
      slot: doctor.slot
    })
    .then(response => {
      if (response.data.success) {
        setMessage("Appointment booked successfully!");
        
        // ✅ Navigate to My Appointments page after booking
        setTimeout(() => {
          navigate("/my-appointments");
        }, 1500);
      } else {
        setMessage("Failed to book appointment.");
      }
    })
    .catch(error => {
      console.error("Error booking appointment:", error);
      setMessage("Error booking appointment.");
    });
  };

  if (!doctor || Object.keys(doctor).length === 0) return <h2>Loading...</h2>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center">
          <img 
            src={doctor.image ? `http://localhost:5001/${doctor.image}` : "/default-avatar.png"} 
            alt={doctor.name || "Doctor Image"} 
            className="w-40 h-40 rounded-full shadow-lg border"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{doctor.name}</h1>
            <p className="text-lg text-gray-700">{doctor.speciality}</p>
            <p className="text-gray-600">{doctor.about}</p>
            <p className="text-green-600 font-semibold text-xl">₹{doctor.fees}</p>
          </div>
        </div>

        <h2 className="mt-6 text-xl font-bold">Available Slots</h2>
        {doctor.slot ? (
          <div>
            <p><strong>Available Slot:</strong> {doctor.slot}</p>
            <p><strong>Time:</strong> {doctor.time}</p>
            <p><strong>Date:</strong> {doctor.date}</p>
            <p><strong>Day:</strong> {doctor.day}</p>
          </div>
        ) : (
          <p>Slot Not Available</p>
        )}

        <button 
          onClick={handleAppointment} 
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg"
        >
          Book Appointment
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default DoctorDetails;
