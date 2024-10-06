import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Add = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [gender, setGender] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      name: name,
      image: image,
      gender: gender,
    };
    postProduct(product);
  };

  const postProduct = async (product) => {
    const response = await fetch('https://66f168d9415379191550c6e8.mockapi.io/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    console.log(data);

    // Display success message if the post is successful
    if (response.ok) {
      setSuccessMessage('Product posted successfully!');
      setName('');
      setImage('');
      setGender('');
    }
  };

  return (
    <div className="container mx-auto  ">
         <Link to="/landingpage">
        <button className='  mt-2  w-14 h-14  hover:bg-indigo-500 hover:text-white text-indigo-500 font-bold     mx-auto text-center '><IoArrowBackCircleSharp />
        </button>
        </Link>
   

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Add Avatar</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="border p-2 w-full"
          required

        />
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Gender"
          className="border p-2 w-full"
          required

        />
        <button type="submit" className=" mb-10 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-500 font-bold    mx-auto text-center py-3 px-4">
          Add
        </button>
      </form>
     
    </div>
  );
};

export default Add;
