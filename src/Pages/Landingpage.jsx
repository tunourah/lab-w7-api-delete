import React from 'react';
import Home from './Home';
import image from '../assets/pg1.png';

const Landingpage = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Section */}
        <div className="bg-indigo-500 w-full flex flex-col justify-center items-center text-center md:w-1/2 p-4">
          <h1 className="text-4xl text-white bg-pink-200 font-bold mb-4">
            Add your own characters <span className="text-blue-700">FREE</span>
          </h1>
          <h1 className="text-7xl text-white font-bold mb-4">Cartoon Avatars</h1>
          <p className="text-lg text-white mb-2"></p>
          <p className="text-lg text-white">By Nora</p>
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img src={image} alt="Cartoon Avatars" className="object-cover w-full h-full max-w-lg" />
        </div>
      </div>

      {/* Home Component */}
      <Home />
    </div>
  );
};

export default Landingpage;
