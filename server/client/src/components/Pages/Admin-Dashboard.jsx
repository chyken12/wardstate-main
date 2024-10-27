import React, { lazy } from 'react';
import { useParams } from 'react-router-dom';
import WardAdmissions from './WardAdmissions';
import Dashboard from '../dashboard';


function AdminDashboard() {
  

  return (
    <div>
      
     <Dashboard></Dashboard>
     
    </div>
  );
}

export default AdminDashboard;


