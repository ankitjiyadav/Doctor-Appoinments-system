import React from 'react'

const Footer = () => {
  return (
    <>
     <footer className="  bg-gray-100 py-9 px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-6 lg:space-y-0 mt-8">
        {/* Left Section */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-semibold mb-3 text-red-600">My Doctors</h1>
          <p className="text-sm ">
            Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
            <br />
            industry. Lorem Ipsum has been the industry's standard dummy <br />
            text ever since the 1500s, when an unknown printer took a galley of{" "}
            <br />
            type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Middle Section - Company Links */}
        <div className="text-center lg:text-left">
          <h1 className="text-xl font-semibold mb-3 text-red-600">COMPANY</h1>
          <div className="space-y-2 ">
            <a href="#" className=" hover:text transition duration-200">
              Home
            </a>{" "}
            <br />
            <a href="#" className=" hover:text transition duration-200">
              About Us
            </a>{" "}
            <br />
            <a href="#" className=" hover:text transition duration-200">
              Delivery
            </a>{" "}
            <br />
            <a href="#" className=" hover:text transition duration-200">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Right Section - Contact Info */}
        <div className="text-center lg:text-left">
          <h1 className="text-xl font-semibold mb-3 text-red-600">GET IN TOUCH</h1>
          <p className="">(+91) 1234567890</p>
          <p className="">info@mydoctors.com</p>
        </div>
      </footer>

      {/* Copyright Section */}
      <div className="bg-red-600 text-white text-center py-4">
        <p className="text-sm">
          Copyright 2025 @ Apnaclassmca Software Engineer Devlop by Ankit Yadav
          - All Rights Reserved.
        </p>
      </div>
    </>
  )
}

export default Footer