import { useState, useEffect } from "react";
import axios from "axios";
import AllDischarges from "@/components/Pages/AllDischarges";

const useAdmissionData = () => {
  const [admissionData, setAdmissionData] = useState([]);
  const [allDischargesData, setAllDischaregsData] = useState([]);
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
      console.log("API Response:", response.data);
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
      setAllDischaregsData(response.data);
      console.log("API discharge Response:", response.data);
     
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

  useEffect(() => {
    fetchAdmissionData();
    fetchAllDicharges();
  }, []);

  return {
    admissionData,
    allDischargesData,
    updateAdmissionData,
    updateDischargeData,
    loading,
    error,
  };
};

export default useAdmissionData;
