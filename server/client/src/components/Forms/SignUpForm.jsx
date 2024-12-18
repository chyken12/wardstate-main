// import axios from 'axios'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import React, { useState, useEffect } from 'react';
// import { Label } from "@/components/ui/label";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// function SignUpForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmpassword: '',
//     wardName: '',
//     role: 'user' // Default role
//   });

//   const [wards, setWards] = useState([]); // State to hold wards from backend
//   const [selectedWard, setSelectedWard] = useState('');
//   const [showWardSelection, setShowWardSelection] = useState(true);

//   const handleRoleChange = (value) => {
//     setFormData({ ...formData, role: value });
//     setShowWardSelection(value !== 'Admin');
//   };



//   // Fetch wards from the backend when component mounts
//   // useEffect(() => {
//   //   const fetchWards = async () => {
//   //     try {
//   //       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/wards`); 

//   //       // Fetch ward list from your backend
//   //       setWards(response.data); // Set the wards in state
//   //     } catch (error) {
//   //       toast.error('Error fetching wards');
//   //     }
//   //   };

//   //   fetchWards();
//   // }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const body = {
//       ...formData,
//       wardName: selectedWard
//     };


//     // Regular expression to allow only letters, numbers, dots, underscores, and hyphens
//     const usernameRegex = /^[a-zA-Z0-9._-]+$/;

//     if (!usernameRegex.test(formData.username)) {
//       toast.error('Username can only contain letters, numbers, dots, underscores, and hyphens');
//       return;
//     }

//     if (formData.password !== formData.confirmpassword) {
//       toast.error('Passwords donot match ');
//       return
//     }
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, body);


//       // Handle successful signup(e.g., save token, redirect)
//       toast.success('SignUp successful!');
//       // Redirect to login page after a short delay (e.g., 2 seconds)
//       setTimeout(() => {
//         navigate('/login');  // Replace '/login' with your actual login route
//       }, 2000);

//     } catch (error) {
//       console.error('Signup error:', error);
//       toast.error(error.response.data.message);
//       if (error.response) {
//         // Display the specific error message for username already exists
//         if (error.response.data.errors && error.response.data.errors.username) {
//           toast.error(error.response.data.errors.username); // Show 'Username already exists'
//         } else {

//           toast.error(error.response.data.message || 'An error occurred');
//         }
//       } else if (error.request) {
//         toast.error('No response from server. Please try again.');
//       } else {
//         toast.error('An error occurred. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       <h1 className="text-3xl font-title mb-6">Sign Up</h1>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
//           <input className="w-full px-4 py-2 border rounded-md"
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
//           <input className="w-full px-4 py-2 border rounded-md"
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-2" htmlFor="password"> Confirm Password</label>
//           <input className="w-full px-4 py-2 border rounded-md"
//             type="password"
//             id="confirmpassword"
//             name="confirmpassword"
//             value={formData.confirmpassword}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="role">Role</Label>
//           <Select value={formData.role} onValueChange={handleRoleChange}>
//             <SelectTrigger id="role">
//               <SelectValue placeholder="Select Role" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value='User'>User</SelectItem>
//               <SelectItem value='Admin'>Admin</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         {showWardSelection && (
//           <div className="space-y-2">
//             <Label htmlFor="wardName">Ward</Label>
//             <Select value={selectedWard} onValueChange={setSelectedWard}>
//               <SelectTrigger id="wardName">
//                 <SelectValue placeholder="Select Ward" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value='Male Medical'>Male Medical</SelectItem>
//                 <SelectItem value='Female Medical'>Female Medical</SelectItem>
//                 <SelectItem value='Male Surgical'>Male Surgical</SelectItem>
//                 <SelectItem value='Female Surgical'>Female Surgical</SelectItem>
//                 <SelectItem value="Maternity">Maternity</SelectItem>
//                 <SelectItem value="NICU">NICU</SelectItem>
//                 <SelectItem value="Kids Ward">KIDS Ward</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         )}


//         <button className="w-full py-3 bg-primary text-white font-medium rounded-md">Sign Up</button>
//       </form>
//       <Link to="/login">
//         <p className="mt-4 text-sm">
//           Already have an account? <a href="#" className="text-primary font-medium">Login here</a>
//         </p>
//       </Link>

//       <ToastContainer />
//     </div>
//   )
// }

// export default SignUpForm

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmpassword: '',
    wardName: '',
    role: 'user' // Default role
  });

  const [selectedWard, setSelectedWard] = useState('');
  const [showWardSelection, setShowWardSelection] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
    setShowWardSelection(value !== 'Admin');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const body = {
      username: formData.username,
      password: formData.password,
      role: formData.role,
      wardName: selectedWard // Only include if role is 'User '
    };

    // Validation checks
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;

    if (!usernameRegex.test(formData.username)) {
      toast.error('Username can only contain letters, numbers, dots, underscores, and hyphens');
      setIsLoading(false); // Stop loading
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      toast.error('Passwords do not match');
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, body);
      toast.success('SignUp successful!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        toast.error('No response from server. Please try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false); // Stop loading
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
          <label className="block text-sm font-medium mb-2" htmlFor="confirmpassword">Confirm Password</label>
          <input className="w-full px-4 py-2 border rounded-md"
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select value={formData.role} onValueChange={handleRoleChange}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='User'> User </SelectItem>
              <SelectItem value='Admin'>Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {showWardSelection && (
          <div className="space-y-2">
            <Label htmlFor="wardName">Ward</Label>
            <Select value={selectedWard} onValueChange={setSelectedWard}>
              <SelectTrigger id="wardName">
                <SelectValue placeholder="Select Ward" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Male Medical'>Male Medical</SelectItem>
                <SelectItem value='Female Medical'>Female Medical</SelectItem>
                <SelectItem value='Male Surgical'>Male Surgical</SelectItem>
                <SelectItem value='Female Surgical'>Female Surgical</SelectItem>
                <SelectItem value="Maternity">Maternity</SelectItem>
                <SelectItem value="NICU">NICU</SelectItem>
                <SelectItem value="Kids Ward">KIDS Ward</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}


        <button 
          className="w-full py-3 bg-primary text-white font-medium rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <Link to="/login">
        <p className="mt-4 text-sm">
          Already have an account? <a href="#" className="text-primary font-medium">Login here</a>
        </p>
      </Link>

      <ToastContainer />
    </div>
  )
}

export default SignUpForm
