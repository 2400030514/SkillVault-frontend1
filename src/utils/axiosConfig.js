import axios from "axios";

const api = axios.create({
  baseURL: "https://skillvault-backend1-production.up.railway.app/api",
});

// ✅ FIX: Don't send token for auth APIs
api.interceptors.request.use((config) => {
 
  const token = localStorage.getItem("token");

  // 🚨 Skip token for login/register
  if (
    token &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Content-Type"] = "application/json";

  return config;
});

export default api;
