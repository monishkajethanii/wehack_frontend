"use client";
import React, { useState } from "react";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

const StudentLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    pin: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validationPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pin: /^[0-9]{4}$/,
  };

  const errorMessages = {
    email: "Please enter a valid email address",
    pin: "Please enter a valid 4-digit PIN",
  };

  const validateField = (field, value) => {
    const pattern = validationPatterns[field];
    return pattern.test(value) ? "" : errorMessages[field];
  };

  const updateFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setTouched({
      ...touched,
      [field]: true,
    });

    const errorMessage = validateField(field, value);
    setErrors({
      ...errors,
      [field]: errorMessage,
    });
  };

  const checkFormValidity = () => {
    let isValid = true;
    let newErrors = { ...errors };

    if (!validationPatterns.email.test(formData.email)) {
      newErrors.email = errorMessages.email;
      isValid = false;
    }

    if (!validationPatterns.pin.test(formData.pin)) {
      newErrors.pin = errorMessages.pin;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkFormValidity()) {
      // Handle login logic here
      console.log("Login attempted with:", formData);
      // You would typically send this data to your server for authentication
    } else {
      // Mark all fields as touched to show validation errors
      setTouched({
        email: true,
        pin: true,
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black py-12 px-4">
      <div className="w-full max-w-md rounded-xl bg-gray-900 p-6 shadow-lg border border-gray-700">
        <div className="mb-8 flex items-center justify-center">
          <div className="relative h-32 w-32">
            <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-white rounded-full overflow-hidden">
                <img
                  src="/avatar.png"
                  width={125}
                  height={100}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 ml-4 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skill-Hire
            </h2>
            <p className="text-gray-400 mt-1 italic">
              Connect. Learn. Succeed.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Email Address
            </label>
            <div
              className={`flex items-center rounded-md border ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-600"
              } px-3 py-2 bg-gray-800`}
            >
              <Mail className="mr-2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
                placeholder="john.doe@example.com"
                required
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              4-Digit PIN
            </label>
            <div
              className={`flex items-center rounded-md border ${
                errors.pin && touched.pin ? "border-red-500" : "border-gray-600"
              } px-3 py-2 bg-gray-800`}
            >
              <Lock className="mr-2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                value={formData.pin}
                onChange={(e) => updateFormData("pin", e.target.value)}
                className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
                placeholder="Enter your 4-digit PIN"
                required
                maxLength={4}
              />
            </div>
            {errors.pin && touched.pin && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" /> {errors.pin}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="flex w-full justify-center items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition"
          >
            <a href="/dashboard">
              <LogIn className="mr-2 h-4 w-4" />
              Log in
            </a>
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-400 hover:text-blue-300">
                Sign up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLoginPage;
