import React from 'react';
import { useParams } from 'react-router-dom';
import WardAdmissions from './WardAdmissions';

function WardPage() {
  const { wardType } = useParams(); // Get the ward type from the URL

  return (
    <div>
      <WardAdmissions wardType={wardType} />
    </div>
  );
}

export default WardPage;
