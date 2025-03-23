"use client";
import React, { useState } from "react";
import {
  Building,
  Mail,
  Globe,
  MapPin,
  Briefcase,
  User,
  FileText,
  CheckCircle,
  Lock,
  AlertCircle,
  Tag,
} from "lucide-react";

const RecruiterSignupForm = () => {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: "",
    gstNo: "",
    website: "",
    companyType: "",
    employeeId: "",
    employeeName: "",
    employeePosition: "",
    companyAddress: "",
    email: "",
    password: "",
  });

  const addRecruiter = () => {
    return {
      id: Date.now(),
      company_name: formData.companyName,
      gst_no: formData.gstNo,
      website: formData.website,
      type: formData.companyType,
      emp_id: formData.employeeId,
      emp_name: formData.employeeName,
      emp_position: formData.employeePosition,
      comp_address: formData.companyAddress,
      email: formData.email,
      password: formData.password,
    };
  };

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validationPatterns = {
    companyName: /^[a-zA-Z0-9\s&.,'-]{2,100}$/,
    gstNo: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, // Indian GST format
    // website: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([\/\w-]*)*\/?$/,
    companyType: /.+/,
    employeeId: /^[a-zA-Z0-9-]{2,20}$/,
    employeeName: /^[a-zA-Z\s.]{2,50}$/,
    employeePosition: /^[a-zA-Z\s.&,'-]{2,50}$/,
    companyAddress: /^[a-zA-Z0-9\s,.'()-]{5,200}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^[0-9]{4}$/,
  };

  const errorMessages = {
    companyName: "Please enter a valid company name (2-100 characters)",
    gstNo: "Please enter a valid GST number (15 characters)",
    website: "Please enter a valid website URL",
    companyType: "Please select a company type",
    employeeId:
      "Please enter a valid employee ID (2-20 alphanumeric characters)",
    employeeName: "Please enter a valid name (2-50 characters, letters only)",
    employeePosition: "Please enter a valid job position (2-50 characters)",
    companyAddress: "Please enter a valid address (5-200 characters)",
    email: "Please enter a valid email address",
    password: "Please enter a valid 4-digit pin",
  };

  const validateField = (field, value) => {
    if (field === "companyType") {
      return value ? "" : errorMessages[field];
    }

    const pattern = validationPatterns[field];
    return pattern ? (pattern.test(value) ? "" : errorMessages[field]) : "";
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

  const checkStepValidity = () => {
    let isValid = true;
    let newErrors = { ...errors };

    if (formStep === 0) {
      if (!validationPatterns.companyName.test(formData.companyName)) {
        newErrors.companyName = errorMessages.companyName;
        isValid = false;
      }
      if (!validationPatterns.gstNo.test(formData.gstNo)) {
        newErrors.gstNo = errorMessages.gstNo;
        isValid = false;
      }
      if (formData.website === "") {
        newErrors.website = errorMessages.website;
        isValid = false;
      }
      if (!formData.companyType) {
        newErrors.companyType = errorMessages.companyType;
        isValid = false;
      }
    } else if (formStep === 1) {
      if (!validationPatterns.employeeId.test(formData.employeeId)) {
        newErrors.employeeId = errorMessages.employeeId;
        isValid = false;
      }
      if (!validationPatterns.employeeName.test(formData.employeeName)) {
        newErrors.employeeName = errorMessages.employeeName;
        isValid = false;
      }
      if (
        !validationPatterns.employeePosition.test(formData.employeePosition)
      ) {
        newErrors.employeePosition = errorMessages.employeePosition;
        isValid = false;
      }
    } else if (formStep === 2) {
      if (!validationPatterns.companyAddress.test(formData.companyAddress)) {
        newErrors.companyAddress = errorMessages.companyAddress;
        isValid = false;
      }
      if (!validationPatterns.email.test(formData.email)) {
        newErrors.email = errorMessages.email;
        isValid = false;
      }
      if (!validationPatterns.password.test(formData.password)) {
        newErrors.password = errorMessages.password;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (checkStepValidity()) {
      setFormStep(formStep + 1);
    } else {
      const currentStepFields = getFieldsForStep(formStep);
      const newTouched = { ...touched };
      currentStepFields.forEach((field) => {
        newTouched[field] = true;
      });
      setTouched(newTouched);
    }
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const getFieldsForStep = (step) => {
    if (step === 0) return ["companyName", "gstNo", "website", "companyType"];
    if (step === 1) return ["employeeId", "employeeName", "employeePosition"];
    if (step === 2) return ["companyAddress", "email", "password"];
    return [];
  };

  const formSteps = [
    <div key="company" className="space-y-4">
      <h2 className="text-xl font-bold text-white">Company Information</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Company Name *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.companyName && touched.companyName
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <Building className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => updateFormData("companyName", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="ABC Technologies Pvt. Ltd."
            required
          />
        </div>
        {errors.companyName && touched.companyName && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.companyName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          GST Number *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.gstNo && touched.gstNo ? "border-red-500" : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <FileText className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={formData.gstNo}
            onChange={(e) => updateFormData("gstNo", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="22AAAAA0000A1Z5"
            required
          />
        </div>
        {errors.gstNo && touched.gstNo && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.gstNo}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Company Website *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.website && touched.website
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <Globe className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={formData.website}
            onChange={(e) => updateFormData("website", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="https://www.company.com"
            required
          />
        </div>
        {errors.website && touched.website && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.website}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Company Type *
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            "IT/Software",
            "Manufacturing",
            "Services",
            "Education",
            "Healthcare",
            "Other",
          ].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateFormData("companyType", option)}
              className={`rounded-md px-3 py-2 text-sm ${
                formData.companyType === option
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.companyType && touched.companyType && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.companyType}
          </p>
        )}
      </div>
    </div>,

    <div key="employee" className="space-y-4">
      <h2 className="text-xl font-bold text-white">Employee Information</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Employee ID *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.employeeId && touched.employeeId
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <Tag className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={formData.employeeId}
            onChange={(e) => updateFormData("employeeId", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="EMP12345"
            required
          />
        </div>
        {errors.employeeId && touched.employeeId && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.employeeId}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Employee Name *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.employeeName && touched.employeeName
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <User className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={formData.employeeName}
            onChange={(e) => updateFormData("employeeName", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="John Doe"
            required
          />
        </div>
        {errors.employeeName && touched.employeeName && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.employeeName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Employee Position *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.employeePosition && touched.employeePosition
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={formData.employeePosition}
            onChange={(e) => updateFormData("employeePosition", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="HR Manager"
            required
          />
        </div>
        {errors.employeePosition && touched.employeePosition && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.employeePosition}
          </p>
        )}
      </div>
    </div>,

    <div key="contact" className="space-y-4">
      <h2 className="text-xl font-bold text-white">Contact Information</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Company Address *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.companyAddress && touched.companyAddress
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <MapPin className="mr-2 h-4 w-4 text-gray-400" />
          <textarea
            value={formData.companyAddress}
            onChange={(e) => updateFormData("companyAddress", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="123 Business Park, Tech Hub, Mumbai, 400001"
            required
            rows={3}
          />
        </div>
        {errors.companyAddress && touched.companyAddress && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.companyAddress}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Email Address *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.email && touched.email ? "border-red-500" : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <Mail className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="recruiter@company.com"
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
          4-Digit PIN *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.password && touched.password
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <Lock className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="1234"
            required
            maxLength={4}
          />
        </div>
        {errors.password && touched.password && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.password}
          </p>
        )}
      </div>
    </div>,
    <div key="review" className="space-y-4">
      <h2 className="text-xl font-bold text-white">Review Your Information</h2>
      <div className="rounded-lg bg-gray-800 p-4 text-white">
        <h3 className="font-medium text-blue-400">Company Details</h3>
        <p className="mt-1">
          <span className="font-medium">Company Name:</span>{" "}
          {formData.companyName}
        </p>
        <p className="mt-1">
          <span className="font-medium">GST Number:</span> {formData.gstNo}
        </p>
        <p className="mt-1">
          <span className="font-medium">Website:</span> {formData.website}
        </p>
        <p className="mt-1">
          <span className="font-medium">Company Type:</span>{" "}
          {formData.companyType}
        </p>

        <h3 className="mt-4 font-medium text-blue-400">Employee Details</h3>
        <p className="mt-1">
          <span className="font-medium">Employee ID:</span>{" "}
          {formData.employeeId}
        </p>
        <p className="mt-1">
          <span className="font-medium">Employee Name:</span>{" "}
          {formData.employeeName}
        </p>
        <p className="mt-1">
          <span className="font-medium">Position:</span>{" "}
          {formData.employeePosition}
        </p>

        <h3 className="mt-4 font-medium text-blue-400">Contact Information</h3>
        <p className="mt-1">
          <span className="font-medium">Company Address:</span>{" "}
          {formData.companyAddress}
        </p>
        <p className="mt-1">
          <span className="font-medium">Email:</span> {formData.email}
        </p>
      </div>
    </div>,
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://wehack-backend.vercel.app/api/signupRec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
          body: JSON.stringify(addRecruiter()),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add recruiter");
      }

      const data = await response.json();
      console.log("Recruiter added successfully:", data);
      window.location.href="/"

      if (formStep === formSteps.length - 1) {
        console.log("Form submitted:", addRecruiter());
      }
    } catch (error) {
      console.error("Error adding recruiter:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black py-12 px-4">
      <div className="w-full max-w-md rounded-xl bg-gray-900 p-6 shadow-lg border border-gray-700">
        <div className="mb-8 flex items-center justify-center relative">
          <div className="relative h-32 w-32 z-10">
            <div
              className={`absolute left-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-500 ease-in-out transform ${
                formStep === 0
                  ? "translate-y-0"
                  : formStep === 1
                  ? "translate-y-0 rotate-12"
                  : formStep === 2
                  ? "translate-y-0 rotate-24"
                  : "translate-y-0 rotate-45"
              }`}
            >
              <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-white rounded-full overflow-hidden">
                <img src="/manager.jpg" alt="" />
              </div>
            </div>
          </div>

          <div className="mt-4 ml-4 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skill-Hire
            </h2>
            <p className="text-gray-400 mt-1 italic">Recruit. Grow. Excel.</p>
          </div>

          <div className="absolute -right-4 flex flex-col gap-2 z-0">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-8 w-8 rounded-full border-2 transition-colors ${
                  step === formStep
                    ? "bg-blue-600 border-blue-400"
                    : step < formStep
                    ? "bg-green-600 border-green-400"
                    : "bg-gray-700 border-gray-600"
                } flex items-center justify-center text-xs font-bold text-white`}
              >
                {step < formStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  step + 1
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative z-20">
          <div className="min-h-64">{formSteps[formStep]}</div>

          <div className="mt-8 flex justify-between">
            {formStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="rounded-md bg-gray-700 px-4 py-2 text-gray-200 hover:bg-gray-600 transition"
              >
                Back
              </button>
            )}

            {formStep < formSteps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className={`ml-auto rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-500 transition"
              >
                Create Account
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterSignupForm;
