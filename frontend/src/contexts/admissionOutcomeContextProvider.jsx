import React from "react";
import AdmissionOutComeContext from './admissionOutcomeContext';
import useAdmissionData from "./useAdmissionData";

const AdmissionOutComeProvider = ({children}) => {
  const {admissionData,updateAdmissionData,loading,error} = useAdmissionData()
  if (loading){
    return <div>Loading....</div>
  }

  if (error){
    return <div>Error:{error}</div>
  }
  
 
  return(
   <AdmissionOutComeContext.Provider value={{admissionData,updateAdmissionData}}>
      {children}
   </AdmissionOutComeContext.Provider>
  )
}


export default AdmissionOutComeProvider