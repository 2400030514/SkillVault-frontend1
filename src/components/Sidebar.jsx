import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// small SVG icons used in the sidebar
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l9-9 9 9v9a3 3 0 01-3 3H6a3 3 0 01-3-3v-9z"
    />
  </svg>
);
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a4 4 0 00-4-4h-1m-4 6v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2h16z"
    />
  </svg>
);
const CertificateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m1-5H4a2 2 0 00-2 2v14l4-4h12a2 2 0 002-2V7a2 2 0 00-2-2z"
    />
  </svg>
);
const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);
const CogIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.588 1.003c.87-.49 1.974.2 1.974 1.158v2.02a1.724 1.724 0 001.003 1.588c.921.3.921 1.603 0 1.902a1.724 1.724 0 00-1.003 1.588v2.02c0 .958-1.104 1.648-1.974 1.158a1.724 1.724 0 00-2.588 1.003c-.299.921-1.602.921-1.902 0a1.724 1.724 0 00-2.588-1.003c-.87.49-1.974-.2-1.974-1.158v-2.02a1.724 1.724 0 00-1.003-1.588c-.921-.3-.921-1.603 0-1.902a1.724 1.724 0 001.003-1.588v-2.02c0-.958 1.104-1.648 1.974-1.158a1.724 1.724 0 002.588-1.003z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 17a1 1 0 001-1v-4a1 1 0 10-2 0v4a1 1 0 001 1zm6-4a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm-12 2a1 1 0 011-1h3a1 1 0 110 2H6a1 1 0 01-1-1z"
    />
  </svg>
);
const DocumentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 8h10M7 12h8m-8 4h6m2 4H5a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v13a2 2 0 01-2 2z"
    />
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);
const UserCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.647 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
    />
  </svg>
);
const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 5v6c0 5 3.7 9.7 9 11 5.3-1.3 9-6 9-11V5l-9-3z" fill="#7C3AED" />
    <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" fill="#C7B2FF" opacity="0.12"/>
  </svg>
);

const Sidebar = () => {
  const { logout, role: ctxRole, user } = useContext(AuthContext);
  const role = user?.role || ctxRole;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const adminLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    { to: '/user-management', label: 'User Management', icon: <UsersIcon /> },
    { to: '/certificate-management', label: 'Certificate Management', icon: <CertificateIcon /> },
    { to: '/notifications', label: 'Send Notifications', icon: <BellIcon /> },
    { to: '/system-config', label: 'System Config', icon: <CogIcon /> },
    { to: '/analytics', label: 'Analytics', icon: <ChartIcon /> },
    { to: '/reports', label: 'Reports', icon: <DocumentIcon /> }
  ];

  const userLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    { to: '/my-certifications', label: 'My Certifications', icon: <CertificateIcon /> },
    { to: '/notifications', label: 'Notifications', icon: <BellIcon /> },
    { to: '/add-certification', label: 'Add Certification', icon: <PlusIcon /> },
    { to: '/profile', label: 'Profile', icon: <UserCircleIcon /> }
  ];

  const links = role === 'ROLE_ADMIN' ? adminLinks : userLinks;

  return (
    <aside className="w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white h-screen p-6 flex flex-col shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-white/5 rounded-lg">
          <ShieldIcon />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
            CertVault
          </h1>
          <p className="text-xs text-gray-400">Secure Certification Manager</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-150 hover:bg-white/5 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-[0_0_10px_rgba(128,0,255,0.7)]'
                  : 'text-gray-200'
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto py-2 px-4 backdrop-blur-md bg-red-600 bg-opacity-20 border border-red-500/30 rounded text-white font-semibold hover:bg-opacity-30 transition shadow-[0_0_8px_rgba(255,0,0,0.5)]"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;