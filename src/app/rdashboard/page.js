"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  History,
  LogOut,
  Briefcase,
  Bell,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  Clock,
  Menu,
  ChevronDown,
  RefreshCw,
  Loader,
} from "lucide-react";

const RecruiterDashboard = () => {
  const [email, setEmail] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getEmailFromStorage = async () => {
      try {
        const stringifyData = await localStorage.getItem("loggedin");
        if (stringifyData) {
          const rawData = JSON.parse(stringifyData);
          if (rawData?.email) {
            setEmail(rawData.email);
            fetchHistory(rawData.email);
          } else {
            setError("Email not found in local storage");
          }
        } else {
          setError("No logged-in user data found");
        }
      } catch (err) {
        setError("Error accessing local storage");
      }
    };

    getEmailFromStorage();
  }, []);

  const fetchHistory = async (userEmail) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://wehack-backend.vercel.app/getRecHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setHistory(result.data);
      } else {
        setError(result.error || "Failed to fetch recruiter history");
      }
    } catch (err) {
      setError("Something went wrong");
    }
    setLoading(false);
  };
  
  const [internships, setInternships] = useState([]);
  const [activeTab, setActiveTab] = useState("internships");
  const [notificationCount, setNotificationCount] = useState(2);
  const [showAddInternshipForm, setShowAddInternshipForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [domain, setDomain] = useState("Technology");
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    major_skill: "",
    limit: "",
    gender: "any",
    mode: "online",
    status: "1",
    question_type: "mcq",
    q_id: null,
  });
  const [challengeQuestions, setChallengeQuestions] = useState([]);

  useEffect(() => {
    fetch("/mcq.json")
      .then((response) => response.json())
      .then((mcqData) => {
        if (mcqData && mcqData[domain]) {
          setAvailableQuestions(mcqData[domain]);
        }
      })
      .catch((error) => console.error("Error loading MCQ data:", error));
  }, [domain]);

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((challengesData) => {
        if (challengesData && Array.isArray(challengeQuestions)) {
          console.log(challengesData);
          setChallengeQuestions(
            getRandomChallengeQuestions(challengesData.questions)
          );
        }
      })
      .catch((error) => console.error("Error loading MCQ data:", error));
  }, [domain]);

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

  const toggleQuestionSelection = (question) => {
    const isSelected = selectedQuestions.some(
      (q) => q.question === question.question
    );

    if (isSelected) {
      setSelectedQuestions(
        selectedQuestions.filter((q) => q.question !== question.question)
      );
    } else {
      if (selectedQuestions.length < 10) {
        setSelectedQuestions([...selectedQuestions, question]);
      }
    }
  };

  const refreshChallengeQuestions = () => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((challengesData) => {
        if (challengesData && Array.isArray(challengeQuestions)) {
          console.log(challengesData);
          setChallengeQuestions(
            getRandomChallengeQuestions(challengesData.questions)
          );
        }
      })
      .catch((error) => console.error("Error loading MCQ data:", error));
  };

  const handleSaveSelection = () => {
    console.log("Selected domain:", domain);
    console.log("Selected questions:", selectedQuestions);
    // Here you would typically save to state or database
    alert(`Saved ${selectedQuestions.length} questions from ${domain} domain`);
  };

  const getRandomChallengeQuestions = (questionsArray) => {
    const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const recruiterData = {
    name: "Jane Smith",
    company: "TechCorp",
    email: "jane.smith@techcorp.com",
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      question_type: e.target.value,
      q_id: null,
    });
  };

  const handleQuestionSelect = (questionId) => {
    setFormData({
      ...formData,
      q_id: questionId,
    });
  };
  const addOpportunity = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://wehack-backend.vercel.app/api/addopp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth": "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add opportunity");
      }

      const data = await response.json();
      console.log("Opportunity added successfully:", data);

      setFormData({
        title: "",
        desc: "",
        major_skill: "",
        limit: "",
        gender: "any",
        mode: "online",
        status: "1",
        question_type: "mcq",
        q_id: null,
      });

      setShowAddInternshipForm(false);
    } catch (error) {
      console.error("Error adding opportunity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOpportunity();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return <Loader />;
  }

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      setLoadingInternships(true);
      const email = localStorage.getItem("email") || "";

      const response = await fetch(
        "https://wehack-backend.vercel.app/api/getRecHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth": "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch internship history");
      }

      const data = await response.json();
      setInternships(data);
    } catch (error) {
      console.error("Error fetching internship history:", error);
    } finally {
      setLoadingInternships(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-white overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-white font-bold">
              <img src="/manager.jpg" className="rounded-full" alt="Profile" />
            </div>
          </div>
          <div>
            <h2 className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skill-Hire
            </h2>
          </div>
        </div>
        <button onClick={toggleSidebar} className="text-gray-400">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar - for desktop always visible, for mobile conditionally visible */}
      <div
        className={`${
          sidebarOpen
            ? "fixed inset-0 z-50 md:relative md:translate-x-0"
            : "fixed -translate-x-full md:relative md:translate-x-0"
        } 
                      transition-transform duration-300 ease-in-out
                      w-3/4 sm:w-64 bg-gray-900 border-r border-gray-800 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white font-bold">
                <img
                  src="/manager.jpg"
                  className="rounded-full"
                  alt="Profile"
                />
              </div>
            </div>
            <div>
              <h2 className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Skill-Hire
              </h2>
              <p className="text-xs text-gray-400">Recruiter</p>
            </div>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-300" />
            </div>
            <div>
              <h3 className="font-medium">{recruiterData.name}</h3>
              <p className="text-xs text-gray-400">{recruiterData.company}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-2 rounded-md bg-gray-800 text-blue-400"
              >
                <Briefcase className="h-5 w-5" />
                <span>Manage Internships</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800"
                // onClick={() => (window.location = "/rhistory")}
              >
                <History className="h-5 w-5 text-gray-400" />
                <span>History</span>
              </a>
            </li>
            <div className="bg-black text-white min-h-screen flex flex-col p-4">
              {/* <h1 className="text-2xl font-bold mb-4">Recruiter History</h1> */}
              {email ? (
                <p className="mb-4 text-gray-400">
                  Showing history for:{" "}
                  <span className="font-bold">{email}</span>
                </p>
              ) : (
                <p className="text-red-500">{error}</p>
              )}

              {loading && <p className="mt-4">Loading...</p>}

              <div className="mt-6 w-full max-w-6xl overflow-x-auto">
                {history.length > 0 ? (
                  <table className="w-full border border-white">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="p-2 border border-white">Title</th>
                        <th className="p-2 border border-white">Description</th>
                        <th className="p-2 border border-white">Major Skill</th>
                        <th className="p-2 border border-white">Limit</th>
                        <th className="p-2 border border-white">Gender</th>
                        <th className="p-2 border border-white">Status</th>
                        <th className="p-2 border border-white">Mode</th>
                        <th className="p-2 border border-white">Q_ID</th>
                        <th className="p-2 border border-white">
                          Question Type
                        </th>
                        <th className="p-2 border border-white">
                          Recruiter ID
                        </th>
                        <th className="p-2 border border-white">
                          Company Name
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((item, index) => (
                        <tr
                          key={index}
                          className="border border-white text-center"
                        >
                          <td className="p-2 border border-white">
                            {item.title}
                          </td>
                          <td className="p-2 border border-white">
                            {item.desc}
                          </td>
                          <td className="p-2 border border-white">
                            {item.major_skill}
                          </td>
                          <td className="p-2 border border-white">
                            {item.limit}
                          </td>
                          <td className="p-2 border border-white">
                            {item.gender}
                          </td>
                          <td className="p-2 border border-white">
                            {item.status}
                          </td>
                          <td className="p-2 border border-white">
                            {item.mode}
                          </td>
                          <td className="p-2 border border-white">
                            {item.q_id}
                          </td>
                          <td className="p-2 border border-white">
                            {item.question_type}
                          </td>
                          <td className="p-2 border border-white">
                            {item.recruiter_id}
                          </td>
                          <td className="p-2 border border-white">
                            {item.company_name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="mt-4 text-gray-400">No history found.</p>
                )}
              </div>
            </div>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <a
            href="/"
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 text-gray-400"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </a>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="hidden md:flex bg-gray-900 border-b border-gray-800 h-16 items-center justify-between px-6">
          <div className="relative w-96 max-w-full">
            <input
              type="text"
              placeholder="Search internships, applicants..."
              className="w-full bg-gray-800 border-none rounded-md h-10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-400 cursor-pointer" />
              {notificationCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-300" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-900 p-4 md:p-6">
          {/* Search bar for mobile */}
          <div className="md:hidden relative mb-4">
            <input
              type="text"
              placeholder="Search internships, applicants..."
              className="w-full bg-gray-800 border-none rounded-md h-10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <div className="absolute right-3 top-2.5">
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-400 cursor-pointer" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("internships")}
                  className={`py-3 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "internships"
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  My Providance
                </button>
              </div>
              <button
                onClick={() => setShowAddInternshipForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center mb-2 sm:mb-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Opportunity
              </button>
            </div>
          </div>

          {showAddInternshipForm && (
            <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-bold">
                  Create New Opportunity
                </h2>
                <button
                  onClick={() => setShowAddInternshipForm(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Title*
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border-none rounded-md h-10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="E.g., Frontend Developer Intern"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Major Skill*
                    </label>
                    <input
                      type="text"
                      name="major_skill"
                      value={formData.major_skill}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border-none rounded-md h-10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="E.g., React, Node.js, Python"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Applicant Limit*
                    </label>
                    <input
                      type="number"
                      name="limit"
                      value={formData.limit}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full bg-gray-700 border-none rounded-md h-10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Number of interns needed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Gender Preference
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border-none rounded-md h-10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="any">Any</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Location *
                    </label>
                    <select
                      name="mode"
                      value={formData.mode}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border-none rounded-md h-10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="online">Online</option>
                      <option value="onsite">On-site</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border-none rounded-md h-10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1">Active</option>
                      <option value="0">Pause</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Assessment Type*
                    </label>
                    <div className="flex items-center space-x-6 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="mcq"
                          name="question_type"
                          value="mcq"
                          checked={formData.question_type === "mcq"}
                          onChange={handleRadioChange}
                          className="h-4 w-4 text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600"
                        />
                        <label
                          htmlFor="mcq"
                          className="ml-2 text-sm text-gray-300"
                        >
                          MCQ
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="codeChallenge"
                          name="question_type"
                          value="code challenge"
                          checked={formData.question_type === "code challenge"}
                          onChange={handleRadioChange}
                          className="h-4 w-4 text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600"
                        />
                        <label
                          htmlFor="codeChallenge"
                          className="ml-2 text-sm text-gray-300"
                        >
                          Code Challenge
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="designChallenge"
                          name="question_type"
                          value="design challenge"
                          checked={
                            formData.question_type === "design challenge"
                          }
                          onChange={handleRadioChange}
                          className="h-4 w-4 text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600"
                        />
                        <label
                          htmlFor="codeChallenge"
                          className="ml-2 text-sm text-gray-300"
                        >
                          Design Challenge
                        </label>
                      </div>
                    </div>
                  </div>

                  {formData.question_type === "mcq" && (
                    <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                      <h2 className="text-xl font-bold mb-4">MCQ Selection</h2>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Select Domain
                        </label>
                        <select
                          value={domain}
                          onChange={handleDomainChange}
                          className="w-full bg-gray-800 border-none rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Arts">Arts</option>
                          <option value="Commerce">Commerce</option>
                          <option value="Science">Science</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium text-gray-400">
                            Select 10 Questions
                          </h3>
                          <span className="text-xs text-gray-400">
                            {selectedQuestions.length}/10 selected
                          </span>
                        </div>

                        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                          {availableQuestions.length > 0 ? (
                            availableQuestions.map((question, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-md cursor-pointer transition ${
                                  selectedQuestions.some(
                                    (q) => q.question === question.question
                                  )
                                    ? "bg-blue-900 border border-blue-700"
                                    : "bg-gray-800 border border-gray-700 hover:border-gray-600"
                                }`}
                                onClick={() =>
                                  toggleQuestionSelection(question)
                                }
                              >
                                <div className="flex justify-between">
                                  <p className="text-sm">{question.question}</p>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded ${
                                      question.difficulty === "Easy"
                                        ? "bg-green-900 text-green-300"
                                        : question.difficulty === "Medium"
                                        ? "bg-yellow-900 text-yellow-300"
                                        : "bg-red-900 text-red-300"
                                    }`}
                                  >
                                    {question.difficulty}
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-gray-400 py-4">
                              No questions available for this domain
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={handleSaveSelection}
                        disabled={selectedQuestions.length !== 10}
                        className={`w-full py-2 rounded-md transition ${
                          selectedQuestions.length === 10
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Save Selection
                      </button>
                    </div>
                  )}

                  {formData.question_type === "code challenge" && (
                    <div className="md:col-span-2 bg-gray-700 p-4 rounded-md">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-medium text-gray-300">
                          Select a Challenge Question
                        </h3>
                        <button
                          type="button"
                          onClick={refreshChallengeQuestions}
                          className="flex items-center text-blue-400 text-sm hover:text-blue-300"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Show Other Options
                        </button>
                      </div>
                      <div className="space-y-3">
                        {challengeQuestions.map((question) => (
                          <div
                            key={question.id}
                            className={`p-3 rounded-md cursor-pointer border ${
                              formData.q_id === question.id
                                ? "border-blue-500 bg-gray-600"
                                : "border-gray-600 hover:bg-gray-650"
                            }`}
                            onClick={() => handleQuestionSelect(question.id)}
                          >
                            <div className="flex items-start">
                              <div
                                className={`h-4 w-4 rounded-full mt-0.5 mr-3 border ${
                                  formData.q_id === question.id
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-gray-500"
                                }`}
                              >
                                {formData.q_id === question.id && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span className="text-sm text-gray-300">
                                {question.title}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {!formData.q_id && (
                        <p className="mt-3 text-xs text-red-400">
                          Please select a challenge question
                        </p>
                      )}
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Description*
                    </label>
                    <textarea
                      name="desc"
                      value={formData.desc}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full bg-gray-700 border-none rounded-md p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Provide details about the internship opportunity, responsibilities, and requirements"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddInternshipForm(false)}
                    className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-600 text-gray-400 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      formData.question_type === "code challenge" &&
                      !formData.q_id
                    }
                    className={`w-full sm:w-auto px-4 py-2 rounded-md text-white ${
                      formData.question_type === "code challenge" &&
                      !formData.q_id
                        ? "bg-blue-600 opacity-50 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Create Opportunity
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "internships" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-bold">
                  My Created Internship Opportunities
                </h2>
              </div>

              {/* Table for larger screens */}
              <div className="hidden md:block overflow-hidden rounded-lg border border-gray-700">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Seat Size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Major Skill
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Assessment
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Posted Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {internships.map((internship) => (
                        <tr key={internship.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium">
                              {internship.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-xs text-gray-400">
                                {internship.limit}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                              {internship.major_skill}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {internship.mode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                internship.question_type === "code challenge"
                                  ? "bg-purple-900 text-purple-200"
                                  : "bg-blue-900 text-blue-200"
                              }`}
                            >
                              {internship.question_type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span
                                className={`flex items-center text-sm ${
                                  internship.status === "1"
                                    ? "text-green-400"
                                    : "text-gray-400"
                                }`}
                              >
                                {internship.status === "1" ? (
                                  <Check className="h-4 w-4 mr-1" />
                                ) : (
                                  <Clock className="h-4 w-4 mr-1" />
                                )}
                                {internship.status === "1" ? "Active" : "Pause"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {internship.postedDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-yellow-400 hover:text-yellow-300">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cards for mobile view */}
              <div className="md:hidden space-y-4">
                {internships.map((internship) => (
                  <div
                    key={internship.id}
                    className="bg-gray-800 rounded-lg border border-gray-700 p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-white">
                          {internship.title}
                        </h3>
                        <div className="flex items-center mt-1 space-x-3">
                          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                            {internship.major_skill}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              internship.question_type === "code challenge"
                                ? "bg-purple-900 text-purple-200"
                                : "bg-blue-900 text-blue-200"
                            }`}
                          >
                            {internship.question_type}
                          </span>
                          <span
                            className={`flex items-center text-xs ${
                              internship.status === "1"
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            {internship.status === "1" ? (
                              <Check className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {internship.status === "1" ? "Active" : "Pause"}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-yellow-400 hover:text-yellow-300">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mt-3">
                      <div>
                        <span className="block text-gray-500">mode</span>
                        {internship.mode}
                      </div>
                      <div>
                        <span className="block text-gray-500">Seats</span>
                        {internship.limit}
                      </div>
                      <div>
                        <span className="block text-gray-500">Posted</span>
                        {internship.postedDate}
                      </div>
                      <div>
                        <span className="block text-gray-500">Applicants</span>
                        {internship.applicants}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
