import Loader from "../ui/loader";
import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from 'react-toastify';

export default function UpdateAdmissionForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    Age: "",
    gender: "",
    nhisStatus: "",
    ward: "",
    admissionDate: "",
    status: "",
    expiredDate: "",
    transferInDate: "",
    dischargeDate: "",
    transferOutDate: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/admission/${id}`);
        const admissionData = response.data;
        console.log("Fetched admission data:", admissionData);
        
        if (Array.isArray(admissionData) && admissionData.length > 0) {
          const selectedAdmission = admissionData[0]; // Assuming the first item is the correct one
          setFormData({
            patientName: selectedAdmission.patientName || "",
            patientId: selectedAdmission.patientId || "",
            Age: selectedAdmission.Age?.toString() || "",
            gender: selectedAdmission.gender || "",
            nhisStatus: selectedAdmission.nhisStatus || "",
            ward: selectedAdmission.ward || "",
            admissionDate: selectedAdmission.admissionDate ? new Date(selectedAdmission.admissionDate) : "",
            status: selectedAdmission.status || "",
            expiredDate: selectedAdmission.expiredDate ? new Date(selectedAdmission.expiredDate) : "",
            transferInDate: selectedAdmission.transferInDate ? new Date(selectedAdmission.transferInDate) : "",
            dischargeDate: selectedAdmission.dischargeDate ? new Date(selectedAdmission.dischargeDate) : "",
            transferOutDate: selectedAdmission.transferOutDate ? new Date(selectedAdmission.transferOutDate) : ""
          });
        } else {
          toast.error("No admission data found.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admission data:", error);
        toast.error("Failed to fetch admission data. Please try again.");
        setLoading(false);
      }
    };

    fetchAdmissionData();
  }, [id]);


  useEffect(() => {
    console.log("Updated form data:", formData); // Debug log
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prevData => ({ ...prevData, [name]: date }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.patientName) formErrors.patientName = "Patient name is required";
    if (!formData.patientId) formErrors.patientId = "Patient ID is required";
    if (!formData.Age) formErrors.Age = "Age is required";
    if (!formData.gender) formErrors.gender = "Gender is required";
    if (!formData.ward) formErrors.ward = "Ward is required";
    if (!formData.admissionDate) formErrors.admissionDate = "Admission date is required";
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const formatDate = (date) => {
    return date instanceof Date ? date.toISOString().split('T')[0] : date;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = {
      ...formData,
      Age: Number(formData.Age),
      admissionDate: formatDate(formData.admissionDate),
      expiredDate: formatDate(formData.expiredDate),
      transferInDate: formatDate(formData.transferInDate),
      dischargeDate: formatDate(formData.dischargeDate),
      transferOutDate: formatDate(formData.transferOutDate),
      admissionStatus: 'Admitted'
    };

    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8000/api/admission/update-admission/${formData.patientId}`, data);
      setLoading(false);
      toast.success('Admission updated successfully!');
      navigate(`/ward/${formData.ward}`);
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        console.error('Update error:', error);
        toast.error("An error occurred while updating the form. Please try again.");
      }
    }
  };
  if (loading) {
    return (<Loader
      size={220}
      customText="Preparing your medical data"
      showProgress={true}
      progressDuration={15}
      />);
  }

  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle>Update Patient Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          label="Ward"
          error={errors.ward}
          field={
            <Select value={formData.ward} onValueChange={(value) => handleSelectChange("ward", value)}>
              <SelectTrigger id="ward">
                <SelectValue placeholder="Select Ward" />
              </SelectTrigger>
              <SelectContent>
                {['Male Medical', 'Female Medical', 'Male Surgical', 'Female Surgical', 'Maternity', 'NICU', 'Kids Ward'].map((ward) => (
                  <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
        <FormField
          label="Patient-ID"
          error={errors.patientId}
          field={
            <Input 
              name="patientId"
              placeholder="Enter Patient ID eg. ER-A06-AAA1234..." 
              value={formData.patientId} 
              onChange={handleInputChange}
            />
          }
        />
        <FormField
          label="Name"
          error={errors.patientName}
          field={
            <Input 
              name="patientName"
              placeholder="Enter Patient Name eg. Samuel Sarpong" 
              value={formData.patientName} 
              onChange={handleInputChange}
            />
          }
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Insurance-Status"
            error={errors.nhisStatus}
            field={
              <Select value={formData.nhisStatus} onValueChange={(value) => handleSelectChange("nhisStatus", value)}>
                <SelectTrigger id="nhisStatus">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="InActive">InActive</SelectItem>
                </SelectContent>
              </Select>
            }
          />
          <FormField
            label="Gender"
            error={errors.gender}
            field={
              <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Age"
            error={errors.Age}
            field={
              <Input 
                name="Age"
                placeholder="Enter Age eg. 48" 
                value={formData.Age} 
                onChange={handleInputChange}
              />
            }
          />
          <FormField
            label="Admission-Date"
            error={errors.admissionDate}
            field={
              <DatePicker
                date={formData.admissionDate}
                onSelect={(date) => handleDateChange("admissionDate", date)}
              />
            }
          />
        </div>
        <FormField
          label="Admission Outcome"
          error={errors.status}
          field={
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
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
          }
        />
        {formData.status === "Expired" && (
          <FormField
            label="Expired-Date"
            error={errors.expiredDate}
            field={
              <DatePicker
                date={formData.expiredDate}
                onSelect={(date) => handleDateChange("expiredDate", date)}
              />
            }
          />
        )}
        {formData.status === "Discharged" && (
          <FormField
            label="Discharge-Date"
            error={errors.dischargeDate}
            field={
              <DatePicker
                date={formData.dischargeDate}
                onSelect={(date) => handleDateChange("dischargeDate", date)}
              />
            }
          />
        )}
        {formData.status === "TransferIn" && (
          <FormField
            label="TransIn-Date"
            error={errors.transferInDate}
            field={
              <DatePicker
                date={formData.transferInDate}
                onSelect={(date) => handleDateChange("transferInDate", date)}
              />
            }
          />
        )}
        {formData.status === "TransferOut" && (
          <FormField
            label="TransOut-Date"
            error={errors.transferOutDate}
            field={
              <DatePicker
                date={formData.transferOutDate}
                onSelect={(date) => handleDateChange("transferOutDate", date)}
              />
            }
          />
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full mr-2" onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
        <Button className="bg-red-500 text-white rounded w-full" variant="danger" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}

const FormField = ({ label, error, field }) => (
  <div className="space-y-2">
    <Label htmlFor={label}>{label}</Label>
    {field}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const DatePicker = ({ date, onSelect }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="w-full text-left font-normal">
        {date ? date.toLocaleDateString() : "mm/dd/yyyy"}
        <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar mode="single" selected={date} onSelect={onSelect} />
    </PopoverContent>
  </Popover>
);

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