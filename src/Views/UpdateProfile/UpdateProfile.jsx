import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Redux/actions'
import { useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';

export default function UpdateProfile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const id = user.id;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    description: '',
    perfilUrl: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, formData));
    navigate(`/profile/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <div className="flex">
      <form className="w-80 bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Update Profile</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-[5rem]"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input
            type="text"
            name="image"
            id="image"
            className="w-full p-2 border border-gray-300 rounded-[5rem]"
            placeholder="Enter the image URL"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="perfilUrl" className="block text-gray-700 text-sm font-bold mb-2">Perfil URL</label>
          <input
            type="text"
            name="perfilUrl"
            id="perfilUrl"
            className="w-full p-2 border border-gray-300 rounded-[5rem]"
            placeholder="Enter the perfil URL"
            value={formData.perfilUrl}
            onChange={handleChange}
          />
        <div className="mb-4 mt-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            id="description"
            rows="4"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter a description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className=" bg-black text-white border-none rounded-[5rem] p-3 text-l hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
