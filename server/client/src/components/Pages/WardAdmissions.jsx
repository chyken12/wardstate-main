
import Loader from '../ui/loader';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import useAdmissionData from '@/contexts/useAdmissionData';
import React, {useContext,useState,useEffect} from "react";
import { UserContext } from '@/contexts/UserContetext';
import { calculateWardStatistics } from '@/utils/wardUtils';
import DatePicker from "../DatePicker";
import { Button } from "@/components/ui/button";
import { toast,Slide  } from 'react-toastify';





function WardAdmissions() {
  const {loggedInUser,loading: userLoading} = useContext(UserContext)
  const { wardType } = useParams();
  const {  admissionData, loading, error, deleteAdmission } = useAdmissionData();
  const [searchTerm,setSearchTerm] = useState("")
  const [wardStats, setWardStats] = useState({});
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (!loading && !error) {
      const stats = calculateWardStatistics(admissionData, wardType);
      setWardStats(stats);
    }
  }, [admissionData, loading, error, wardType]);

  if (loading) {
    return( <Loader
      size={250}
      customText="Preparing your medical data"
      showProgress={true}
      progressDuration={15}
    />)
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (userLoading) {
    return <p>Loading user data...</p>;
  }

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }





  

const filteredAdmissions = admissionData.filter(admission => 
  admission.ward === wardType && 
  admission.patientName.toLowerCase().includes(searchTerm.toLowerCase())
);


 

  
const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};
// Filtering the discharges based on name and date
const filteredData = admissionData.filter((admission) => {
  // Check if the patient name exists and convert to lowercase
  const patientName = admission.patientName ? admission.patientName.toLowerCase() : '';
  const search = searchTerm.toLowerCase();
  // Check if the name matches the search term
  const matchesSearchTerm = patientName.includes(search);
  // Return true only if both conditions are satisfied
  return matchesSearchTerm
  
});
  const formatDate = (date) => {
    if (!date) return "mm/dd/yyyy";
    return new Date(date).toLocaleDateString(); // Formats to "7/10/2024" or similar based on locale
  };

  

  const handleView = (admission) => {
    navigate(`/detail-view/${admission._id}`);
  };

  const handleDelete = (admission) => {
    const ToastContent = ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete this admission?</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button
            onClick={() => {
              console.log('Confirming delete for admission:', admission);
              confirmDelete(admission);
              closeToast();
            }}
            style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            Confirm
          </button>
          <button
            onClick={closeToast}
            style={{ padding: '5px 10px', backgroundColor: '#f0ad4e', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  
    toast.warn(<ToastContent />, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };
  
  const confirmDelete = async (admission) => {
    try {
      await deleteAdmission(admission._id);
      toast.success('Admission deleted successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      console.error('Error deleting admission:', error);
      toast.error(`Failed to delete admission: ${error.message}`);
    }
  };


  
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100 border-b-4 ml-10 mr-10">
        <header className="flex flex-row justify-between bg-white shadow px-4 py-2">
          <div className="text-xl font-bold">KWAHU GOVERNMENT HOSPITAL</div>
          <div className="text-xl font-bold">Welcome,{loggedInUser?.username}</div>
        </header>
        <div className="flex flex-row justify-between bg-gray-200 px-4 py-2">
          <div className="text-sm font-medium">DAILY WARD STATE</div>
        </div>
        <main className="flex flex-col flex-grow px-4 py-4 rounded">
          <div className="box-border border-2">
            <div className="flex flex-row justify-between py-2 px-3">
              <div className="flex flex-row">
                <DatePicker 
                 
                 />
              </div>
              <div className="flex flex-row">
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-non focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search by name..."
                  type="text"
                  name="search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Button variant="outline">Search</Button>
              </div>
            </div>
          </div>
          <div className="flex flex-row border-b border-gray-200 px-4 py-2  ">
            <div className="flex flex-row justify-between mt-5 ">
            </div>
            <div />
          </div>
              <div class="flex">
  <div class="w-1/5 bg-zinc-200 p-4">
    <h2 class="text-lg font-bold mb-4">{wardType}</h2>
    <ul class="space-y-2">
    <li>Remained Prev. Night: {wardStats.remainedPreviousNight}</li>
            <li>Total Admissions: {wardStats.totalAdmissions}</li>
            <li>Total Discharges: {wardStats.totalDischarges}</li>
            <li>Total Deaths: {wardStats.totalDeaths}</li>
            <li>Remained At Midnight: {wardStats.remainedAtMidnight}</li>
            <li>Empty Beds: {wardStats.emptyBeds}</li>
            <li>Transferred-In: {wardStats.transferIn}</li>
            <li>Transferred-Out: {wardStats.transferOut}</li>
    </ul>
    <Link to="/admissionform"><button class="mt-4 bg-orange-500 text-white py-2 px-4 rounded">ADD EVENT</button></Link>
  </div>
  <div class="w-4/5 p-4">
    <div class="flex space-x-2 mb-4">
      <select class="border p-2 rounded">
        <option>All Doctor</option>
      </select>
      <select class="border p-2 rounded">
        <option>All Specializations</option>
      </select>
      <select class="border p-2 rounded">
        <option>KWAHU GOVERNMENT HOSPITAL</option>
      </select>
      <select class="border p-2 rounded">
        <option>All Schedule Status</option>
      </select>
    </div>
    <div class="flex justify-between items-center mb-4">
      <Link to="/admissionform"> 
       <button class="bg-orange-500 text-white py-2 px-4 rounded">Add New Appointment</button>
       </Link>
    </div>
    <div class="bg-zinc-100 p-4 rounded">
      
      <table class="w-full border-collapse border border-zinc-300">
        <thead>
          <tr class="bg-zinc-200">
            <th class="border border-zinc-300 p-2">Date</th>
            <th class="border border-zinc-300 p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmissions.map((admission)=>(
             <tr key={admission._id}  className={`${
              admission.status === 'Expired'
              ? 'bg-red-400'
              : admission.status === 'Discharged'
              ? 'bg-yellow-100'
              : admission.status === 'TransferredOut'
              ? 'bg-yellow-200'
              : admission.status === 'TransferIn'
              ? 'bg-blue-200'
              : admission.status === 'Admitted'
              ? 'bg-green-100'
              : 'bg-white'  // Default background color if none of the statuses match
            }`}>
             <td class="border border-zinc-300 p-2">
             {admission.admissionDate ? new Date(admission.admissionDate).toLocaleDateString() : "N/A"}</td>
             <td class="border border-zinc-300 p-2">
               <div class="flex justify-between items-center">
                 <div>
                   <h4 class="font-bold">{admission.patientName}</h4>
                   <p>{admission.patientId}</p>
                   <p>NHIS : {admission.nhisStatus}</p>
                   <button class="bg-zinc-300 text-black py-1 px-2 rounded">{admission.status}</button>
                  
                 </div>
                 <div class="flex space-x-2">
                  
                     <button class="bg-green-500 text-white py-1 px-2 rounded" onClick={() => handleView(admission)}>View</button>
                    
                  
                   <Link to={`/update-admission/${admission._id}`}>
                   <button class="bg-blue-500 text-white py-1 px-2 rounded">Update </button>
                   </Link>
                  
                   <button class="bg-red-500 text-white py-1 px-2 rounded" onClick={() => handleDelete(admission)}>Delete</button>
                 </div>
               </div>
             </td>
           </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
        </main>
      </div>
    </div>
  );
}

export default WardAdmissions;


