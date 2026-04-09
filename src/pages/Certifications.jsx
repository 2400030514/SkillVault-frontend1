import React from 'react';
import { calculateStatus } from '../utils/dateUtils';
import api from "../pages/api";


// utility to download CSV
const exportToCsv = (filename, rows) => {
  const csvContent = rows.map(e => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Certifications = ({ certifications }) => {
  const handleExport = () => {
    if (!certifications || certifications.length === 0) return;
    const rows = [];
    // headers
    rows.push(['Certification Name','Issuer','Issue Date','Expiry Date','Status','Generated On']);
    const today = new Date().toISOString().split('T')[0];
    certifications.forEach(cert => {
      const status = calculateStatus(cert.expiryDate);
      rows.push([cert.name, cert.issuer, cert.issueDate, cert.expiryDate, status, today]);
    });
    const filename = `My_Certifications_${today}.csv`;
    exportToCsv(filename, rows);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent drop-shadow-lg">Certifications</h1>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-white rounded-lg shadow-[0_0_12px_rgba(0,255,255,0.7)] hover:shadow-[0_0_16px_rgba(0,255,255,0.9)] hover:opacity-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Data
        </button>
      </div>
      <div className="overflow-x-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">Name</th>
              <th className="px-6 py-3 text-left bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">Issuer</th>
              <th className="px-6 py-3 text-left bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">Issue Date</th>
              <th className="px-6 py-3 text-left bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">Expiry Date</th>
              <th className="px-6 py-3 text-left bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">Status</th>
            </tr>
          </thead>
          <tbody>
            {certifications.map(cert => {
              const status = calculateStatus(cert.expiryDate);
              let badgeClasses = 'inline-block text-sm px-2 py-1 rounded-full';
              if (status === 'Expired') badgeClasses += ' bg-red-600 text-white shadow-[0_0_8px_rgba(255,0,0,0.7)]';
              else if (status === 'Expiring Soon') badgeClasses += ' bg-yellow-500 text-black shadow-[0_0_8px_rgba(255,165,0,0.7)]';
              else badgeClasses += ' bg-cyan-500 text-black shadow-[0_0_8px_rgba(0,255,255,0.7)]';

              return (
                <tr key={cert.id} className="border-t border-gray-700">
                  <td className="px-6 py-2">{cert.name}</td>
                  <td className="px-6 py-2">{cert.issuer}</td>
                  <td className="px-6 py-2">{cert.issueDate}</td>
                  <td className="px-6 py-2">{cert.expiryDate}</td>
                  <td className="px-6 py-2">
                    <span className={badgeClasses}>{status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Certifications;