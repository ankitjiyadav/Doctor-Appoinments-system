import React, { useState } from "react";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    fees: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("specialty", formData.specialty);
    formDataToSend.append("fees", formData.fees);
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:5001/api/doctors/add", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Doctor Added Successfully!");
        setFormData({ name: "", specialty: "", fees: "", image: null });
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-blue-700">Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={formData.specialty}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="fees"
          placeholder="Fees"
          value={formData.fees}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
