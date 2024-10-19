import { useState, useEffect } from "react";
import axios from "axios";
import AllDischarges from "@/components/Pages/AllDischarges";
import ExpiredForm from "@/components/Forms/ExpiredForm";

const useAdmissionData = () => {
  const [admissionData, setAdmissionData] = useState([]);
  const [allDischargesData, setAllDischaregsData] = useState([]);
  const [allExpiredData, setAllExpiredData] = useState([]);
  const [allTransInData, setAllTransInData] = useState([]);
  const [allTransOutData, setAllTransOutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  const fetchAdmissionData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/admission");
      // Ensure response data is an array
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setAdmissionData(data);
     
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

 



  // Function to update admission data on the backend
  const updateAdmissionData = async (newData) => {
    try {
      setLoading(true);
      await axios.put("http://localhost:8000/api/admission", newData);
      setAdmissionData((prevData) =>
        prevData.map((admission) =>
          admission.patientId === newData.patientId
            ? { ...admission, ...newData }
            : admission
        )
      );
    } catch (err) {
      setError(`Error updating data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  // function to fetch all discharges
  const fetchAllDicharges = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/discharges");
      // ensure response data is an array
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setAllDischaregsData(data);
     
     
    } catch (error) {
      setError(`error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update discharge data
  const updateDischargeData = async (newData) => {
    try {
      setLoading(true);
      await axios.put("http://localhost:8000/api/discharges", newData);
      setAllDischaregsData((prevData) =>
        prevData.map((discharge) =>
          discharge.patientId === newData.patientId
            ? { ...discharge, ...newData }
            : discharge
        )
      );
    } catch (err) {
      setError(`Error updating discharge data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllExpired= async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/expired");
      // ensure response data is an array
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setAllExpiredData(response.data);
     
    } catch (error) {
      setError(`error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update discharge data
  const updateExpiredData = async (newData) => {
    try {
      setLoading(true);
      await axios.put("http://localhost:8000/api/expired", newData);
      setAllExpiredData((prevData) =>
        prevData.map((expired) =>
          expired.patientId === newData.patientId
            ? { ...expired, ...newData }
            : expired
        )
      );
    } catch (err) {
      setError(`Error updating discharge data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransInData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/transin");
      // Ensure response data is an array
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setAllTransInData(data);
     
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateAllTransInData = async (newData) => {
    try {
      setLoading(true);
      await axios.put("http://localhost:8000/api/transin", newData);
      setAllTransInData((prevData) =>
        prevData.map((transfer) =>
          transfer.patientId === newData.patientId
            ? { ...transfer, ...newData }
            : transfer
        )
      );
    } catch (err) {
      setError(`Error updating data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  const fetchTransOutData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/transout");
      // Ensure response data is an array
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];
        console.log('Processed Data:', data);
      setAllTransOutData(data);
      console.log("transout Response:", response.data);
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateAllTransOutData = async (newData) => {
    try {
      setLoading(true);
      await axios.put("http://localhost:8000/api/transout", newData);
      setAllTransOutData((prevData) =>
        prevData.map((transfer) =>
          transfer.patientId === newData.patientId
            ? { ...transfer, ...newData }
            : transfer
        )
      );
    } catch (err) {
      setError(`Error updating data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  const deleteAdmission = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/admission/${id}`);
      setAdmissionData((prevData) => prevData.filter((admission) => admission._id !== id));
    } catch (err) {
      setError(`Error deleting admission: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchAdmissionData();
    fetchAllDicharges();
    fetchAllExpired()
    fetchTransInData()
    fetchTransOutData()
   
    
   
  }, []);

  return {
    admissionData,
    deleteAdmission,
   
    allDischargesData,
    allExpiredData,
    allTransInData,
    allTransOutData,
    updateAdmissionData,
    updateDischargeData,
    updateExpiredData,
    updateAllTransInData,
    updateAllTransOutData,
  

    loading,
    error,
  };
};

export default useAdmissionData;
