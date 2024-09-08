import React, {useState}from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmpassword:''
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmpassword){
      toast.error('Passwords donot match ');
      return
    }
    try {
      const response = await axios.post('http://localhost:8000/api/signup', {
        username: formData.username,
        password: formData.password
      });
      toast.success('SignUp successful!');
      // Handle successful signup(e.g., save token, redirect)
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
    <h1 className="text-3xl font-title mb-6">Sign Up</h1>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
        <input className="w-full px-4 py-2 border rounded-md"
         type="text" 
         id="username" 
         name="username"
         value={formData.username}
         onChange={handleChange}
          />
      </div>
      {/* <div>
        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
        <input className="w-full px-4 py-2 border rounded-md" type="email" id="email" name="email" />
      </div> */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
        <input className="w-full px-4 py-2 border rounded-md"
         type="password" 
         id="password" 
         name="password"
         value={formData.password}
         onChange={handleChange} 
         />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="password"> Confirm Password</label>
        <input className="w-full px-4 py-2 border rounded-md" 
        type="password" 
        id="confirmpassword" 
        name="confirmpassword" 
        value={formData.confirmpassword}
        />
      </div>
      <button className="w-full py-3 bg-primary text-white font-medium rounded-md">Sign Up</button>
    </form>
    <p className="mt-4 text-sm">
      Already have an account? <a href="#" className="text-primary font-medium">Login here</a>
    </p>
  </div>
  )
}

export default SignUpForm
