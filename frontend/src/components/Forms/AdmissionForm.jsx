

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from 'react-toastify'; // Import toast library


  const AdmissionForm = () => {
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [Age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nhisStatus, setNhisStatus] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [admissionOutcome,setAdmissionOutcom] = useState("")
  const [transferInDate, setTransferInDate] = useState("");
  const [transferOutDate, setTransferOutDate] = useState("");
  const [dischargeDate,setDischargedDate] = useState('')
  const [error, setError] = useState(null);
  const [ward,setWard] = useState('');
  const [status, setStatus] = useState("");
  const navigate = useNavigate();


  const formatDate = (date) => {
    return date instanceof Date ? date.toISOString().split('T')[0] : date;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!patientName || !patientId || !Age || !gender  || !admissionDate || !ward) {
      toast.error("All fields are required."); // Display error message using toast
      return;
  
     
    }
    
    const data = {
      patientName,
      patientId,
      Age: Number(Age),
      gender,
      nhisStatus,
      ward,
      admissionDate: formatDate(admissionDate),
      admissionStatus:'Admitted',
      status:status,
      expiredDate: formatDate(expiredDate),
      admissionOutcome,
      transferInDate: formatDate(transferInDate),
      dischargeDate: formatDate(dischargeDate),
      transferOutDate: formatDate(transferOutDate)
    };

   

    setLoading(true);
    axios
      .post("http://localhost:8000/api/admission", data)
      .then(() => {
        setLoading(false);
        toast.success('Admission successful!'); // Display success message using toast
        navigate("/");// NOTE have to make the form redirect to the submission ward
        
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) {
          toast.error(error.response.data.error, {
           
            autoClose: 8000
          });
        } else {
          console.log(error);
        }
        
      });
  };
  if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle>Patient Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
      <div className="space-y-2">
          <Label htmlFor="ward">Ward</Label>
          <Select value={ward} onValueChange={(value) => setWard(value)}>
            <SelectTrigger id="ward">
              <SelectValue placeholder="Select Ward" />
            </SelectTrigger>
            <SelectContent>
              
                <SelectItem value='Male Medical' >Male Medical </SelectItem>
                <SelectItem value='Female Medical'>Female Medical </SelectItem>
                <SelectItem value='Male Surgical'>Male Surgical </SelectItem>
                <SelectItem value='Female Surgical'>Female Surgical </SelectItem>
                <SelectItem value="Maternity">Maternity  </SelectItem>
                <SelectItem value="NICU">NICU  </SelectItem>
                <SelectItem value="Kids Ward">KIDS Ward </SelectItem>
                

           
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="patient-id">Patient-ID</Label>
          <Input id="patient-id" placeholder="Enter Patient ID eg. ER-A06-AAA1234..." value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patientName">Name</Label>
          <Input id="patientName" placeholder="Enter Patient Name eg. Samuel Sarpong" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nhisStatus">Insurance-Status</Label>
            <Select value={nhisStatus} onValueChange={(value) => setNhisStatus(value)}>
              <SelectTrigger id="nhisStatus">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="InActive">InAcctive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={(value) => setGender(value)}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="Age">Age</Label>
            <Input id="Age" placeholder="Enter Age eg. 48" value={Age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admission-date">Admission-Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left font-normal">
                {admissionDate ? admissionDate.toLocaleDateString() : "mm/dd/yyyy"}
                  <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={admissionDate} onSelect={(date) => setAdmissionDate(date)} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="admissionOutcome">Admission Outcome</Label>
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select">select</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
              <SelectItem value="Discharged">Discharged</SelectItem>
              <SelectItem value="TransferIn">Trans-In</SelectItem>
              <SelectItem value="TransferOut">Trans-Out</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {status === "Expired" &&(
          <div className="space-y-2">
          <Label htmlFor="expiredDate">Expired-Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left font-normal">
              {expiredDate ? expiredDate.toLocaleDateString() : "mm/dd/yyyy"}
                <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={expiredDate} onSelect={(date) => setExpiredDate(date)} />
            </PopoverContent>
          </Popover>
        </div>
        )}

        {status === "Discharged" && (
          <div className="space-y-2">
          <Label htmlFor="dischargedDate">Discharge-Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left font-normal">
              {dischargeDate ? dischargeDate.toLocaleDateString() : "mm/dd/yyyy"}
                <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dischargeDate} onSelect={(date) => setDischargedDate(date)} />
            </PopoverContent>
          </Popover>
        </div>

        )}

        {status === "TransferIn" &&(
           <div className="space-y-2">
           <Label htmlFor="transferInDate">TransIn-Date</Label>
           <Popover>
             <PopoverTrigger asChild>
               <Button variant="outline" className="w-full text-left font-normal">
               {transferInDate ? transferInDate.toLocaleDateString() : "mm/dd/yyyy"}
                 <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
               </Button>
             </PopoverTrigger>
             <PopoverContent className="w-auto p-0" align="start">
               <Calendar mode="single" selected={transferInDate} onSelect={(date) => setTransferInDate(date)} />
             </PopoverContent>
           </Popover>
         </div>
 
        )}

        {status === "TransferOut" &&(
                  <div className="space-y-2">
                  <Label htmlFor="transferOutDate">transOut-Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full text-left font-normal">
                      {transferOutDate ? transferOutDate.toLocaleDateString() : "mm/dd/yyyy"}
                        <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={transferOutDate} onSelect={(date) => setTransferOutDate(date)} />
                    </PopoverContent>
                  </Popover>
                </div>
        
                )}
        
      </CardContent>
      <CardFooter>
      <Button className="w-full mr-2" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
        <Button className="bg-red-500 text-white  rounded w-full" variant="danger" onClick={() => navigate("/")}>
              Cancel
            </Button>
      </CardFooter>
    </Card>
  );
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default AdmissionForm;