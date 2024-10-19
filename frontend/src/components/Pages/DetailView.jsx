import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, User, Activity, Stethoscope } from 'lucide-react'
import useAdmissionData from '@/contexts/useAdmissionData'

// Custom Badge component
const Badge = ({ children, variant = 'default' }) => {
  const baseClasses = "px-2 py-1 rounded-full text-sm font-semibold";
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export default function DetailView() {
  const { id } = useParams()
  const { admissionData, loading, error } = useAdmissionData()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const admission = admissionData.find(a => a._id === id)

  if (!admission) {
    return <div>Admission not found</div>
  }

  const {
    patientName,
    status,
    Age,
    admissionDate,
    dischargeDate,
    expiredDate,
    nhisStatus,
    diagnosis,
    transferInDate,
    transferOutDate,
  } = admission

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6" />
          {patientName}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-green-500" />
          <span className="font-semibold">Admission Date:</span>
          <span className="text-green-500">{new Date(admissionDate).toLocaleDateString()}</span>
        </div>
        
        {dischargeDate && (
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">Discharge Date:</span>
            <span>{new Date(dischargeDate).toLocaleDateString()}</span>
          </div>
        )}
        
        {expiredDate && (
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-red-500" />
            <span className="font-semibold">Expired Date:</span>
            <span className="text-red-500">{new Date(expiredDate).toLocaleDateString()}</span>
          </div>
        )}

        {transferOutDate && (
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-red-500" />
            <span className="font-semibold">transferOutDate:</span>
            <span className="text-red-500">{new Date(transferOutDate).toLocaleDateString()}</span>
          </div>
        )}
        
        {transferInDate && (
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-green-500" />
            <span className="font-semibold">transferInDate:</span>
            <span className="text-green-500">{new Date(transferInDate).toLocaleDateString()}</span>
          </div>
        )}


        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-500" />
          <span className="font-semibold">NHIS Status:</span>
          <Badge variant={nhisStatus === 'Active' ? 'default' : 'secondary'}>
            {nhisStatus}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-500" />
          <span className="font-semibold">Status:</span>
          <Badge >
            {status}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-500" />
          <span className="font-semibold">Age:</span>
          <Badge >
            {Age}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-indigo-500" />
          <span className="font-semibold">Diagnosis:</span>
          <span>{diagnosis}</span>
        </div>
      </CardContent>
    </Card>
  )
}