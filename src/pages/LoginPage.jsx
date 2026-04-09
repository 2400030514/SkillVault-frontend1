import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = ({ setView }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await login(username, password);

  if (result.success) {
    alert("Login Successful!");
    navigate("/dashboard");
  } else if (result.reason === "inactive") {
    navigate("/account-locked");
  } else {
    alert("Invalid credentials");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-black">
      {/* Glassmorphism Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md backdrop-blur-lg bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl p-8 shadow-2xl"
      >
        {/* Header with Lock Icon */}
        <div className="flex items-center justify-center mb-8">
          <svg
            className="w-6 h-6 text-purple-400 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a2 2 0 00-2-2H8a2 2 0 00-2 2v4m4-6h.01M8 20h8"
            />
          </svg>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
        </div>

        {/* Username Input with Envelope Icon */}
        <div className="mb-5">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Password Input with Lock Icon */}
        <div className="mb-5">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a2 2 0 00-2-2H8a2 2 0 00-2 2v4m4-6h.01"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            className="w-4 h-4 accent-purple-400 cursor-pointer"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-300 cursor-pointer">
            Remember me
          </label>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105 mb-4"
        >
          Sign In
        </button>

        {/* Footer Links */}
        <div className="flex items-center justify-center text-sm text-gray-300">
          <span>Don't have an account?</span>
          <button
            type="button"
            onClick={() => setView('signup')}
            className="ml-1 text-purple-400 hover:text-pink-400 font-semibold transition"
          >
            Create one
          </button>
        </div>
        <div className="text-center mt-3">
          <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition">
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;