import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import doctorsimage1 from "../assets/doc0.png"; // Replace with your actual image path
import doctorimage2 from "../assets/doc1.png";
import doctorimage3 from "../assets/doc2.png";
import doctorimage4 from "../assets/doc3.png";
import doctorimage5 from "../assets/doc4.png";
import doctorimage6 from "../assets/doc5.png";
import doctorimage7 from "../assets/doc6.png";
import doctorimage12 from "../assets/doc12.png"; // सही पथ दें


const Home = () => {
  const navigate = useNavigate();
  
  // ✅ Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    document.title = "Home Page";
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  // ✅ Function to handle profile click
  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/doctors"); // If logged in, go to doctors page
    } else {
      navigate("/login"); // If not logged in, go to login page
    }
  };

  const doctors = [
    {
      name: "Dr. Aarti Sharma",
      image: doctorimage2,
      speciality: "General physician",
      aleart: "● Available",
    },
    {
      name: "Dr. Vikram Singh",
      image: doctorimage3,
      speciality: "Gynecologist",
      aleart: "● Available",
    },
    {
      name: "Dr. Priya Nair",
      image: doctorimage4,
      speciality: "Dermatologist",
      aleart: "● Available",
    },
    {
      name: "Dr. Aman Verma",
      image: doctorimage5,
      speciality: "Pediatrician",
      aleart: "● Available",
    },
    {
      name: "Dr. Sneha Roy",
      image: doctorimage6,
      speciality: "Neurologist",
      aleart: "● Available",
    },
    {
      name: "Dr. Karan Patel",
      image: doctorimage7,
      speciality: "Gastroenterologist",
      aleart: "● Available",
    },
  ];

  return (
    <>
      {/* First Section */}
      <div className="bg-gray-600 flex flex-col lg:flex-row items-center justify-between lg:px-10">
        <div className="text-center lg:text-left max-w-lg ml-16">
          <h1 className="text-white text-5xl lg:text-6xl font-bold leading-tight">
            Book Appointment <br /> With Trusted Doctors
          </h1>
          <p className="text-white text-lg mb-6 font-bold">
            Simply browse through our extensive list of trusted doctors, <br />
            schedule your appointment hassle-free.
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200">
            Book Appointment →
          </button>
        </div>
        <div className="lg:mt-0 flex justify-center lg:justify-end">
          <img
            src={doctorsimage1}
            alt="Doctors illustration"
            className="w-[600px] h-[600px] rounded-lg mr-16 mt-52"
          />
        </div>
      </div>

      {/* Third Section - Top Doctors to Book */}
      <div>
        <div className="text-center mt-7 font-bold">
          <h1 className="text-4xl text-red-900">Top Doctors to Book</h1>
          <p className="text-xl mt-4">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        {/* ✅ Show doctors list to all users */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-green-500">{doctor.aleart}</h3>
                <h2 className="text-xl font-semibold text-gray-800">
                  {doctor.name}
                </h2>
                <p>{doctor.speciality}</p>
                
                {/* ✅ When user clicks, check login status */}
                <button
                  onClick={handleProfileClick}
                  className="mt-2 inline-block text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium items-center"
                >
                  Visit Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fourth Section */}
      <div className="bg-blue-600 flex flex-col lg:flex-row items-center justify-between lg:px-10 mt-8">
        <div>
          <h1 className="text-white text-5xl font-bold">
            Book Appointment <br />
            <span className="text-red-700">With 100+ Trusted Doctors</span>
          </h1>
          <Link to="/register">
            <button className="bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 mt-9">
              Create Account
            </button>
          </Link>
        </div>
        <div className="mt-10 lg:mt-0 flex justify-center lg:justify-end">
          <img
            src={doctorimage12}
            alt="image"
            className="w-[400px] h-[400px] rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
