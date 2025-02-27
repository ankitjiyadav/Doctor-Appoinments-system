import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Doctorappoinment = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const bookAppointment = async (slot) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/appointments/book`, {
        doctorId: id,
        userId: "USER_ID",
        slot,
      });

      if (response.data.success) {
        setBookingMessage("Appointment booked successfully!");
      } else {
        setBookingMessage("Failed to book appointment. Try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setBookingMessage("Error occurred while booking appointment.");
    }
    setTimeout(() => setBookingMessage(""), 3000);
  };

  if (loading) return <h2 className="text-center text-lg">Loading...</h2>;
  if (!doctor) return <h2 className="text-center text-lg text-red-500">No doctor details found.</h2>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      {bookingMessage && <div className="text-center bg-green-100 text-green-700 py-2 px-4 rounded-md mb-4">{bookingMessage}</div>}
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-[180px] h-[180px] overflow-hidden rounded-full shadow-lg">
          <img src={doctor.image || "/default-image.png"} alt={doctor.name} className="w-full h-full object-cover" />
        </div>
        <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-600">{doctor.name}</h2>
          <p className="text-lg text-gray-700">{doctor.speciality}</p>
          <p className="mt-2 text-lg font-semibold text-green-600">Fees: ₹{doctor.fees}</p>
        </div>
      </div>
      {doctor.about && <p className="text-gray-700 mt-2">{doctor.about}</p>}
      <h3 className="mt-6 text-xl font-semibold text-gray-800">Available Slots:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {doctor.slots?.length > 0 ? (
          doctor.slots.map((slot, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md bg-gray-50">
              <p className="text-gray-800 font-semibold">{slot.day} ({slot.date})</p>
              <p className="text-gray-600">Time: {slot.time}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => bookAppointment(slot)}>Book Appointment</button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No available slots.</p>
        )}
      </div>
    </div>
  );
};

export default Doctorappoinment;
