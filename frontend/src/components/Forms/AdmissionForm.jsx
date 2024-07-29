

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

  const AdmissionForm = () => {
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [Age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nhisStatus, setNhisStatus] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [admissionOutcome,setAdmissionOutcom] = useState("Admitted")
  const [transferInDate, setTransferInDate] = useState("");
  const [transferOutDate, setTransferOutDate] = useState("");
  const [dischargedDate,setDischargedDate] = useState('')
  const [error, setError] = useState(null);
  const [ward,setWard] = useState('');
  const navigate = useNavigate();

  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!patientName || !patientId || !Age || !gender  || !admissionDate || !ward) {
      setError("All fields are required.");
      
      return;
     
    }
    
    const data = {
      patientName,
      patientId,
      Age: Number(Age),
      gender,
      nhisStatus,
      admissionDate,
      expiredDate,
    };

   

    setLoading(true);
    axios
      .post("http://localhost:8000/api/admission", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        const errorMsg = error.response?.data?.message || error.message;
        setError(errorMsg);
        console.error("Submission error: ", errorMsg);
        console.error("Error details: ", error.response?.data || error);
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
              
                <SelectItem value='Male Mediacal' >Male Medical </SelectItem>
                <SelectItem value='Female Medical'>FeMale Medical </SelectItem>
                <SelectItem value='Male Surgical '>Male Surgical </SelectItem>
                <SelectItem value='Female Surgical'>Feale Surgical </SelectItem>
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
          <Select value={admissionOutcome} onValueChange={(value) => setAdmissionOutcom(value)}>
            <SelectTrigger id="admissionOutcome">
              <SelectValue placeholder="Discharge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select">select</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="discharged">Discharged</SelectItem>
              <SelectItem value="transferInDate">Trans-In</SelectItem>
              <SelectItem value="transferOutDate">Trans-Out</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {admissionOutcome === "expired" &&(
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

        {admissionOutcome === "discharged" && (
          <div className="space-y-2">
          <Label htmlFor="expiredDate">Discharge-Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left font-normal">
              {dischargedDate ? dischargedDate.toLocaleDateString() : "mm/dd/yyyy"}
                <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={expiredDate} onSelect={(date) => setDischargedDate(date)} />
            </PopoverContent>
          </Popover>
        </div>

        )}

        {admissionOutcome === "transferInDate" &&(
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

        {admissionOutcome === "transferOutDate" &&(
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