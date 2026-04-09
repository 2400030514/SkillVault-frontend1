import React, { useContext, useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { AuthContext } from '../context/AuthContext';
import { calculateStatus } from '../utils/dateUtils';
import api from "../pages/api";

const ChartPlaceholder = ({ title }) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-lg w-full h-72 flex items-center justify-center">
    <div className="text-center text-gray-300">
      <div className="font-semibold mb-2">{title}</div>
      <div className="text-sm">(Chart placeholder)</div>
    </div>
  </div>
);

const AdminDashboard = ({ certifications = [] }) => {
  const { users = [] } = useContext(AuthContext);

  // ✅ NEW: local state for certifications
  const [certData, setCertData] = useState(certifications);

  // ✅ NEW: fetch all certifications for admin
  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const response = await api.get("/api/certifications/all");
        setCertData(response.data);
      } catch (err) {
        console.error("Error fetching certs:", err);
      }
    };

    fetchCerts();
  }, []);

  const totalUsers = users.length;

  // ✅ UPDATED: use certData instead of props
  const totalCerts = certData.length;

  const activeUsers = users.filter(u => u.active !== false).length;

  let expiring = 0;
  let expired = 0;

  // ✅ UPDATED: use certData here also
  certData.forEach(c => {
    const status = calculateStatus(c.expiryDate);
    if (status === 'Expiring Soon') expiring += 1;
    if (status === 'Expired') expired += 1;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard title="Total Users" value={totalUsers} color="blue" />
        <StatCard title="Total Certs" value={totalCerts} color="green" />
        <StatCard title="Active Users" value={activeUsers} color="green" />
        <StatCard title="Expiring Soon" value={expiring} color="yellow" />
        <StatCard title="Expired" value={expired} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Certificate Status" />
        <ChartPlaceholder title="User Growth" />
      </div>
    </div>
  );
};

export default AdminDashboard;