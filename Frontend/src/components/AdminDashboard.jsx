import React, { useState } from 'react';
import AdminDoctorslist from './AdminDoctorslist';
import AdminAddDoctors from './AdminAddDoctors';

const AdminDashboard = () => {
  document.title = "Admin Dashboard";
  const [doctors, setDoctors] = useState([]);

  // Function to add doctor to the list
  const addDoctor = (newDoctor) => {
    setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
  };

  return (
    <div>
      <AdminAddDoctors addDoctor={addDoctor} />
      <AdminDoctorslist doctors={doctors} />
    </div>
  );
};

export default AdminDashboard;
