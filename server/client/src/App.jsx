import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS for the toast notifications
import React, { lazy, Suspense } from "react";
import { Loader } from "lucide-react";


// import Home from "./components/Pages/Home";
const Home = lazy(() => import("./components/Pages/Home"))
// import AllDischarges from "./components/Pages/AllDischarges";
const AllDischarges = lazy(() => import("./components/Pages/AllDischarges"))

// import AllAdmissions from "./components/Pages/AllAdmissions";
const AllAdmissions = lazy(() => import("./components/Pages/AllAdmissions"))

// import AllTransIn from "./components/Pages/AllTransIn";
const AllTransIn = lazy(() => import("./components/Pages/AllTransIn"))

// import AllTransOut from "./components/Pages/AllTransOut";
const AllTransOut = lazy(() => import("./components/Pages/AllTransOut"))

// import AllExpired from "./components/Pages/AllExpired";
const AllExpired = lazy(() => import("./components/Pages/AllExpired"))
// import WardPage from "./components/Pages/Wardpage";
const WardPage = lazy(() => import("./components/Pages/Wardpage"))

const  ExpiredForm = lazy(() => import("./components/Forms/ExpiredForm")) ;
const DischargeForm = lazy(() => import("./components/Forms/DischargeForm"));
const AdmissionForm = lazy(() => import("./components/Forms/AdmissionForm"))
const  TransInform = lazy(() => import("./components/Forms/TransInForm"));
const  TransOutform = lazy(() => import("./components/Forms/TransOutForm")) ;

const  LoginForm = lazy(() => import("./components/Forms/LoginForm")) ;
const  SignUpForm = lazy(() => import("./components/Forms/SignUpForm")) ;
const  UpdateAdmissionForm = lazy(() => import("./components/Forms/UpdateAdmissionForm")) ;
const  DetailView = lazy(() =>  import("./components/Pages/DetailView")) 
const  AdminDashboard  = lazy(() => import("./components/Pages/Admin-Dashboard"))
const ProtectedAdminRoute = lazy(() => import('./components/Pages/ProtectedRoute'))


function App() {
  return (
    <div>
      <ToastContainer/> {/* This can be anywhere in your component tree */}
      <Suspense  fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      }>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admissionform' element={<AdmissionForm />} />
        <Route path='/update-admission/:id' element={<UpdateAdmissionForm  />} />
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
        <Route path='/detail-view/:id' element={<DetailView />} /> 
        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        <Route
        path="/Admin-Dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />       
      </Routes>
      </Suspense>
      
    </div>
  );
}

export default App;
