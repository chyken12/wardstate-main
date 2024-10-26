import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'Admin') {
    // Logged in but not an admin
    return <Navigate to="/login" replace />;
  }

  // User is logged in and is an admin
  return children;
};

export default ProtectedAdminRoute;