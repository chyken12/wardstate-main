import { Routes,Route } from "react-router-dom";

import Home from "./components/Pages/Home";
import AllDischarges from "./components/Pages/AllDischarges";
import AllAdmissions from "./components/Pages/AllAdmissions";
import AllTransIn from "./components/Pages/AllTransIn";
import AllTransOut from "./components/Pages/AllTransOut";
import AllExpired from "./components/Pages/AllExpired";
import WardAdmissions from "./components/Pages/AlladmissionsByWard";

import ExpiredForm from "./components/Forms/ExpiredForm";
import DischargeForm from "./components/Forms/DischargeForm";
import AdmissionForm from "./components/Forms/AdmissionForm";
import TransInform from "./components/Forms/TransInForm";
import TransOutform from "./components/Forms/TransOutForm";



function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} /> 
      <Route path='/admissionform' element={<AdmissionForm/>} />
      <Route path='/dischargeform' element={<DischargeForm/>} />
      <Route path='/expiredform' element={<ExpiredForm/>} />
      <Route path='/transinform' element={<TransInform/>} />
      <Route path='/transoutform' element={<TransOutform/>} />
      

      <Route path='/all-admissions' element={<AllAdmissions/>} /> 
      <Route path='/all-discharges' element={<AllDischarges/>} /> 
      <Route path='/all-transin' element={<AllTransIn/>} /> 
      <Route path='/all-transout' element={<AllTransOut/>} /> 
      <Route path='/all-expired' element={<AllExpired/>} /> 
      <Route path='/admission-by-ward' element={<WardAdmissions/>} /> 
    </Routes>
  );
}

export default App;
