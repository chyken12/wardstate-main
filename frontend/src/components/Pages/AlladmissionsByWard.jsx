import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import useAdmissionData from '@/contexts/useAdmissionData';

const WardAdmissions = () => {
  const [ward, setWard] = useState('Ward A');
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 


  useEffect(() => {
    const fetchAdmissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8000/api/admissionbyward/${ward}`);
        setAdmissions(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, [ward]);

 
   

            
  


  return (
    <Card className="w-full max-w-4xl mx-auto p-4">
      <CardHeader>
        <CardTitle>Admissions for {ward}</CardTitle>
        <Select value={ward} onValueChange={(value) => setWard(value)}>
          <SelectTrigger id="ward">
            <SelectValue placeholder="Select Ward" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="Male Medical">Male Medical</SelectItem>
          <SelectItem value="Female Medical">Male Medical</SelectItem>
          <SelectItem value="Male Surgical">Male Medical</SelectItem>
          <SelectItem value="Female  Surgical">Male Medical</SelectItem>
          <SelectItem value="MICU">Male Medical</SelectItem>
          <SelectItem value="Maternity">Male Medical</SelectItem>
          <SelectItem value="KIds Ward">Male Medical</SelectItem>
          </SelectContent>
          
        </Select>
      </CardHeader>
      <CardContent>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Patient ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Age</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Admission Date</th>
                <th className="border p-2">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((admission) => (
                <tr key={admission.patientId}>
                  <td className="border p-2">{admission.patientId}</td>
                  <td className="border p-2">{admission.patientName}</td>
                  <td className="border p-2">{admission.Age}</td>
                  <td className="border p-2">{admission.gender}</td>
                  <td className="border p-2">{new Date(admission.admissionDate).toLocaleDateString()}</td>
                  <td className="border p-2">{admission.admissionOutcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
};

export default WardAdmissions;
