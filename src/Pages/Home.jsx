import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { MdDelete } from "react-icons/md";
import Modal from '../component/Modal';  
import { CiEdit } from "react-icons/ci";


const Home = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);  

  const openModal = (id) => {
    setItemIdToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemIdToDelete(null);
  };

  const confirmDelete = async () => {
    if (itemIdToDelete) {
      try {
        await axios.delete(`https://66f168d9415379191550c6e8.mockapi.io/product/${itemIdToDelete}`);
        fetchItems();  
      } catch (error) {
        console.error('Error deleting the product:', error);
      }
      closeModal();  
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://66f168d9415379191550c6e8.mockapi.io/product');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching the products:', error);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 mt-28 flex flex-col justify-center items-center w-full  ">
      <div>
        <Link to="/add">
          <button className="border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-500 font-bold  md:w-96 rounded-full mx-auto text-center py-3 px-4">
            Add Product
          </button>
        </Link>
      </div>
      
      <div className="mb-4 mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
          className="border p-2  md:w-96 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white border-2 border-indigo-500 shadow-md text-indigo-500 rounded-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 " />
            <div className="p-4">
              <h1 className="text-xl font-bold text-indigo-500 mb-2">{item.name}</h1>
              <p className="text-gray-600">{item.gender}</p>
              <button
                onClick={() => openModal(item.id)}  
                className="bg-black hover:bg-gray-600 mt-3 text-white font-bold py-2 px-4 rounded"
              >
                <MdDelete />
              </button>
              <Link to={`/edit/${item.id}`}>
              <button className=' ms-2 bg-black hover:bg-gray-600 mt-3 text-white font-bold py-2 px-4 rounded' >
              <CiEdit />

              </button>
                </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-gray-600 mt-4">No products found</p>
      )}

       
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
};

export default Home;
