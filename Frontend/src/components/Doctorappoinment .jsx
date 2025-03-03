import React, { useState } from "react";
import { FaUser, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa"; // ✅ Correct Import

const DoctorAppointment = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-600 text-white p-5 flex flex-col">
        {/* Doctor Profile in Sidebar */}
        <div className="flex items-center space-x-3">
          <img
            src="/default-image.png"
            alt="Doctor"
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div>
            <h2 className="text-lg font-bold">Dr. John Doe</h2>
            <p className="text-sm text-gray-200">Cardiologist</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 space-y-2">
          <button
            className={`flex items-center space-x-2 p-2 rounded-md w-full ${
              activeTab === "profile" ? "bg-blue-800" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser />
            <span>Profile</span>
          </button>
          <button
            className={`flex items-center space-x-2 p-2 rounded-md w-full ${
              activeTab === "appointments" ? "bg-blue-800" : ""
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            <FaCalendarCheck />
            <span>Appointments</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 rounded-md w-full bg-red-500 hover:bg-red-600 mt-4"
            onClick={() => alert("Logged Out!")}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Doctor Profile</h2>
            <p>Name: Dr. John Doe</p>
            <p>Specialization: Cardiologist</p>
            <p>Experience: 10 Years</p>
          </div>
        )}

        {activeTab === "appointments" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Appointments</h2>
            <p>No Appointments Yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;
