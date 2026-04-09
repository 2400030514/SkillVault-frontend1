import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Certifications from './pages/Certifications';
import AddCertification from './pages/AddCertification';
import MyCertifications from './pages/MyCertifications';
import RenewalTracking from './pages/RenewalTracking';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';
import Notifications from './pages/Notifications';
import SendNotifications from './pages/SendNotifications';
import AccountLocked from './pages/AccountLocked';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { dummyCertifications } from './data/dummyData';
import PageContainer from './components/PageContainer';
import ErrorBoundary from './components/ErrorBoundary';

import api from './utils/axiosConfig';

const App = () => {
  const [certifications, setCertifications] = useState([]);

useEffect(() => {
  const fetchCerts = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      try {
        let response;

        if (role === "ROLE_ADMIN") {
  response = await api.get("/certifications/all");
} else {
  response = await api.get("/certifications");
}

        setCertifications(response.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  fetchCerts();
}, []);

  const handleAdd = async (cert) => {
    try {
      const response = await api.post('/certifications', {
          name: cert.name,
          issuer: cert.issuer,
          issueDate: cert.issueDate,
          expiryDate: cert.expiryDate
      });
      setCertifications(prev => [...prev, response.data]);
    } catch (err) {
      console.error("Error creating certification:", err);
      alert("Failed to save certification. Please try again.");
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<AuthPage initialView="login" />}
          />
          <Route
            path="/signup"
            element={<AuthPage initialView="signup" />}
          />
          <Route path="/account-locked" element={<AccountLocked />} />
          <Route
            path="/*"
            element={<AuthContainer certifications={certifications} onAdd={handleAdd} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// component inside provider so we can safely access context
const AuthContainer = ({ certifications, onAdd }) => {
  const { user, role } = useContext(AuthContext);
  console.log('AuthContainer rendering, user:', user, 'role:', role, 'path:', window.location.pathname);

  // public view
  if (!user) return <AuthPage />;

  const effectiveRole = user?.role || role;

  // admin layout
 if (effectiveRole?.includes("ADMIN")) {
    return (
      <Layout>
        <ErrorBoundary>
        <Routes>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<PageContainer><AdminDashboard certifications={certifications} /></PageContainer>} />
          <Route path="/certifications" element={<PageContainer><Certifications certifications={certifications} /></PageContainer>} />
          <Route path="/user-management" element={<PageContainer><UserManagement /></PageContainer>} />
          <Route path="/manage-certifications" element={<PageContainer><Certifications certifications={certifications} /></PageContainer>} />
          <Route path="/certificate-management" element={<PageContainer><Certifications certifications={certifications} /></PageContainer>} />
          <Route path="/notifications" element={<PageContainer><SendNotifications /></PageContainer>} />
          <Route path="/system-config" element={<PageContainer><div className="card bg-white/5 p-6">System Config (placeholder)</div></PageContainer>} />
          <Route path="/analytics" element={<PageContainer><Analytics certifications={certifications} /></PageContainer>} />
          <Route path="/reports" element={<PageContainer><Reports certifications={certifications} /></PageContainer>} />
          <Route path="/renewal" element={<PageContainer><RenewalTracking certifications={certifications} /></PageContainer>} />
          <Route path="/add-certification" element={<PageContainer><AddCertification onAdd={onAdd} /></PageContainer>} />
          <Route path="/notifications" element={<PageContainer><SendNotifications /></PageContainer>} />
          <Route path="/profile" element={<PageContainer><Settings /></PageContainer>} />
          <Route path="/settings" element={<PageContainer><Settings /></PageContainer>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        </ErrorBoundary>
      </Layout>
    );
  }

  // standard user layout
  return (
    <Layout>
      <ErrorBoundary>
      <Routes>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<PageContainer><UserDashboard certifications={certifications} /></PageContainer>} />
        <Route path="/certifications" element={<PageContainer><Certifications certifications={certifications} /></PageContainer>} />
        <Route path="/my-certifications" element={<PageContainer><Certifications certifications={certifications} /></PageContainer>} />
        <Route path="/add-certification" element={<PageContainer><AddCertification onAdd={onAdd} /></PageContainer>} />
        <Route path="/notifications" element={<PageContainer><Notifications /></PageContainer>} />
        <Route path="/profile" element={<PageContainer><Settings /></PageContainer>} />
        <Route path="/settings" element={<PageContainer><Settings /></PageContainer>} />
        {/* redirect any admin-only urls to dashboard */}
        <Route path="/user-management" element={<Navigate to="/dashboard" replace />} />
        <Route path="/analytics" element={<Navigate to="/dashboard" replace />} />
        <Route path="/reports" element={<Navigate to="/dashboard" replace />} />
        <Route path="/renewal" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      </ErrorBoundary>
    </Layout>
  );
};

export default App;