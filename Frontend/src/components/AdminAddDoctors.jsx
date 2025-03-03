import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAddDoctors = () => {
  document.title = "Add Doctors";
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "General Physician",
    degree: "",
    address1: "",
    address2: "",
    experience: "",
    fees: "",
    about: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctorData({ ...doctorData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    Object.keys(doctorData).forEach((key) => {
      formData.append(key, doctorData[key]);
    });

    try {
      const response = await fetch("http://localhost:5001/api/doctors/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("After add: " + data);
      if (!response.ok) throw new Error(data.message);

      setSuccess("Doctor added successfully!");
      setDoctorData({
        name: "",
        email: "",
        password: "",
        speciality: "",
        degree: "",
        address1: "",
        address2: "",
        experience: "",
        fees: "",
        about: "",
        image: null,
      });

      navigate("/adminnavbar");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Add New Doctor
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={doctorData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Speciality Field */}
          <div>
            <label className="block text-gray-700 font-medium">
              Speciality
            </label>
            <select
              name="speciality"
              value={doctorData.speciality}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={doctorData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={doctorData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Degree Field */}
          <div>
            <label className="block text-gray-700 font-medium">Degree</label>
            <input
              type="text"
              name="degree"
              value={doctorData.degree}
              onChange={handleChange}
              placeholder="Degree"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              name="address1"
              value={doctorData.address1}
              onChange={handleChange}
              placeholder="Clinic Address"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Experience Field */}
          <div>
            <label className="block text-gray-700 font-medium">
              Experience (Years)
            </label>
            <input
              type="number"
              name="experience"
              value={doctorData.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Fees Field */}
          <div>
            <label className="block text-gray-700 font-medium">
              Consultation Fees
            </label>
            <input
              type="number"
              name="fees"
              value={doctorData.fees}
              onChange={handleChange}
              placeholder="Fees in ₹"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* Slot Field */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium">Slot</label>
            <select
              name="slot"
              value={doctorData.slot}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Slot</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
          </div>

          {/* Time Field */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium">Time</label>
            <input
              type="time"
              name="time"
              value={doctorData.time}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date Field */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={doctorData.date}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Day Field */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium">Day</label>
            <select
              name="day"
              value={doctorData.day}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          {/* About Field */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium">About</label>
            <textarea
              name="about"
              value={doctorData.about}
              onChange={handleChange}
              placeholder="Write about the doctor"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium">
              Upload Doctor Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddDoctors;
