import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Login state based on localStorage token
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    // Check localStorage on component mount
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    setIsLoggedIn(false);
    navigate("/"); // Redirect to Home after logout
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4 shadow-lg w-full top-0 left-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">MyDoctors</div>

          {/* Navigation Links for Desktop */}
          <ul className="hidden md:flex space-x-6 font-bold text-xl">
            <li>
              <Link to="/" className="hover:text-red-800">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-800">
                About
              </Link>
            </li>

            {/* ✅ "All Doctors" Tab will only show if user is logged in */}
            {isLoggedIn && (
              <li>
                <Link to="/doctors" className="hover:text-red-800">
                  All Doctors
                </Link>
              </li>
            )}

            <li>
              <Link to="/contect" className="hover:text-red-800">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/adminLogin" className="hover:text-red-800 ml-9">
                Admin
              </Link>
            </li>
          </ul>

          {/* Show "Create Account" button if user is NOT logged in */}
          {!isLoggedIn ? (
            <div className="hidden md:block">
              <Link to="/register">
                <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-gray-600">
                  Create account
                </button>
              </Link>
            </div>
          ) : (
            // Show Dropdown Menu if user is logged in
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200"
              >
                My Account ▼
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded w-48">
                  <Link to="/my-appointments" className="block px-4 py-2 hover:bg-gray-200">
                    My Appointments
                  </Link>
                  <Link to="/Myprofile" className="block px-4 py-2 hover:bg-gray-200">
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
