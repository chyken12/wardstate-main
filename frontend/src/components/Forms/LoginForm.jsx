import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      toast.success('Login successful!');
      // Handle successful login (e.g., save token, redirect)
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-3xl font-title mb-6">Sign In</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
          <input 
            className="w-full px-4 py-2 border rounded-md" 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
          <input 
            className="w-full px-4 py-2 border rounded-md" 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="w-full py-3 bg-primary text-white font-medium rounded-md">Sign In</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;