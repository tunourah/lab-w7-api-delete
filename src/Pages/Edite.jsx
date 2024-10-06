import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { IoArrowBackCircleSharp } from 'react-icons/io5';

const Edit = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [gender, setGender] = useState('');
    const [successMessage, setSuccessMessage] = useState('');  
    const { id } = useParams(); 
    const navigate = useNavigate(); // Use the useNavigate hook for programmatic navigation

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://66f168d9415379191550c6e8.mockapi.io/product/${id}`);
                const product = response.data;
                setName(product.name);
                setImage(product.image);
                setGender(product.gender);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProduct();
    }, [id]);  

    const handleSubmit = async (e) => {
      e.preventDefault();
      const product = { name, image, gender };
      await updateProduct(product);
      navigate('/landingpage'); // Navigate to landing page after successful update
    };

    const updateProduct = async (product) => {
      try {
        const response = await axios.put(`https://66f168d9415379191550c6e8.mockapi.io/product/${id}`, product);
        console.log(response.data);
        setSuccessMessage('Character updated successfully!');
      } catch (error) {
        console.error('Error updating the character:', error);
      }
    };

    return (
      <div className="container mx-auto p-4">
        <Link to="/landingpage">
          <button className='mt-2 w-14 h-14 hover:bg-indigo-500 hover:text-white text-indigo-500 font-bold'>
            <IoArrowBackCircleSharp />
          </button>
        </Link>
  
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
            {successMessage}
          </div>
        )}
  
        {/* Form to edit the product */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <h1 className="text-2xl font-bold mb-4">Edit Avatar</h1>
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
          <button type="submit" className="mb-10 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-500 font-bold py-3 px-4">
            Update
          </button>
        </form>
      </div>
    );
};

export default Edit;
