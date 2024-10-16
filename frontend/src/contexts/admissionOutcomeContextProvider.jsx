import React from "react";
import AdmissionOutComeContext from "./admissionOutcomeContext";
import useAdmissionData from "./useAdmissionData";

const AdmissionOutComeProvider = ({ children }) => {
  const {

    admissionData,
    userData,
    allDischargesData,
    allExpiredData,
    allTransInData,
    allTransOutData,
   



    updateDischargeData,
    updateAdmissionData,
    updateExpiredData,
    updateAllTransInData,
    updateAllTransOutData,
  
    loading,
    error,
  } = useAdmissionData();
  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error:{error}</div>;
  }

  return (
    <AdmissionOutComeContext.Provider
      value={{
       
        admissionData,
        userData,
        allDischargesData,
        allExpiredData,
        allTransInData,
        allTransOutData,
        updateDischargeData,
        updateAdmissionData,
        updateAllTransInData,
        updateAllTransOutData,
        updateExpiredData
      }}
    >
      {children}
    </AdmissionOutComeContext.Provider>
  );
};

export default AdmissionOutComeProvider;


