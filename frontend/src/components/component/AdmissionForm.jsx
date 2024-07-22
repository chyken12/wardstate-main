// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import DatePicker from "../DatePicker";
// // import axios from "axios";
// // import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
// // import { Label } from "@/components/ui/label"
// // import { Input } from "@/components/ui/input"
// // import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// // import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
// // import { Calendar } from "@/components/ui/calendar"


// // const AddAdmission = () => {
// //   const [patientName, setPatientName] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [patientId, setPatientId] = useState("");
// //   const [Age, setAge] = useState("");
// //   const [gender, setGender] = useState("");
// //   const [nhisStatus, setNhisStatus] = useState("");
// //   const [transferInDate, setTransferInDate] = useState("");
// //   const [transferOutDate, setTransferOutDate] = useState("");
// //   const [admissionDate, setAdmissionDate] = useState("");
// //   const [admissionOutcome, setAdmissionOutcome] = useState("admitted")
// //   const [dischargeDate, setDischargeDate] = useState("");
// //   const [expiredDate, setExpiredDate] = useState("");
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   const handleSubmit = (event) => {
// //     event.preventDefault();

// //     // Form validation
// //     if (
// //       !patientName ||
// //       !patientId ||
// //       !Age ||
// //       !gender ||
// //       nhisStatus === "Select" ||
// //       !admissionDate
// //     ) {
// //       setError("All fields are required.");
// //       return;
// //     }
// //     const data = {
// //       patientName,
// //       patientId,
// //       Age: Number(Age),
// //       gender,
// //       nhisStatus,
// //       admissionDate,
// //     };

// //     setLoading(true);
// //     axios
// //       .post("http://localhost:8000/api/admission", data)
// //       .then(() => {
// //         setLoading(false);
// //         navigate("/");
// //       })
// //       .catch((error) => {
// //         setLoading(false);
// //         const errorMsg = error.response?.data?.message || error.message;
// //         setError(errorMsg);
// //         console.error("Submission error: ", errorMsg); // Debugging line
// //         console.error("Error details: ", error.response?.data || error); // Detailed error info
// //       });
// //   };

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   return (
// //     // <div className="flex flex-col min-h-screen bg-gray-100 border-b-4 ml-10 mr-10">
// //     //   <header className="flex flex-row justify-between bg-white shadow px-4 py-2">
// //     //     <div className="text-xl font-bold">KWAHU GOVERNMENT HOSPITAL</div>
// //     //     <div className="text-xl font-bold">User info</div>
// //     //   </header>
// //     //   <div className="flex flex-row justify-between bg-gray-200 px-4 py-2">
// //     //     <div className="text-sm font-medium">DAILY WARD STATE</div>
// //     //   </div>
// //     //   <main className="flex flex-col flex-grow px-4 py-4 rounded">
// //     //     <div className="box-border border-2">
// //     //       <div className="flex flex-row justify-between py-2 px-3">
// //     //         <div className="flex flex-row">
// //     //           <div className="px-16">
// //     //             <h1>ADD EVENT</h1>
// //     //           </div>
// //     //         </div>
// //     //       </div>
// //     //     </div>
// //     //     <div className="flex flex-row border-b border-gray-200 px-4 py-2">
// //     //       <div className="flex flex-row justify-between mt-5">
// //     //         <div className="flex flex-row space-x-2">
// //     //           <div className="flex">
// //     //             <Link to="/admissionform">
// //     //               <Button
// //     //                 className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //                 variant="outline"
// //     //               >
// //     //                 Admission
// //     //               </Button>
// //     //             </Link>
// //     //             <Link to="/dischargeform">
// //     //               <Button
// //     //                 className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //                 variant="outline"
// //     //               >
// //     //                 Discharge
// //     //               </Button>
// //     //             </Link>
// //     //             <Link to="/transinform">
// //     //               <Button
// //     //                 className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //                 variant="outline"
// //     //               >
// //     //                 Trans In
// //     //               </Button>
// //     //             </Link>
// //     //             <Link to="/transoutform">
// //     //               <Button
// //     //                 className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //                 variant="outline"
// //     //               >
// //     //                 Trans Out
// //     //               </Button>
// //     //             </Link>
// //     //             <Link to="/expiredform">
// //     //               <Button
// //     //                 className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //                 variant="outline"
// //     //               >
// //     //                 Deaths
// //     //               </Button>
// //     //             </Link>
// //     //           </div>
// //     //         </div>
// //     //       </div>
// //     //     </div>

// //     //     <div className="border-4 border-solid rounded mr-[50px] mt-10">
// //     //       <form
// //     //         onSubmit={handleSubmit}
// //     //         className="ml- mb-10 grid justify-center mt-10"
// //     //       >
// //     //         <label className="mb-2" htmlFor="patientId">
// //     //           Patient-ID
// //     //         </label>
// //     //         <input
// //     //           className="border border-slate-600 rounded text-center w-[400px] mb-3 placeholder:italic placeholder:text-slate-400 block bg-white py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
// //     //           placeholder="Enter Patient ID eg. ER-A06-AAA1234..."
// //     //           type="text"
// //     //           value={patientId}
// //     //           onChange={(e) => setPatientId(e.target.value)}
// //     //           required
// //     //         />
// //     //         <label className="mb-2" htmlFor="patientName">
// //     //           Name
// //     //         </label>
// //     //         <input
// //     //           className="border border-slate-600 rounded text-center w-[400px] mb-3 placeholder:italic placeholder:text-slate-400 block bg-white py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
// //     //           placeholder="Enter Patient Name eg. Samuel Sarpong"
// //     //           value={patientName}
// //     //           onChange={(e) => setPatientName(e.target.value)}
// //     //           required
// //     //         />
// //     //         <div className="flex flex-row">
              
// //     //           <div className="flex-initial w-30 ">
// //     //             <label className="grid mb-2" htmlFor="nhisStatus">
// //     //               Insurance-Status
// //     //             </label>
// //     //             <select
// //     //               value={nhisStatus}
// //     //               name="nhisStatus"
// //     //               onChange={(e) => setNhisStatus(e.target.value)}
// //     //               className="border-collapse border border-slate-600 rounded text-center w-[180px] mb-3 mr-9 shadow-sm py-2 pl-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //             >
// //     //               <option value="Select">Select</option>
// //     //               <option value="Insured">Insured</option>
// //     //               <option value="NonInsured">NonInsured</option>
// //     //             </select>
// //     //           </div>
// //     //           <div className="flex">
// //     //             <div className="flex-initial w-30">
// //     //               <label className="grid mb-2" htmlFor="gender">
// //     //                 Gender
// //     //               </label>
// //     //               <select
// //     //                 type="text"
// //     //                 value={gender}
// //     //                 onChange={(e) => setGender(e.target.value)}
// //     //                 className="border-collapse border border-slate-600 rounded text-center w-[180px] shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //                 required
// //     //               >
// //     //                 <option value="Select">Select</option>
// //     //                 <option value="Male">Male</option>
// //     //                 <option value="Female">Female</option>
// //     //               </select>
// //     //             </div>
// //     //           </div>
// //     //         </div>
// //     //         <div className="flex flex-row">
// //     //           <div className="flex-initial w-30 mr-10">
// //     //             <label className="grid mb-2" htmlFor="Age">
// //     //               Age
// //     //             </label>
// //     //             <input
// //     //               className="border border-slate-600 rounded text-center shadow-sm py-2 mb-5 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //               placeholder="Enter Age eg. 48"
// //     //               type="number"
// //     //               value={Age}
// //     //               name="Age"
// //     //               onChange={(e) => setAge(e.target.value)}
// //     //               required
// //     //             />
// //     //           </div>
              

// //     //           <div className="flex-initial w-30 mr-10">
// //     //             <label className="grid mb-2" htmlFor="admissionDate">
// //     //               Admission-Date
// //     //             </label>
// //     //             <input
// //     //               className="border border-slate-600 rounded text-center px-5 shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //               type="date"
// //     //               value={admissionDate}
// //     //               name="admissionDate"
// //     //               onChange={(e) => setAdmissionDate(e.target.value)}
// //     //             />
// //     //           </div>
// //     //         </div>
// //     //         <div className="flex flex-row">
// //     //           <div className="flex-initial w-30 mr-10">
// //     //             <label className="grid mb-2" htmlFor="transferInDate">
// //     //               TransIn-Date
// //     //             </label>
// //     //             <input
// //     //               className="border border-slate-600 rounded text-center px-5 shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //               type="date"
// //     //               value={transferInDate}
// //     //               name="transferInDate"
// //     //               onChange={(e) => setTransferInDate(e.target.value)}
// //     //             />
// //     //           </div>
              
// //     //           <div className="flex-initial w-30 mr-10">
// //     //             <label className="grid mb-2" htmlFor="transferOutDate">
// //     //               TransOut-Date
// //     //             </label>
// //     //             <input
// //     //               className="border border-slate-600 rounded text-center px-5 shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //               type="date"
// //     //               value={transferOutDate}
// //     //               name="transferOutDate"
// //     //               onChange={(e) => setTransferOutDate(e.target.value)}
// //     //             />
// //     //           </div>
              
// //     //         </div>
// //     //           <div className="flex flex-row">
// //     //         <div className="flex-initial w-30 mr-10 ">
// //     //             <label className="grid mb-2 mt-2" htmlFor="dischargeDate">
// //     //               DischargeDate
// //     //             </label>
// //     //             <input
// //     //               className="border border-slate-600 rounded text-center px-5 shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //               type="date"
// //     //               value={ dischargeDate}
// //     //               name="dischargeDate"
// //     //               onChange={(e) => setDischargeDate(e.target.value)}
// //     //             />
// //     //           </div>
// //     //           <div className="flex-initial w-30 mr-10">
// //     //             <label className="grid mb-2 mt-2" htmlFor="expiredDate">
// //     //               Expired-Date
// //     //             </label>
// //     //             <input
// //     //               className="border border-slate-600 rounded text-center px-5 shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //               type="date"
// //     //               value={expiredDate}
// //     //               name="expiredDate"
// //     //               onChange={(e) => setExpiredDate(e.target.value)}
// //     //             />
// //     //           </div>
// //     //           </div>
// //     //         <Button
// //     //           className="shadow-sm py-2 mt-3 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
// //     //           type="submit"
// //     //           variant="outline"
// //     //         >
// //     //           Add
// //     //         </Button>
// //     //       </form>
// //     //     </div>
// //     //   </main>
// //     // </div>
// //     <Card className="w-full max-w-md mx-auto p-4">
// //       <CardHeader>
// //         <CardTitle>Patient Information</CardTitle>
// //       </CardHeader>
// //       <CardContent className="space-y-4">
// //         <div className="space-y-2">
// //           <Label htmlFor="patient-id">Patient-ID</Label>
// //           <Input id="patient-id" placeholder="Enter Patient ID eg. ER-A06-AAA1234..." />
// //         </div>
// //         <div className="space-y-2">
// //           <Label htmlFor="name">Name</Label>
// //           <Input id="name" placeholder="Enter Patient Name eg. Samuel Sarpong" />
// //         </div>
// //         <div className="grid grid-cols-2 gap-4">
// //           <div className="space-y-2">
// //             <Label htmlFor="insurance-status">Insurance-Status</Label>
// //             <Select>
// //               <SelectTrigger id="insurance-status">
// //                 <SelectValue placeholder="Select" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="insured">Insured</SelectItem>
// //                 <SelectItem value="uninsured">Uninsured</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>
// //           <div className="space-y-2">
// //             <Label htmlFor="gender">Gender</Label>
// //             <Select>
// //               <SelectTrigger id="gender">
// //                 <SelectValue placeholder="Select" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="male">Male</SelectItem>
// //                 <SelectItem value="female">Female</SelectItem>
// //                 <SelectItem value="other">Other</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>
// //         </div>
// //         <div className="grid grid-cols-2 gap-4">
// //           <div className="space-y-2">
// //             <Label htmlFor="age">Age</Label>
// //             <Input id="age" placeholder="Enter Age eg. 48" />
// //           </div>
// //           <div className="space-y-2">
// //             <Label htmlFor="admission-date">Admission-Date</Label>
// //             <Popover>
// //               <PopoverTrigger asChild>
// //                 <Button variant="outline" className="w-full text-left font-normal">
// //                   mm/dd/yyyy
// //                   <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
// //                 </Button>
// //               </PopoverTrigger>
// //               <PopoverContent className="w-auto p-0" align="start">
// //                 <Calendar mode="single" />
// //               </PopoverContent>
// //             </Popover>
// //           </div>
// //         </div>
// //         <div className="space-y-2">
// //           <Label htmlFor="admission-outcome">Admission Outcome</Label>
// //           <Select>
// //             <SelectTrigger id="admission-outcome">
// //               <SelectValue placeholder="Expired" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="expired">Expired</SelectItem>
// //               <SelectItem value="discharged">Discharged</SelectItem>
// //               <SelectItem value="transferred">Transferred</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>
// //         <div className="space-y-2">
// //           <Label htmlFor="expired-date">Expired-Date</Label>
// //           <Popover>
// //             <PopoverTrigger asChild>
// //               <Button variant="outline" className="w-full text-left font-normal">
// //                 mm/dd/yyyy
// //                 <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
// //               </Button>
// //             </PopoverTrigger>
// //             <PopoverContent className="w-auto p-0" align="start">
// //               <Calendar mode="single" />
// //             </PopoverContent>
// //           </Popover>
// //         </div>
// //       </CardContent>
// //       <CardFooter>
// //         <Button className="w-full">Add</Button>
// //       </CardFooter>
// //     </Card>
// //   );
// // };

// // export default AddAdmission;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";

//   const AddAdmission = () => {
//   const [patientName, setPatientName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [patientId, setPatientId] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [nhisStatus, setNhisStatus] = useState("");
//   const [admissionDate, setAdmissionDate] = useState("");
//   const [expiredDate, setExpiredDate] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Form validation
//     if (
//       !patientName ||
//       !patientId ||
//       !age ||
//       !gender ||
//       nhisStatus === "Select" ||
//       !admissionDate
//     ) {
//       setError("All fields are required.");
//       return;
//     }

//     const data = {
//       patientName,
//       patientId,
//       age: Number(age),
//       gender,
//       nhisStatus,
//       admissionDate,
//       expiredDate,
//     };

//     setLoading(true);
//     axios
//       .post("http://localhost:8000/api/admission", data)
//       .then(() => {
//         setLoading(false);
//         navigate("/");
//       })
//       .catch((error) => {
//         setLoading(false);
//         const errorMsg = error.response?.data?.message || error.message;
//         setError(errorMsg);
//         console.error("Submission error: ", errorMsg); // Debugging line
//         console.error("Error details: ", error.response?.data || error); // Detailed error info
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 border-b-4 ml-10 mr-10">
//       <header className="flex flex-row justify-between bg-white shadow px-4 py-2">
//         <div className="text-xl font-bold">KWAHU GOVERNMENT HOSPITAL</div>
//         <div className="text-xl font-bold">User info</div>
//       </header>
//       <div className="flex flex-row justify-between bg-gray-200 px-4 py-2">
//         <div className="text-sm font-medium">DAILY WARD STATE</div>
//       </div>
//       <main className="flex flex-col flex-grow px-4 py-4 rounded">
//         <div className="box-border border-2">
//           <div className="flex flex-row justify-between py-2 px-3">
//             <div className="flex flex-row">
//               <div className="px-16">
//                 <h1>ADD EVENT</h1>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-row border-b border-gray-200 px-4 py-2">
//           <div className="flex flex-row justify-between mt-5">
//             <div className="flex flex-row space-x-2">
//               <div className="flex">
//                 <Link to="/admissionform">
//                   <Button
//                     className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
//                     variant="outline"
//                   >
//                     Admission
//                   </Button>
//                 </Link>
//                 <Link to="/dischargeform">
//                   <Button
//                     className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
//                     variant="outline"
//                   >
//                     Discharge
//                   </Button>
//                 </Link>
//                 <Link to="/transinform">
//                   <Button
//                     className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
//                     variant="outline"
//                   >
//                     Trans In
//                   </Button>
//                 </Link>
//                 <Link to="/transoutform">
//                   <Button
//                     className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
//                     variant="outline"
//                   >
//                     Trans Out
//                   </Button>
//                 </Link>
//                 <Link to="/expiredform">
//                   <Button
//                     className="shadow-sm py-2 focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm"
//                     variant="outline"
//                   >
//                     Deaths
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Card className="w-full max-w-md mx-auto p-4 mt-10">
//           <CardHeader>
//             <CardTitle>Patient Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="patient-id">Patient-ID</Label>
//               <Input
//                 id="patient-id"
//                 placeholder="Enter Patient ID eg. ER-A06-AAA1234..."
//                 value={patientId}
//                 onChange={(e) => setPatientId(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 placeholder="Enter Patient Name eg. Samuel Sarpong"
//                 value={patientName}
//                 onChange={(e) => setPatientName(e.target.value)}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="insurance-status">Insurance-Status</Label>
//                 <Select
//                   value={nhisStatus}
//                   onValueChange={(value) => setNhisStatus(value)}
//                 >
//                   <SelectTrigger id="insurance-status">
//                     <SelectValue placeholder="Select" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Insured">Insured</SelectItem>
//                     <SelectItem value="Uninsured">Uninsured</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="gender">Gender</Label>
//                 <Select
//                   value={gender}
//                   onValueChange={(value) => setGender(value)}
//                 >
//                   <SelectTrigger id="gender">
//                     <SelectValue placeholder="Select" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Male">Male</SelectItem>
//                     <SelectItem value="Female">Female</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="age">Age</Label>
//                 <Input
//                   id="age"
//                   placeholder="Enter Age eg. 48"
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="admission-date">Admission-Date</Label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button variant="outline" className="w-full text-left font-normal">
//                       {admissionDate || "mm/dd/yyyy"}
//                       <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                       mode="single"
//                       selected={admissionDate}
//                       onSelect={(date) => setAdmissionDate(date)}
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="admission-outcome">Admission Outcome</Label>
//               <Select>
//                 <SelectTrigger id="admission-outcome">
//                   <SelectValue placeholder="Select Outcome" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Discharge">Discharge</SelectItem>
//                   <SelectItem value="Referral">Referral</SelectItem>
//                   <SelectItem value="Transfer Out">Transfer Out</SelectItem>
//                   <SelectItem value="Death">Death</SelectItem>
//                   <SelectItem value="LAMA">LAMA</SelectItem>
//                   <SelectItem value="Absconded">Absconded</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//           <CardFooter className="space-x-2">
//             <Button onClick={handleSubmit}>Submit</Button>
//             <Button variant="outline" onClick={() => navigate("/")}>
//               Cancel
//             </Button>
//           </CardFooter>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default AddAdmission;
