import { useState,useEffect } from "react";
import axios from 'axios';

const useAdmissionData = () => {
  const [admissionData, setAdmissionData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAdmissionData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admission')
       // Ensure response data is an array
       const data = Array.isArray(response.data) ? response.data : [response.data];
      setAdmissionData(data)
      console.log('API Response:', response.data);
    } catch (error) {
      setError(`Error fetching data: ${error.message}`)
      
    }finally{
      setLoading(false)
    }
  }
  // Function to update data on the backend
const updateAdmissionData = async (newData) => {
  try {
    setLoading(true);
    await axios.put('/api/admission', newData);
    setAdmissionData((prevData) => 
    prevData.map(admission => 
      admission.patientId === newData.patientId ? { ...admission, ...newData } : admission
    )
  );
  } catch (err) {
    setError(`Error updating data: ${err.message}`);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchAdmissionData();
}, []);

return { admissionData, updateAdmissionData, loading, error };
};

export default useAdmissionData;



