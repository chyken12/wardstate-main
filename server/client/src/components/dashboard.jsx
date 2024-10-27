'use client'

import { useState, useEffect, useContext, lazy } from 'react'
import { Bell, ChevronDown, Layout, Users, Bed, Calendar, Settings, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { calculateWardStatistics } from '@/utils/wardUtils'
import useAdmissionData from '@/contexts/useAdmissionData'
import { UserContext } from '@/contexts/UserContetext'

const WARD_TYPES = [
  "Male Medical",
  "Female Medical",
  "Male Surgical",
  "Female Surgical",
  "NICU",
  "Maternity",
  "Kids Ward",
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedWard, setSelectedWard] = useState(WARD_TYPES[0])
  const [wardStats, setWardStats] = useState({
    remainedPreviousNight: 0,
    totalAdmissions: 0,
    totalDischarges: 0,
    totalDeaths: 0,
    transferIn: 0,
    transferOut: 0,
    emptyBeds: 0,
    remainedAtMidnight: 0
  })

  // Get user context
  const { loggedInUser, setLoggedInUser } = useContext(UserContext)

  // Use the custom hook for admission data
  const {
    admissionData,
    allDischargesData,
    allExpiredData,
    allTransInData,
    allTransOutData,
    updateAdmissionData,
    loading,
    error
  } = useAdmissionData()

  // Update ward statistics when selected ward or admissions change
  useEffect(() => {
    const stats = calculateWardStatistics(admissionData, selectedWard)
    setWardStats(stats)
  }, [selectedWard, admissionData])

  // Get recent patients for the selected ward
  const recentPatients = admissionData
    .filter(admission => 
      admission.ward === selectedWard && 
      admission.status === 'Admitted'
    )
    .sort((a, b) => new Date(b.admissionDate) - new Date(a.admissionDate))
    .slice(0, 4)

  const handleLogout = () => {
    setLoggedInUser(null)
    localStorage.removeItem('user')
    // Add any navigation logic here
  }

  const handleDischargePatient = async (patientId) => {
    try {
      const patientToUpdate = admissionData.find(p => p.patientId === patientId)
      if (!patientToUpdate) return

      await updateAdmissionData({
        ...patientToUpdate,
        status: 'Discharged',
        dischargeDate: new Date()
      })
    } catch (error) {
      console.error('Error discharging patient:', error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white w-64 min-h-screen flex flex-col ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-2xl font-semibold">Ward Admin</span>
        </div>
        <nav className="flex-grow">
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Layout className="mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Users className="mr-3" />
            Patients
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Bed className="mr-3" />
            Beds
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Calendar className="mr-3" />
            Schedule
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Settings className="mr-3" />
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Layout className="h-6 w-6" />
          </Button>
          <div className="flex items-center">
            <Input className="mr-4" placeholder="Search patients..." />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>{loggedInUser?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 hidden md:inline-block">{loggedInUser?.username || 'User'}</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-semibold mb-6">Ward Overview</h1>
          
          {/* Ward Selector */}
          <div className="mb-6">
            <Select onValueChange={setSelectedWard} value={selectedWard}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a ward" />
              </SelectTrigger>
              <SelectContent>
                {WARD_TYPES.map((ward) => (
                  <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{wardStats.remainedAtMidnight}</div>
                <p className="text-xs text-muted-foreground">Total occupied beds</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
                <Bed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{wardStats.emptyBeds}</div>
                <p className="text-xs text-muted-foreground">Empty beds</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Activity</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +{wardStats.totalAdmissions} / -{wardStats.totalDischarges}
                </div>
                <p className="text-xs text-muted-foreground">Admissions / Discharges</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transfers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +{wardStats.transferIn} / -{wardStats.transferOut}
                </div>
                <p className="text-xs text-muted-foreground">In / Out</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Patients */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Patients in {selectedWard}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.patientId} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{patient.patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {patient.patientId}, Age: {patient.Age}, NHIS: {patient.nhisStatus}
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => handleDischargePatient(patient.patientId)}
                    >
                      Discharge
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button className="w-full">Admit Patient</Button>
            <Button className="w-full">Transfer Patient</Button>
            <Button className="w-full">View All Patients</Button>
            <Button className="w-full">Generate Report</Button>
          </div>
        </main>
      </div>
    </div>
  )
}