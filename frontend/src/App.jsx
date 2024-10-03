import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS for the toast notifications

import Home from "./components/Pages/Home";
import AllDischarges from "./components/Pages/AllDischarges";
import AllAdmissions from "./components/Pages/AllAdmissions";
import AllTransIn from "./components/Pages/AllTransIn";
import AllTransOut from "./components/Pages/AllTransOut";
import AllExpired from "./components/Pages/AllExpired";
import WardPage from "./components/Pages/Wardpage";


import ExpiredForm from "./components/Forms/ExpiredForm";
import DischargeForm from "./components/Forms/DischargeForm";
import AdmissionForm from "./components/Forms/AdmissionForm";
import TransInform from "./components/Forms/TransInForm";
import TransOutform from "./components/Forms/TransOutForm";
import LoginForm from "./components/Forms/LoginForm";
import SignUpForm from "./components/Forms/SignUpForm";

function App() {
  return (
    <div>
      <ToastContainer /> {/* This can be anywhere in your component tree */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admissionform' element={<AdmissionForm />} />
        <Route path='/dischargeform' element={<DischargeForm />} />
        <Route path='/expiredform' element={<ExpiredForm />} />
        <Route path='/transinform' element={<TransInform />} />
        <Route path='/transoutform' element={<TransOutform />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />

        <Route path='/all-admissions' element={<AllAdmissions />} />
        <Route path='/all-discharges' element={<AllDischarges />} />
        <Route path='/all-transin' element={<AllTransIn />} />
        <Route path='/all-transout' element={<AllTransOut />} />
        <Route path='/all-expired' element={<AllExpired />} /> 
        <Route path="/ward/:wardType" element={<WardPage />} />      
      </Routes>
    </div>
  );
}

export default App;
