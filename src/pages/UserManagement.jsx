import React, { useEffect, useState } from 'react';
import api from '../utils/axiosConfig';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">User Management</h1>
      <div className="mt-4 space-y-3">
        {users.map(u => (
          <div key={u.id} className="p-4 bg-gray-800 rounded flex justify-between">
            <div>
              <div>{u.name}</div>
              <div className="text-sm text-gray-400">{u.email}</div>
            </div>
            <div>{u.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;