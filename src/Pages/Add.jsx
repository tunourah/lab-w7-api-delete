import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add
        </button>
      </form>
      <Link to="/home">
        <button className="bg-blue-500 text-white p-2 rounded mt-4">Back to Home</button>
        </Link>
    </div>
  );
};

export default Add;
