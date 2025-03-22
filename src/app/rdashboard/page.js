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
} from "lucide-react";

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState("internships");
  const [notificationCount, setNotificationCount] = useState(2);
  const [showAddInternshipForm, setShowAddInternshipForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    majorSkill: "",
    limit: "",
    gender: "any",
    location: "online",
    status: "1",
    assessment: "mcq",
    selectedQuestionId: null
  });
  const [challengeQuestions, setChallengeQuestions] = useState([]);
  
  // Sample challenge questions (in a real app, this would be fetched from challenges.json)
  const mockChallengeQuestions = [
    { id: 1, title: "Create a function to reverse a string without using built-in methods" },
    { id: 2, title: "Implement a binary search algorithm" },
    { id: 3, title: "Build a function to find the longest palindrome in a string" },
    { id: 4, title: "Create a function to detect if a string has all unique characters" },
    { id: 5, title: "Implement a queue using two stacks" },
    { id: 6, title: "Create a function to check if a binary tree is balanced" },
    { id: 7, title: "Implement a function to find the first non-repeating character in a string" },
    { id: 8, title: "Create an algorithm to determine if a string is a rotation of another string" },
    { id: 9, title: "Build a function to merge two sorted arrays" }
  ];

  // Function to get random challenge questions
  const getRandomChallengeQuestions = () => {
    // Shuffle array and take the first 3
    const shuffled = [...mockChallengeQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  // Set initial challenge questions on component mount
  useEffect(() => {
    setChallengeQuestions(getRandomChallengeQuestions());
  }, []);

  // Function to refresh challenge questions
  const refreshChallengeQuestions = () => {
    setChallengeQuestions(getRandomChallengeQuestions());
    setFormData({
      ...formData,
      selectedQuestionId: null
    });
  };

  const recruiterData = {
    name: "Jane Smith",
    company: "TechCorp",
    email: "jane.smith@techcorp.com",
  };

  // Sample data for the dashboard
  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      description:
        "Looking for a skilled frontend developer to join our team for a 3-month internship.",
      majorSkill: "React",
      limit: 5,
      gender: "any",
      location: "Remote",
      status: "1",
      applicants: 12,
      postedDate: "March 15, 2025",
      assessment: "mcq"
    },
    {
      id: 2,
      title: "Backend Developer Intern",
      description:
        "Work on our server-side applications using Node.js and MongoDB.",
      majorSkill: "Node.js",
      limit: 3,
      gender: "any",
      location: "On-site",
      status: "1",
      applicants: 8,
      postedDate: "March 10, 2025",
      assessment: "code challenge"
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      description:
        "Help design user interfaces for our web and mobile applications.",
      majorSkill: "Figma",
      limit: 2,
      gender: "any",
      location: "Hybrid",
      status: "0",
      applicants: 0,
      postedDate: "March 18, 2025",
      assessment: "mcq"
    },
  ];

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
      assessment: e.target.value,
      selectedQuestionId: null // Reset selected question when assessment type changes
    });
    
    // If changing to code challenge, ensure we have questions loaded
    if (e.target.value === "code challenge" && challengeQuestions.length === 0) {
      setChallengeQuestions(getRandomChallengeQuestions());
    }
  };

  const handleQuestionSelect = (questionId) => {
    setFormData({
      ...formData,
      selectedQuestionId: questionId
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      title: "",
      description: "",
      majorSkill: "",
      limit: "",
      gender: "any",
      location: "online",
      status: "1",
      assessment: "mcq",
      selectedQuestionId: null
    });
    setShowAddInternshipForm(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
      <div className={`${sidebarOpen ? 'fixed inset-0 z-50 md:relative md:translate-x-0' : 'fixed -translate-x-full md:relative md:translate-x-0'} 
                      transition-transform duration-300 ease-in-out
                      w-3/4 sm:w-64 bg-gray-900 border-r border-gray-800 flex flex-col`}>
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white font-bold">
                <img src="/manager.jpg" className="rounded-full" alt="Profile" />
              </div>
            </div>
            <div>
              <h2 className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Skill-Hire
              </h2>
              <p className="text-xs text-gray-400">Recruiter</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-400"
          >
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
              >
                <History className="h-5 w-5 text-gray-400" />
                <span>History</span>
              </a>
            </li>
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
                <h2 className="text-lg md:text-xl font-bold">Create New Opportunity</h2>
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
                      name="majorSkill"
                      value={formData.majorSkill}
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
                      Location*
                    </label>
                    <select
                      name="location"
                      value={formData.location}
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
                          name="assessment"
                          value="mcq"
                          checked={formData.assessment === "mcq"}
                          onChange={handleRadioChange}
                          className="h-4 w-4 text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600"
                        />
                        <label htmlFor="mcq" className="ml-2 text-sm text-gray-300">
                          MCQ
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="codeChallenge"
                          name="assessment"
                          value="code challenge"
                          checked={formData.assessment === "code challenge"}
                          onChange={handleRadioChange}
                          className="h-4 w-4 text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600"
                        />
                        <label htmlFor="codeChallenge" className="ml-2 text-sm text-gray-300">
                          Code Challenge
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Challenge Questions Selection - Only visible when code challenge is selected */}
                  {formData.assessment === "code challenge" && (
                    <div className="md:col-span-2 bg-gray-700 p-4 rounded-md">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-medium text-gray-300">Select a Challenge Question</h3>
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
                              formData.selectedQuestionId === question.id
                                ? "border-blue-500 bg-gray-600"
                                : "border-gray-600 hover:bg-gray-650"
                            }`}
                            onClick={() => handleQuestionSelect(question.id)}
                          >
                            <div className="flex items-start">
                              <div className={`h-4 w-4 rounded-full mt-0.5 mr-3 border ${
                                formData.selectedQuestionId === question.id
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-gray-500"
                              }`}>
                                {formData.selectedQuestionId === question.id && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span className="text-sm text-gray-300">{question.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {!formData.selectedQuestionId && (
                        <p className="mt-3 text-xs text-red-400">Please select a challenge question</p>
                      )}
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Description*
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
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
                    disabled={formData.assessment === "code challenge" && !formData.selectedQuestionId}
                    className={`w-full sm:w-auto px-4 py-2 rounded-md text-white ${
                      formData.assessment === "code challenge" && !formData.selectedQuestionId
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
                              {internship.majorSkill}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {internship.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <span className={`px-2 py-1 rounded text-xs ${
                              internship.assessment === "code challenge" 
                                ? "bg-purple-900 text-purple-200" 
                                : "bg-blue-900 text-blue-200"
                            }`}>
                              {internship.assessment}
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
                  <div key={internship.id} className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-white">{internship.title}</h3>
                        <div className="flex items-center mt-1 space-x-3">
                          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                            {internship.majorSkill}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            internship.assessment === "code challenge" 
                              ? "bg-purple-900 text-purple-200" 
                              : "bg-blue-900 text-blue-200"
                          }`}>
                            {internship.assessment}
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
                        <span className="block text-gray-500">Location</span>
                        {internship.location}
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