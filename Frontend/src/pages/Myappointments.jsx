import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) {
            console.error("❌ No userId found in localStorage!");
            setError("User ID missing. Please log in.");
            setLoading(false);
            return;
        }

        const fetchAppointments = async () => {
            try {
                console.log(`📢 Fetching appointments for user: ${userId}`);
                const response = await axios.get(`http://localhost:5001/api/appointments/${userId}`);

                if (response.data && response.data.success && response.data.appointments.length > 0) {
                    setAppointments(response.data.appointments);
                } else {
                    setError("No appointments found.");
                }
            } catch (err) {
                console.error("❌ Error fetching appointments:", err);
                setError(err.response?.data?.message || "Something went wrong while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [userId]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4 text-center text-red-700">My Appointments</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : appointments.length === 0 ? (
                <p>No appointments booked yet.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-400 text-center mt-10">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border p-2">Doctor</th>
                            <th className="border p-2">Speciality</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Time</th>
                            <th className="border p-2">Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id} className="border">
                                <td className="border p-2">{appointment?.doctorId?.name || "Unknown Doctor"}</td>
                                <td className="border p-2">{appointment?.doctorId?.speciality || "Unknown Speciality"}</td>
                                <td className="border p-2">{appointment?.date || "N/A"}</td>
                                <td className="border p-2">{appointment?.time || "N/A"}</td>
                                <td className="border p-2">{appointment?.slot || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyAppointments;
