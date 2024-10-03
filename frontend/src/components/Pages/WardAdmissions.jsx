
import React from 'react';
import { useParams } from 'react-router-dom';
import useAdmissionData from '@/contexts/useAdmissionData';

function WardAdmissions() {
  const { wardType } = useParams();
  const { admissionData, loading, error } = useAdmissionData();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


// this can help with calculations
  const wardCounts = admissionData.reduce((acc, admission) => {
    const ward = admission.ward || 'Undefined';
    acc[ward] = (acc[ward] || 0) + 1;
    return acc;
  }, {});

  

  const filteredAdmissions = admissionData.filter(admission => {
    const admissionWard = admission.ward || 'Undefined';
   
    return admissionWard === wardType;
  });

 

  const renderDebugInfo = () => (
    <div className="bg-gray-100 p-4 mb-4 rounded">
      <h3 className="font-bold">Debug Information</h3>
      <p>Current ward type: {wardType}</p>
      <p>Total admissions: {admissionData.length}</p>
      <p>Admissions per ward:</p>
      <ul>
        {Object.entries(wardCounts).map(([ward, count]) => (
          <li key={ward}>{ward}: {count}</li>
        ))}
      </ul>
    </div>
  );

  if (filteredAdmissions.length === 0) {
    return (
      <div>
        {renderDebugInfo()}
        <p>No admissions found for {wardType} ward.</p>
      </div>
    );
  }

  return (
    <div>
      {renderDebugInfo()}
      <h2>{wardType} Admissions</h2>
      <p>Total admissions for this ward: {filteredAdmissions.length}</p>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Status</th>
            <th>Ward</th>
            <th>Admission Date</th>
            <th>Discharge Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmissions.map((admission) => (
            <tr key={admission._id}>
              <td>{admission.patientName}</td>
              <td>{admission.Age}</td>
              <td>{admission.status}</td>
              <td>{admission.ward || 'Undefined'}</td>
              <td>{new Date(admission.admissionDate).toLocaleDateString()}</td>
              <td>{admission.dischargeDate ? new Date(admission.dischargeDate).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WardAdmissions;

