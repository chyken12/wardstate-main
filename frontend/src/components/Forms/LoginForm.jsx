import React, { useState,useContext } from 'react';
import { UserContext } from '@/contexts/UserContetext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const  {setLoggedInUser} = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', formData);
      
      if (response.data && response.data.token && response.data.user) {
        toast.success('Login successful!');
        const { token, user } = response.data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        setLoggedInUser(user)
        
        const wardRoutes = {
          'Male Medical': '/ward/Male Medical',
          'Female Medical': '/ward/Female Medical',
          'Male Surgical': '/ward/Male Surgical',
          'Female Surgical': '/ward/Female Surgical',
          'NICU': '/ward/NICU',
          'Maternity': '/ward/Maternity',
          'Kids Ward': '/ward/Kids Ward'
        };

        const route = wardRoutes[user.ward.type] || '/ward/unknown';
        if (route === '/ward/unknown') {
          toast.error(`Unknown or invalid ward: ${user.ward}. Please contact support.`);
        }
        navigate(route);
      } else {
        toast.error('Invalid response format from server');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === 'Invalid password') {
          toast.error('Invalid password. Please try again.');
        } else {
          toast.error(error.response.data.message || 'An error occurred during login');
        }
      } else if (error.request) {
        toast.error('No response from server. Please check your connection and try again.');
      } else {
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
            required
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
          <input 
            className="w-full px-4 py-2 border rounded-md pr-10" 
            type={showPassword ? "text" : "password"}
            id="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
          <button 
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button className="w-full py-3 bg-primary text-white font-medium rounded-md">Sign In</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;