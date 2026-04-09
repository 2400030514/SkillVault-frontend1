import React from 'react';
import Certifications from './Certifications';

const MyCertifications = ({ certifications }) => (   // ✅ receive props
  <div>
    <h1 className="text-3xl font-bold ...">My Certifications</h1>
    <div className="mt-4">
      <Certifications certifications={certifications} />
    </div>
  </div>
);

export default MyCertifications;