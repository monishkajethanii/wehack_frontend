"use client";
import React, { useState } from "react";
import {
  Search,
  User,
  History,
  LogOut,
  Briefcase,
  Code,
  Bell,
  ChevronRight,
  Star,
  Building,
  Calendar,
  Clock,
  BookOpen,
  Check,
  X,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState("internships");
  const [notificationCount, setNotificationCount] = useState(2);
  const [showAddInternshipForm, setShowAddInternshipForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    majorSkill: "",
    limit: "",
    gender: "any",
    location: "online",
    status: "1",
  });

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
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    });
    setShowAddInternshipForm(false);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-white font-bold">
                <img src="/manager.jpg" className="rounded-full"/>
            </div>
          </div>
          <div>
            <h2 className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skill-Hire
            </h2>
            <p className="text-xs text-gray-400">Recruiter</p>
          </div>
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

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-900 border-b border-gray-800 h-16 flex items-center justify-between px-6">
          <div className="relative w-96">
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

        <main className="flex-1 overflow-auto bg-gray-900 p-6">
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-700 flex justify-between items-center">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("internships")}
                  className={`py-3 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "internships"
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  My Internships
                </button>
              </div>
              <button
                onClick={() => setShowAddInternshipForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Opportunity
              </button>
            </div>
          </div>

          {showAddInternshipForm && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create New Opportunity</h2>
                <button
                  onClick={() => setShowAddInternshipForm(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddInternshipForm(false)}
                    className="mr-3 px-4 py-2 rounded-md border border-gray-600 text-gray-400 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
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
                <h2 className="text-xl font-bold">
                  My Created Internship Opportunities
                </h2>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-700">
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
          )}
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
