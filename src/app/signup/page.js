"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  BookOpen,
  MapPin,
  Calendar,
  Code,
  CheckCircle,
  AlertCircle,
  Upload,
  Lock,
} from "lucide-react";

const StudentSignupForm = () => {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    education: {
      college: "",
      graduationYear: "",
    },
    gender: "",
    skills: "",
    resume: null,
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [resumeFileName, setResumeFileName] = useState("");
  const [message , setMessage ] = useState()

  const validationPatterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    password: /^[0-9]{4}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    college: /^[a-zA-Z0-9\s,'.()-]{2,100}$/,
    graduationYear: /^(20\d{2})$/,
    skills: /^[a-zA-Z0-9\s,#+.-]{2,200}$/,
    location: /^[a-zA-Z0-9\s,'.()-]{2,100}$/,
  };

  const errorMessages = {
    name: "Please enter a valid name (2-50 characters, letters only)",
    password: "Please enter a valid 4-digit PIN",
    email: "Please enter a valid email address",
    gender: "Please select a gender",
    college: "Please enter a valid college/university name",
    graduationYear: "Please enter a valid graduation year (2000-2099)",
    skills: "Please enter valid skills (comma separated)",
    resume: "Please upload your resume (PDF only)",
    location: "Please enter a valid location",
  };

  const validateField = (field, value) => {
    if (field === "gender") {
      return value ? "" : errorMessages[field];
    }

    if (field === "resume") {
      return value ? "" : errorMessages[field];
    }

    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      const pattern = validationPatterns[child];
      return pattern.test(value) ? "" : errorMessages[child];
    } else {
      const pattern = validationPatterns[field];
      return pattern ? (pattern.test(value) ? "" : errorMessages[field]) : "";
    }
  };

  const updateFormData = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }

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

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is a PDF
      if (file.type === "application/pdf") {
        setFormData({
          ...formData,
          resume: file,
        });
        setResumeFileName(file.name);
        setErrors({
          ...errors,
          resume: "",
        });
      } else {
        setErrors({
          ...errors,
          resume: "Please upload a PDF file only",
        });
      }
    }
    setTouched({
      ...touched,
      resume: true,
    });
  };

  const checkStepValidity = () => {
    let isValid = true;
    let newErrors = { ...errors };

    if (formStep === 0) {
      if (!validationPatterns.name.test(formData.name)) {
        newErrors.name = errorMessages.name;
        isValid = false;
      }
      if (!validationPatterns.password.test(formData.password)) {
        newErrors.password = errorMessages.password;
        isValid = false;
      }
      if (!validationPatterns.email.test(formData.email)) {
        newErrors.email = errorMessages.email;
        isValid = false;
      }
      if (!formData.gender) {
        newErrors.gender = errorMessages.gender;
        isValid = false;
      }
    } else if (formStep === 1) {
      if (!validationPatterns.college.test(formData.education.college)) {
        newErrors["education.college"] = errorMessages.college;
        isValid = false;
      }
      if (
        !validationPatterns.graduationYear.test(
          formData.education.graduationYear
        )
      ) {
        newErrors["education.graduationYear"] = errorMessages.graduationYear;
        isValid = false;
      }
    } else if (formStep === 2) {
      if (!validationPatterns.skills.test(formData.skills)) {
        newErrors.skills = errorMessages.skills;
        isValid = false;
      }
      if (!formData.resume) {
        newErrors.resume = errorMessages.resume;
        isValid = false;
      }
      if (!validationPatterns.location.test(formData.location)) {
        newErrors.location = errorMessages.location;
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
    if (step === 0) return ["name", "email", "gender", "password"];
    if (step === 1) return ["education.college", "education.graduationYear"];
    if (step === 2) return ["skills", "resume", "location"];
    return [];
  };

  const formSteps = [
    <div key="basic" className="space-y-4">
      <h2 className="text-xl font-bold text-white">Basic Information</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Full Name *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.name && touched.name ? "border-red-500" : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <User className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="John Doe"
            required
          />
        </div>
        {errors.name && touched.name && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.name}
          </p>
        )}
      </div>

      {/* 4-digit PIN */}
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
        <label className="block text-sm font-medium text-white">Gender *</label>
        <div className="grid grid-cols-3 gap-2">
          {["Male", "Female", "Other"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateFormData("gender", option)}
              className={`rounded-md px-3 py-2 text-sm ${
                formData.gender === option
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.gender && touched.gender && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.gender}
          </p>
        )}
      </div>
      <div className="text-center mt-4">
        <span className="text-gray-400 text-sm">
          Want to register as recruiter?{" "}
          <a href="/recruitersignup" className="text-blue-400 hover:text-blue-300">
            Sign up
          </a>
        </span>
      </div>
    </div>,
    <div key="education" className="space-y-4">
      <h2 className="text-xl font-bold text-white">Education</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          College/University *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors["education.college"] && touched["education.college"]
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <BookOpen className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={formData.education.college}
            onChange={(e) =>
              updateFormData("education.college", e.target.value)
            }
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="University of Example"
            required
          />
        </div>
        {errors["education.college"] && touched["education.college"] && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />{" "}
            {errors["education.college"]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Graduation Year *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors["education.graduationYear"] &&
            touched["education.graduationYear"]
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="number"
            min="2000"
            max="2099"
            value={formData.education.graduationYear}
            onChange={(e) =>
              updateFormData("education.graduationYear", e.target.value)
            }
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="2025"
            required
          />
        </div>
        {errors["education.graduationYear"] &&
          touched["education.graduationYear"] && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />{" "}
              {errors["education.graduationYear"]}
            </p>
          )}
      </div>
    </div>,

    <div key="additional" className="space-y-4">
      <h2 className="text-xl font-bold text-white">Additional Information</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Skills (comma separated) *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.skills && touched.skills
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <Code className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => updateFormData("skills", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="JavaScript, React, Python"
            required
          />
        </div>
        {errors.skills && touched.skills && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.skills}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Resume (PDF) *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.resume && touched.resume
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <Upload className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeChange}
            className="hidden"
            id="resume-upload"
            required
          />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span className={resumeFileName ? "text-white" : "text-gray-400"}>
              {resumeFileName || "Upload your resume (PDF only)"}
            </span>
          </label>
          <button
            type="button"
            onClick={() => document.getElementById("resume-upload").click()}
            className="ml-2 rounded bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600"
          >
            Browse
          </button>
        </div>
        {errors.resume && touched.resume && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.resume}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Location *
        </label>
        <div
          className={`flex items-center rounded-md border ${
            errors.location && touched.location
              ? "border-red-500"
              : "border-gray-600"
          } px-3 py-2 bg-gray-800`}
        >
          <MapPin className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            className="w-full border-0 bg-transparent p-0 focus:outline-none text-white"
            placeholder="Mumbai, India"
            required
          />
        </div>
        {errors.location && touched.location && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.location}
          </p>
        )}
      </div>
    </div>,

    <div key="review" className="space-y-4">
      <h2 className="text-xl font-bold text-white">Review Your Information</h2>
      <div className="rounded-lg bg-gray-800 p-4 text-white">
        <h3 className="font-medium text-blue-400">Personal Details</h3>
        <p className="mt-1">
          <span className="font-medium">Name:</span> {formData.name}
        </p>
        <p className="mt-1">
          <span className="font-medium">Email:</span> {formData.email}
        </p>
        <p className="mt-1">
          <span className="font-medium">Gender:</span> {formData.gender}
        </p>

        <h3 className="mt-4 font-medium text-blue-400">Education</h3>
        <p className="mt-1">
          <span className="font-medium">College/University:</span>{" "}
          {formData.education.college}
        </p>
        <p className="mt-1">
          <span className="font-medium">Graduation Year:</span>{" "}
          {formData.education.graduationYear}
        </p>

        <h3 className="mt-4 font-medium text-blue-400">
          Additional Information
        </h3>
        <p className="mt-1">
          <span className="font-medium">Skills:</span> {formData.skills}
        </p>
        <p className="mt-1">
          <span className="font-medium">Resume:</span>{" "}
          {resumeFileName || "Not uploaded"}
        </p>
        <p className="mt-1">
          <span className="font-medium">Location:</span> {formData.location}
        </p>
      </div>
    </div>,
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formStep === formSteps.length - 1) {
      const formattedData = {
        user_id: formData.email.split("@")[0],
        name: formData.name,
        college_name: formData.education.college,
        grad_year: formData.education.graduationYear,
        gender: formData.gender,
        skills: formData.skills,
        location: formData.location,
        email: formData.email,
        resume: resumeFileName,
        password: formData.password,
      };

      fetch("https://wehack-backend.vercel.app/api/signupUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
        },
        body: JSON.stringify(formattedData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          let newErrors = { ...errors };
          newErrors.server = ""+data.message;
          setErrors(newErrors)
          if(data.message !== "User already Exists!!"){

            localStorage.setItem("loggedin",JSON.stringify(formattedData))
            window.location.href = "/dashboard"
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          let newErrors = { ...errors };
          newErrors.server = ""+error.message;
          setErrors(newErrors)
        });

      console.log("Form submitted with formatted data:", formattedData);
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
                Submit Application
              </button>
            )}
          </div>
        </form>
        {
          errors.server ? 
          <p className="text-red-500 text-sm mt-1 flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" /> {errors.server}
        </p>
        : <></>
        }

      </div>
    </div>
  );
};

export default StudentSignupForm;
