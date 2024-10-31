import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from 'lucide-react';

const WardStatisticsHistory = ({ admissionData, selectedWard }) => {
  const [timeframe, setTimeframe] = useState('week');
  const [historicalStats, setHistoricalStats] = useState([]);
  const [trends, setTrends] = useState({
    averageStayDuration: 0,
    mortalityRate: 0,
    occupancyRate: 0,
    busiestDay: '',
    transferRate: 0
  });

  useEffect(() => {
    const generateHistoricalStats = () => {
      const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 90;
      const stats = [];
      
      // Generate dates for the selected timeframe
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        const dayStats = calculateDailyStats(date, admissionData, selectedWard);
        stats.push({
          date: date.toISOString().split('T')[0],
          ...dayStats
        });
      }
      
      setHistoricalStats(stats);
      calculateTrends(stats);
    };

    generateHistoricalStats();
  }, [timeframe, admissionData, selectedWard]);

  const calculateDailyStats = (date, admissions, ward) => {
    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const wardAdmissions = admissions.filter(a => a.ward === ward);
    
    const dailyStats = {
      admissions: wardAdmissions.filter(a => 
        new Date(a.admissionDate) >= dayStart && 
        new Date(a.admissionDate) < dayEnd
      ).length,
      
      discharges: wardAdmissions.filter(a => 
        a.dischargeDate && 
        new Date(a.dischargeDate) >= dayStart && 
        new Date(a.dischargeDate) < dayEnd
      ).length,
      
      deaths: wardAdmissions.filter(a => 
        a.expiredDate && 
        new Date(a.expiredDate) >= dayStart && 
        new Date(a.expiredDate) < dayEnd
      ).length,
      
      transfersIn: wardAdmissions.filter(a => 
        a.transferInDate && 
        new Date(a.transferInDate) >= dayStart && 
        new Date(a.transferInDate) < dayEnd
      ).length,
      
      transfersOut: wardAdmissions.filter(a => 
        a.transferOutDate && 
        new Date(a.transferOutDate) >= dayStart && 
        new Date(a.transferOutDate) < dayEnd
      ).length,
      
      occupancy: calculateOccupancy(dayStart, wardAdmissions, ward)
    };

    return dailyStats;
  };

  const calculateOccupancy = (date, admissions, ward) => {
    const wardCapacity = {
      'Male Medical': 25,
      'Female Medical': 58,
      'Male Surgical': 45,
      'Female Surgical': 45,
      'NICU': 45,
      'Maternity': 45,
      'Kids Ward': 45
    };

    const activePatients = admissions.filter(admission => {
      const admissionDate = new Date(admission.admissionDate);
      const dischargeDate = admission.dischargeDate ? new Date(admission.dischargeDate) : null;
      const expiredDate = admission.expiredDate ? new Date(admission.expiredDate) : null;
      const transferOutDate = admission.transferOutDate ? new Date(admission.transferOutDate) : null;

      return admissionDate <= date && 
             (!dischargeDate || dischargeDate > date) &&
             (!expiredDate || expiredDate > date) &&
             (!transferOutDate || transferOutDate > date);
    }).length;

    return (activePatients / wardCapacity[ward]) * 100;
  };

  const calculateTrends = (stats) => {
    const averageOccupancy = stats.reduce((sum, day) => sum + day.occupancy, 0) / stats.length;
    const mortalityRate = (stats.reduce((sum, day) => sum + day.deaths, 0) / 
                          stats.reduce((sum, day) => sum + day.admissions, 0)) * 100;
    const transferRate = (stats.reduce((sum, day) => sum + day.transfersOut, 0) / 
                         stats.reduce((sum, day) => sum + day.admissions, 0)) * 100;

    const busiestDayStats = stats.reduce((max, day) => 
      day.admissions > max.admissions ? day : max
    );

    setTrends({
      averageStayDuration: calculateAverageStayDuration(admissionData, selectedWard),
      mortalityRate: mortalityRate || 0,
      occupancyRate: averageOccupancy,
      busiestDay: new Date(busiestDayStats.date).toLocaleDateString(),
      transferRate: transferRate || 0
    });
  };

  const calculateAverageStayDuration = (admissions, ward) => {
    const completedStays = admissions.filter(a => 
      a.ward === ward && 
      (a.dischargeDate || a.expiredDate || a.transferOutDate)
    );

    if (completedStays.length === 0) return 0;

    const totalDays = completedStays.reduce((sum, stay) => {
      const endDate = new Date(stay.dischargeDate || stay.expiredDate || stay.transferOutDate);
      const startDate = new Date(stay.admissionDate);
      return sum + (endDate - startDate) / (1000 * 60 * 60 * 24);
    }, 0);

    return totalDays / completedStays.length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Historical Statistics</h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Occupancy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historicalStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="occupancy" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Admissions vs Discharges</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={historicalStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="admissions" fill="#2563eb" />
                <Bar dataKey="discharges" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Average Stay Duration</p>
                <p className="text-2xl font-bold">
                  {trends.averageStayDuration.toFixed(1)} days
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Mortality Rate</p>
                <p className="text-2xl font-bold">
                  {trends.mortalityRate.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Average Occupancy</p>
                <p className="text-2xl font-bold">
                  {trends.occupancyRate.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Busiest Day</p>
                <p className="text-2xl font-bold">{trends.busiestDay}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WardStatisticsHistory;