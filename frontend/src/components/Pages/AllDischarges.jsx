
import React, {useContext, useState} from "react";
import DatePicker from "../DatePicker";
import { Button } from "@/components/ui/button";
import AdmissionOutComeContext from "@/contexts/admissionOutcomeContext";
import { buttonVariants } from "@/components/ui/button";
import AdmissionForm from "../Forms/AdmissionForm";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AllDischarges = () => {
  const {allDischargesData ,loading,error}   = useContext(AdmissionOutComeContext)
  const [searchTerm, setSearchTerm] = useState('')

  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 // Function to handle the search input change
const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};


// Filtering the discharges based on name and date
const filteredDischarges = allDischargesData.filter((discharge) => {
  // Check if the patient name exists and convert to lowercase
  const patientName = discharge.patientName ? discharge.patientName.toLowerCase() : '';
  const search = searchTerm.toLowerCase();

  // Check if the name matches the search term
  const matchesSearchTerm = patientName.includes(search);
  if (allDischargesData.length === 0) {
    return <p>No discharge data available.</p>;
  }

  
  return matchesSearchTerm 
});
 
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100 border-b-4 ml-10 mr-10">
        <header className="flex flex-row justify-between bg-white shadow px-4 py-2">
          <div className="text-xl font-bold">KWAHU GOVERNMENT HOSPITAL</div>
          <div className="text-xl font-bold">User info</div>
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

          <Table>
            <TableCaption>A list of all discharges.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">PatientID</TableHead>
                <TableHead>NHIS-Status</TableHead>
                <TableHead>Patient-Name</TableHead>
                <TableHead className="text-right">Admission-Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {filteredDischarges.map((discharge,index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{discharge.patientId}</TableCell>
                  <TableCell>{discharge.nhisStatus}</TableCell>
                  <TableCell>{discharge.patientName}</TableCell>
                  <TableCell className="text-right">{discharge.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  );
};

export default AllDischarges;

