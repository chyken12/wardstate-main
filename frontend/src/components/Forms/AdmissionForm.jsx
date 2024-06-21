import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import AdmissionOutComeContext from "../../contexts/admissionOutcomeContext";
import DatePicker from "../DatePicker";

const AdmissionForm = () => {
  const { admissionData, updateAdmissionData } = useContext(
    AdmissionOutComeContext
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateAdmissionData({ [name]: value });
  };

  const handleOutcomeChange = (event) => {
    updateAdmissionData({
      admissionOutcome: {
        type: event.target.value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
              <div className="flex flex-row space-x-2">
                <div className="flex">
                  <Link to="/admissionform">
                  <Button className=" shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"variant="outline">Admission
                  </Button>
                  </Link>

                  <Link to="/dischargeform">
                   <Button className=" shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"variant="outline">Discharge
                   </Button>
                   </Link>f
                  <Link to="/transinform">
                  <Button className=" shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"variant="outline">Trans In
                  </Button>
                  </Link>
                  <Link to="/transoutform">
                  <Button className=" shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"variant="outline">Trans Out
                  </Button>
                  </Link>
                  <Link to="/expiredform"> 
                  <Button className=" shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"variant="outline">Deaths
                  </Button>
                  </Link>
                 
                  
                  
                  
                </div>
              </div>
            </div>
            <div />
          </div>
          <div className="border-4 border-solid rounded  mr-[50px] mt-10 ">
            <form
              onSubmit={handleSubmit}
              className=" ml- mb-10 grid justify-center mt-10"
            >
              <label className=" mb-2" htmlFor="patientname">Patient-ID</label>

              <input
                className="
                border border-slate-600 rounded text-center w-[400px] mb-3 placeholder:italic placeholder:text-slate-400 block bg-white py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Enter Patient ID eg. ER-A06-AAA1234..."
                type="text"
                value={admissionData.patientid}
                name="patientid"
                onChange={handleChange}
                required
              />

              <label className="mb-2" htmlFor="patientname">Name</label>

              <input
                className="
                border border-slate-600 rounded text-center w-[400px]
                 mb-3 placeholder:italic placeholder:text-slate-400 block
                  bg-white py-2 pl-9 pr-3 shadow-sm focus:outline-none
                   focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Enter Patient Name eg. Samuel Sarpong"
               
                value={admissionData.patientname}
                name="patientname"
                onChange={handleChange}
                required
              />
              <div className="flex flex-row ">
                <div className="flex-initial w-30 mr-10 ...">
                  <label className="grid mb-2" htmlFor="patientname">
                    Age
                  </label>

                  <input
                    className="
                    border border-slate-600 rounded text-center shadow-sm py-2 mb-5 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm " placeholder="Enter Age eg. 48"
                    type="text"
                    value={admissionData.age}
                    name="age"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex ">
                  <div className="flex-initial w-30  ...">
                    <label className="grid mb-2" htmlFor="gender">
                      Gender
                    </label>
                    <select
                      value={admissionData.gender}
                      name="gender"
                      onChange={handleChange}
                      className="border-collapse border border-slate-600 rounded text-center w-[180px]  shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
                      required
                    >
                      <option value="Select">Select</option>
                      <option value="Male">Male</option>
                      <option value="female">Femal</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex-initial w-30  ...">
                  <label className="grid mb-2" htmlFor="insurancestatus">
                    Insurance-Status
                  </label>
                  <select
                    value={admissionData.insurancestatus}
                    name="insurancestatus"
                    onChange={handleChange}
                    className="border-collapse border border-slate-600 rounded text-center w-[180px] mb-3 mr-10  shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
                  >
                    <option value="Select">Select</option>
                    <option value="Insured">Insured</option>
                    <option value="NonInsured">NonInsured</option>
                  </select>
                </div>
                <div className="flex-initial w-30  ...">
                  <label className="grid mb-2" htmlFor="Admission-Date">
                    Admission-Date
                  </label>
                  <input
                    className="border border-slate-600 rounded text-center px-5  shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
                    type="date"
                    value={admissionData.date}
                    name="date"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button className=" shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"  variant="outline">Add</Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdmissionForm;
