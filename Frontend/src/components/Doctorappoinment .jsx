import React, { useState } from "react";
import { FaUserMd, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Navigation Hook
import Admindoctorsprofilr from "./Admindoctorsprofilr";
import MyAppointments from "../pages/Myappointments";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate(); // ✅ Initialize Navigation

  // ✅ लॉगआउट फ़ंक्शन
  const handleLogout = () => {
    localStorage.removeItem("token");  // ✅ टोकन हटाएँ
    localStorage.removeItem("doctor"); // ✅ डॉक्टर की जानकारी हटाएँ
    navigate("/"); // ✅ होम पेज पर भेजें
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gray-800 text-white p-6 flex flex-col shadow-lg">
        <h2 className="text-center text-xl font-semibold">Doctors Profile</h2>

        <nav className="mt-6 space-y-2">
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg w-full transition ${
              activeTab === "profile" ? "bg-blue-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaCalendarCheck />
            <span>Profile</span>
          </button>

          <button
            className={`flex items-center space-x-2 p-3 rounded-lg w-full transition ${
              activeTab === "appointments" ? "bg-blue-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            <FaUserMd />
            <span>Appointments</span>
          </button>

          {/* ✅ लॉगआउट बटन */}
          <button
            className="flex items-center space-x-2 p-3 rounded-lg w-full bg-red-500 hover:bg-red-600 mt-auto"
            onClick={handleLogout} // ✅ Updated Logout Function
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-5 overflow-auto">
          {activeTab === "appointments" && <MyAppointments />}
          {activeTab === "profile" && <Admindoctorsprofilr />}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
