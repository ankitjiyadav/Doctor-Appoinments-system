import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making request

    const apiUrl =
      role === "admin"
        ? "http://localhost:5001/api/admin/login"
        : "http://localhost:5001/api/doctor/logins"; // Doctor login API

    console.log("🔄 Logging in as:", role);
    console.log("🔗 API URL:", apiUrl);
    
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📩 API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token); // ✅ Store token for authentication

      if (role === "admin") {
        console.log("✅ Redirecting to /adminnavbar");
        navigate("/adminnavbar"); // ✅ Navigate to Admin Dashboard
      } else {
        console.log("✅ Redirecting to /doctorappoinment");
        navigate("/doctorappoinment"); // ✅ Navigate to Doctor Dashboard
      }
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {role === "admin" ? "Admin Login" : "Doctor Login"}
        </h2>

        {/* Role Selection Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              role === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              role === "doctor"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole("doctor")}
          >
            Doctor
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
