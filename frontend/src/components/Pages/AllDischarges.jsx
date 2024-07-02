
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
  const [searchDate, setSearchDate] = useState(null)

  
  console.log("allDischargesData:", AllDischarges);
  console.log("searchDate:", searchDate);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

   // Filter discharges based on searchDate
   // Ensure allDischargesData is an array
 // Filter discharges based on searchDate
 const filteredDischarges = allDischargesData.filter((discharge) => {
  if (!searchDate) return true; // No date selected, show all
  const dischargeDate = new Date(discharge.dischargeDate); // Assuming dischargeDate is in the data
  return dischargeDate.toDateString() === searchDate.toDateString();
});
  console.log("filteredDischarges:", filteredDischarges);
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
                selectedDate={searchDate}
                onChange={setSearchDate}/>
              </div>
              <div className="flex flex-row">
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-non focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search by name..."
                  type="text"
                  name="search"
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

