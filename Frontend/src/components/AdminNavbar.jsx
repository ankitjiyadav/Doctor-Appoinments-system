import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AdminAddDoctors from "./AdminAddDoctors"; 
import Admindoctorslist from "./AdminDoctorslist";

const AdminNavbar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogout = () => {
    // यहां आप authentication clear कर सकते हैं (e.g., localStorage से token हटाना)
    localStorage.removeItem("adminToken"); // Example: JWT token हटाना

    // Logout के बाद home page पर redirect करें
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-red-600 text-white p-5 space-y-6">
        <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
        <nav className="space-y-4 text-center">
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "dashboard" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "appointments" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            Appointments
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "add-doctor" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("add-doctor")}
          >
            Add Doctors
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "doctors-list" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("doctors-list")}
          >
            Doctors List
          </button>
          {/* Logout Button */}
          <button
            className="block w-full text-center px-4 py-2 rounded bg-gray-500 hover:bg-orange-700"
            onClick={handleLogout} // Call handleLogout function
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-5 overflow-auto">
          {activeTab === "dashboard" && <h2 className="text-2xl">Dashboard</h2>}
          {activeTab === "appointments" && <h2 className="text-2xl">Appointments</h2>}
          {activeTab === "add-doctor" && <AdminAddDoctors />}
          {activeTab === "doctors-list" && <Admindoctorslist />}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
