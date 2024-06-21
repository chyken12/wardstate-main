import React from "react";
import{ Link }from 'react-router-dom'
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

const Home = () => {
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
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search by name..."
                  type="text"
                  name="search"
                />
                <Button variant="outline">Search</Button>
              </div>
            </div>
          </div>
          <div className="flex flex-row border-b border-gray-200 px-4 py-2  ">
            <div className="flex flex-row justify-between mt-5 ">
              <div className="text-sm font-medium">Remaind at mindnight: 8</div>
              <div className="text-gray-400 px-2">|</div>
              <div className="text-sm font-medium">Admissions: 8</div>
              <div className="text-gray-400 px-2">|</div>
              <div className="text-gray-400 px-2">|</div>
              <div className="flex flex-row space-x-2">
                <div className="text-sm font-medium">Discharges: 5</div>
                <div className="text-gray-400">|</div>
                <div className="text-sm font-medium">Trans Out: 0</div>
                <div className="text-gray-400">|</div>
                <div className="flex">
                  <Link to="/all-admissions" > <Button className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"  variant="outline">Admissions</Button></Link>

                  <Link to="/all-discharges" > <Button  className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"  variant="outline">Discharges</Button></Link>

                  <Link to="/all-transin">  <Button  className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"  variant="outline">Trans In</Button></Link>

                  <Link to="/all-transout"> <Button  className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"  variant="outline">Trans Out</Button></Link>

                  <Link to="all-expired"><Button  className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"  variant="outline">Deaths</Button></Link>
                </div>
              </div>
            </div>
            <div />
          </div>
          <div className="grid  justify-items-end  px-5 ">
            <Link to="/admissionform">
              <Button variant="outline">Add Event</Button>
            </Link>
          </div>
          <Table>
            <TableCaption>A list of all admissions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">PatientID</TableHead>
                <TableHead>NHIS-Status</TableHead>
                <TableHead>Patient-Name</TableHead>
                <TableHead className="text-right">Admission-Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
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
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ER-A06-AAA1234</TableCell>
                <TableCell>non-INSURED</TableCell>
                <TableCell>SAMUEL SARPONG ADADE</TableCell>
                <TableCell className="text-right">DISCHARGED</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  );
};

export default Home;
