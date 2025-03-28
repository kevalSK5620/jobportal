import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "../pages/Login.css";


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
