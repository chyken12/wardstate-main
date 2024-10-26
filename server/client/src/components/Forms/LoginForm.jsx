import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { UserContext } from '@/contexts/UserContetext';

function LoginForm() {
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Ward routing configuration
  const wardRoutes = {
    'Male Medical': '/ward/Male Medical',
    'Female Medical': '/ward/Female Medical',
    'Male Surgical': '/ward/Male Surgical',
    'Female Surgical': '/ward/Female Surgical',
    'NICU': '/ward/NICU',
    'Maternity': '/ward/Maternity',
    'Kids Ward': '/ward/Kids Ward'
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      const { token, user } = response.data;

      // Store the token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Update logged-in user context
      setLoggedInUser(user);

      toast.success('Login successful!');

      // Handle routing based on user role
      const userRole = user.role.toLowerCase();
      
      if (userRole === 'admin') {
        // Admin users go to admin dashboard
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1500);
      } else {
        // Regular users go to their ward
        if (user.ward && user.ward.type) {
          const route = wardRoutes[user.ward.type];
          if (route) {
            setTimeout(() => {
              navigate(route);
            }, 1500);
          } else {
            toast.error(`Unknown or invalid ward: ${user.ward.type}. Please contact support.`);
            // Navigate to a default route or error page
            setTimeout(() => {
              navigate('/ward/unknown');
            }, 1500);
          }
        } else {
          toast.error('No ward assigned. Please contact support.');
          setTimeout(() => {
            navigate('/ward/unknown');
          }, 1500);
        }
      }

    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-3xl font-title mb-6">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label 
            className="block text-sm font-medium mb-2" 
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label 
            className="block text-sm font-medium mb-2" 
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <Link to="/signup">
        <p className="mt-4 text-sm text-center">
          Don't have an account? <span className="text-primary font-medium">Sign up here</span>
        </p>
      </Link>

      <ToastContainer />
    </div>
  );
}

export default LoginForm;