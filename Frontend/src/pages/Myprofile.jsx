import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // ✅ Token remove
    navigate("/login"); // ✅ Redirect
  };

  useEffect(() => {
    document.title = "My Profile";
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        setError("You are not logged in. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // ✅ 2 second me redirect
        return;
      }

      try {
        const response = await axios.get("https://doctor-appoinments-system-1.onrender.com/api/users/me", {
          headers: { Authorization: `Bearer ${authToken}` }, // ✅ Token sent
        });

        console.log("User Profile Response:", response.data); // ✅ Debugging

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          throw new Error("Unauthorized Access!");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err.response?.data || err.message);
        
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Session expired. Please login again.");
          localStorage.removeItem("authToken"); // ✅ Invalid token remove
          setTimeout(() => navigate("/login"), 2000); // ✅ 2 second me redirect
        } else {
          setError(err.response?.data?.message || "Failed to fetch profile!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-700">My Profile</h2>
        {user ? (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile || "N/A"}</p>
            <p><strong>Address:</strong> {user.address || "N/A"}</p>
            <p><strong>Date of Birth:</strong> {user.dob || "N/A"}</p>
            <p><strong>User ID:</strong> {user._id}</p>
            <p><strong>Joined Date:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <div className="mt-6 space-y-4">
              <button onClick={() => navigate("/edit-profile")} className="w-full bg-blue-500 text-white py-2 rounded">✏ Edit Profile</button>
              <button onClick={() => navigate("/change-password")} className="w-full bg-yellow-500 text-white py-2 rounded">🔒 Change Password</button>
              <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded">🚪 Logout</button>
            </div>
          </div>
        ) : (
          <p>Error loading user data.</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
