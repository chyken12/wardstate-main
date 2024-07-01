import React, {useContext,useState} from "react";
import AdmissionOutComeContext from "@/contexts/admissionOutcomeContext";
import DatePicker from "../DatePicker";
import { Button } from "@/components/ui/button";
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

const AllAdmissions = () => {
  const {admissionData, loading, error} = useContext(AdmissionOutComeContext)
  const [searchTerm,setSearchTerm] = useState("")
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = admissionData.filter((admission) => {
    const patientName = admission.patientName ? admission.patientName.toLowerCase() : "";
    const search = searchTerm.toLowerCase();
    return patientName.includes(search);
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
                <DatePicker />
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

          <Table>
            <TableCaption>A list of all admissions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">PatientID</TableHead>
                <TableHead>NHIS-Status</TableHead>
                <TableHead>Patient-Name</TableHead>
                <TableHead className="text-right">Admission-Outcome</TableHead>
              </TableRow >
            </TableHeader>
            <TableBody>
            {filteredData.map((admission, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{admission.patientId}</TableCell>
                  <TableCell>{admission.status}</TableCell>
                  <TableCell>{admission.patientName}</TableCell>
                  <TableCell className="text-right">{admission.admissionOutcome}</TableCell>
                </TableRow>
              ))}
              {/* {filteredAdmissions.map((admission,index))}
              <TableRow key={index}>
                <TableCell className="font-medium">admission.patientId</TableCell>
                <TableCell>admission.insuranceStatus</TableCell>
                <TableCell>admission.patientName</TableCell>
                <TableCell className="text-right">DISCHARGED</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ER-A06-AAA1234</TableCell>
                <TableCell>non-INSURED</TableCell>
                <TableCell>SAMUEL SARPONG ADADE</TableCell>
                <TableCell className="text-right">DISCHARGED</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ER-A06-AAA1234</TableCell>
                <TableCell>non-INSURED</TableCell>
                <TableCell>SAMUEL SARPONG ADADE</TableCell>
                <TableCell className="text-right">DISCHARGED</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ER-A06-AAA1234</TableCell>
                <TableCell>non-INSURED</TableCell>
                <TableCell>SAMUEL SARPONG ADADE</TableCell>
                <TableCell className="text-right">DISCHARGED</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ER-A06-AAA1234</TableCell>
                <TableCell>non-INSURED</TableCell>
                <TableCell>SAMUEL SARPONG ADADE</TableCell>
                <TableCell className="text-right">DISCHARGED</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  );
};

export default AllAdmissions;
