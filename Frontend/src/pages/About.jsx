import React from 'react'
import image12 from '../assets/doc12.png'
const About = () => {
  const cards = [
    {
      title: 'EFFICIENCY :',
      description: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
    },
    {
      title: 'CONVENIENCE :',
      description: 'Access to a network of trusted healthcare professionals in your area.',
    },
    {
      title: 'PERSONALIZATION :',
      description: 'Tailored recommendations and reminders to help you stay on top of your health.',
    },
  ];
  return (
    <>
    <div className='mt-9 ml-14'>
      <div className='text-4xl text-red-800 font-bold text-center'>
        <h1> About Us </h1>
      </div>     
      <div className='flex mt-10'>
        <div>
          <img src={image12} alt="image12"  className='w-100 h-100'/>
        </div>
        <div className='ml-10'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and <br />
            efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling <br />
             doctor appointments and managing their health records.</p>
             <p className='mt-10'>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance <br />
               our platform, integrating the latest advancements to improve user experience and deliver superior service. <br />
                Whether you're booking your first appointment or managing ongoing care, <br />
                 Prescripto is here to support you every step of the way.</p>
            <h3 className='mt-10 font-bold text-xl'>Our Vision</h3>
            <p className='mt-10'>Our vision at Prescripto is to create a seamless healthcare experience for every user. <br />
               We aim to bridge the gap between patients and healthcare providers,  <br />
               making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div> 
    </div>
    <div className="bg-gray-100 py-12 mt-10 ">
      <div className="container mx-auto ">
        <h2 className="text-3xl font-bold mb-6 text-red-700 ml-8">Why Choose Us ?</h2>
        
        {/* Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 text-center">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-2 hover:bg-blue-500 hover:text-white"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-red-600 hover:text-white font-medium mt-3">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default About