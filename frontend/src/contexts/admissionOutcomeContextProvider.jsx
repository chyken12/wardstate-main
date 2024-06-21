import React from "react";
import AdmissionOutComeContext from './admissionOutcomeContext';

const AdmissionOutComeProvider = ({children}) => {
  const [admissionData,setAdmissionData] = React.useState({
    patientname: "",
    age: "",
    gender: "",
    patientid: "",
    insurancestatus: "",
    admissionOutcome:'',
    date : ''
  })
  const updateAdmissionData = (newData) => {
    setAdmissionData((prevData) => ({...prevData, ...newData}))
  }
  return(
   <AdmissionOutComeContext.Provider value={{admissionData,updateAdmissionData}}>
      {children}
   </AdmissionOutComeContext.Provider>
  )
}


export default AdmissionOutComeProvider