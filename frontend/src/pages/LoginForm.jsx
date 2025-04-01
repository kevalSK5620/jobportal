import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "../pages/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if(!email) {
      setError('Email is required');
      return;
    }

    if(!password) {
      setError('Password is required');
      return;
    }

    try{
      const response = await axios.post('http://localhost:3000/user/login', {email, password});

      if (response.data.error === false) {
        alert(response.data.message);
        navigate('/');
      }else{
        setError(response.data.message);
      }
    }catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Login</h2>
        <p className="text-sm text-gray-500 text-center mb-6">to get started</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="user@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border rounded-md text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-500"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="ForgotPassword" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Continue
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          New User? <a href="/signup" className="font-semibold text-gray-900">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
