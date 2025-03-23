"use client";
import React, { use, useEffect, useState } from "react";
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
  Menu,
  X as Close,
} from "lucide-react";
import axios from "axios";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("internships");
  const [notificationCount, setNotificationCount] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentData, setStudent] = useState({ name: "Loading..." });
  const [oppurtunity, setOppurtunity] = useState([]);
  // for history
  const [email, setEmail] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
        "https://wehack-backend.vercel.app/getUserHistory",
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
        setError(result.error || "Failed to fetch user history");
      }
    } catch (err) {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  //check user loggedin status
  useEffect(() => {
    fetchUserInfo();
    getOppurtunity();
    const checkLoginStatus = async () => {
      const stringifyData = await localStorage.getItem("loggedin");
      const rawData = JSON.parse(stringifyData);

      if (!rawData) {
        return (window.location.href = "/");
      }
    };
    checkLoginStatus();
  }, []);

  //fetch userData from localstorage
  const fetchUserInfo = async () => {
    const stringifyData = await localStorage.getItem("loggedin");
    const rawData = JSON.parse(stringifyData);

    if (!rawData) {
      setStudent({
        name: "Dummy user.",
        email: "dummy@gmail.com",
        college: "Dummy College",
      });
      return;
    }

    setStudent({
      name: rawData.name,
      email: rawData.email,
      college: rawData.college_name,
      student_id: rawData.student_id,
      skills: rawData.skills,
      resume: rawData.resume,
      location: rawData.location,
      grad_year: rawData.grad_year,
      gender: rawData.gender,
    });

    console.log(rawData);
    console.log(studentData);
  };

  //lets fetch all data for dashboard
  const getOppurtunity = async () => {
    try {
      const response = await axios.get(
        "https://wehack-backend.vercel.app/api/getAllOpp",
        {
          headers: {
            "Content-Type": "application/json",
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );

      if (response.status === 200 && response.data && response.data.data) {
        const formattedData = response.data.data.map((item) => {
          const handleNavigation = (mode, qbId) => {
            if (mode.toLowerCase().includes("mcq")) {
              return `/mcq/${qbId}`;
            } else if (mode.toLowerCase().includes("code challenge")) {
              return `/code-challenge/${qbId}`;
            } else if (mode.toLowerCase().includes("design challenge")) {
              return `/design-challenge/${qbId}`;
            } else {
              return "";
            }
          };

          // Calculate navRoute for each item
          const navRoute = item.qb_id
            ? handleNavigation(item.mode || "", item.qb_id)
            : "";

          return {
            id: item.id || Math.random().toString(36).substr(2, 9),
            company: item.company_name || "Unknown Company",
            role: item.title || "Position",
            desc: item.desc || "Description",
            location: item.mode || "Remote",
            duration: item.duration || "Not specified",
            stipend: item.stipend || "Not specified",
            deadline: item.deadline || "Not specified",
            logo: item.logo || (item.company_name ? item.company_name[0] : "C"),
            skills: item.major_skill || [],
            status: item.status || "",
            navRoute: navRoute, // Include the navigation route in the returned object
            qbId: item.qb_id || null,
          };
        });

        console.log("formattedData", formattedData);
        setOppurtunity(formattedData);
        console.log("setData ", oppurtunity);
      } else {
        console.log("No data received from API");
        setOppurtunity([]);
      }
    } catch (error) {
      console.log("Error", error.message);
      setOppurtunity([]);
      alert(error.message);
    }
  };

  const problems = [
    {
      id: 101,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      completion: "Solved",
      companies: ["Google", "Amazon", "Microsoft"],
    },
    {
      id: 102,
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stacks",
      completion: "Solved",
      companies: ["Facebook", "Amazon"],
    },
    {
      id: 103,
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      category: "Linked Lists",
      completion: "Attempted",
      companies: ["Amazon", "Microsoft"],
    },
    {
      id: 104,
      title: "Reverse Linked List",
      difficulty: "Medium",
      category: "Linked Lists",
      completion: "Not Attempted",
      companies: ["Google", "Facebook", "Apple"],
    },
  ];

  const recentPractice = [
    {
      id: 101,
      title: "Two Sum",
      time: "2 hours ago",
      status: "Completed",
    },
    {
      id: 102,
      title: "Valid Parentheses",
      time: "Yesterday",
      status: "Completed",
    },
    {
      id: 103,
      title: "Merge Two Sorted Lists",
      time: "2 days ago",
      status: "Attempted",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-white">
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800 h-16 flex items-center justify-between px-4">
        <button
          onClick={toggleSidebar}
          className="text-white bg-gray-800 p-2 rounded-md"
        >
          {sidebarOpen ? <Close size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center">
          <h2 className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SkillHire
          </h2>
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

      <div
        className={`w-full md:w-64 bg-gray-900 border-r border-gray-800 flex flex-col fixed inset-y-0 left-0 z-30 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-white font-bold">
              <img
                src="/avatar.png"
                alt="Logo"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          </div>
          <div>
            <h2 className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skill-Hire
            </h2>
            <p className="text-xs text-gray-400">Connect. Learn. Succeed.</p>
          </div>
        </div>

        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-300" />
            </div>
            <div>
              <h3 className="font-medium">{studentData.name}</h3>
              <p className="text-xs text-gray-400">{studentData.college}</p>
            </div>
          </div>
        </div>

        <div
          className="p-4 border-t border-gray-800"
          onClick={() => {
            localStorage.clear();
          }}
        >
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
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0 mt-16 md:mt-0">
        <header className="bg-gray-900 border-b border-gray-800 h-16 flex items-center justify-between px-4 md:px-6 fixed top-0 left-0 right-0 md:relative z-20">
          <div className="relative w-full max-w-md ml-8 md:ml-0">
            <input
              type="text"
              placeholder="Search internships, problems..."
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

        <main className="flex-1 overflow-auto bg-gray-900 p-4 md:p-6 mt-16 md:mt-0">
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-700 flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("internships")}
                className={`py-3 px-4 md:px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
                  activeTab === "internships"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                Available Internships
              </button>
              <button
                onClick={() => setActiveTab("practice")}
                className={`py-3 px-4 md:px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
                  activeTab === "practice"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                Practice Problems
              </button>
            </div>
          </div>

          {activeTab === "internships" ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Recommended Internships</h2>

              {oppurtunity && oppurtunity.length > 0 ? (
                oppurtunity.map((internship) => (
                  <div
                    key={internship.id}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-start">
                      <div className="h-12 w-12 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-3 md:mb-0 md:mr-4">
                        <span className="text-white font-bold">
                          {internship.logo}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <h3 className="font-medium mb-1 sm:mb-0">
                            {internship.role}
                          </h3>
                          {internship.status === "new" && (
                            <span className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs inline-block w-fit">
                              New
                            </span>
                          )}
                        </div>

                        <p className="text-gray-400 text-sm">
                          {internship.desc}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {internship.company}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-sm text-gray-400">
                          <span className="flex items-center mb-1 sm:mb-0">
                            <Building className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span className="truncate">
                              {internship.location}
                            </span>
                          </span>
                          {/* <span className="flex items-center mb-1 sm:mb-0">
                          <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                            {internship.duration}
                          </span> */}
                          {/* <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                            Deadline: {internship.deadline}
                          </span> */}
                        </div>

                        <div className="mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                              {internship.skills}
                            </span>
                          </div>

                          {/* <span className="text-green-400 font-medium">
                            {internship.stipend}
                          </span> */}
                        </div>
                      </div>

                      <button
                        className="ml-auto mt-3 md:mt-0 md:ml-4 text-blue-400 hover:text-blue-300"
                        onClick={() => {
                          if (internship.navRoute) {
                            router.push(internship.navRoute);
                          }
                        }}
                      >
                        {internship.mode === "mcq" ? (
                          <a href="/mcq">
                            <ChevronRight className="h-5 w-5" />
                          </a>
                        ) : (
                          <a href="/challenge">
                            <ChevronRight className="h-5 w-5" />
                          </a>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No internships available at the moment.
                </p>
              )}

              <button className="w-full py-2 mt-4 rounded-md border border-gray-700 text-gray-400 hover:bg-gray-800 transition">
                View All Internships
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">
                Recommended Practice Problems
              </h2>

              <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        Problem
                      </th>
                      <th
                        scope="col"
                        className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        Difficulty
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="hidden md:table-cell px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        Companies
                      </th>
                      <th
                        scope="col"
                        className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {problems.map((problem) => (
                      <tr key={problem.id} className="hover:bg-gray-750">
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">
                            {problem.id}. {problem.title}
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              problem.difficulty === "Easy"
                                ? "bg-green-900 text-green-300"
                                : problem.difficulty === "Medium"
                                ? "bg-yellow-900 text-yellow-300"
                                : "bg-red-900 text-red-300"
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {problem.category}
                        </td>
                        <td className="hidden md:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-1">
                            {problem.companies
                              .slice(0, 2)
                              .map((company, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-700 px-2 py-0.5 rounded text-xs"
                                >
                                  {company}
                                </span>
                              ))}
                            {problem.companies.length > 2 && (
                              <span className="bg-gray-700 px-2 py-0.5 rounded text-xs">
                                +{problem.companies.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`flex items-center text-sm ${
                              problem.completion === "Solved"
                                ? "text-green-400"
                                : problem.completion === "Attempted"
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          >
                            {problem.completion === "Solved" ? (
                              <Check className="h-4 w-4 mr-1" />
                            ) : problem.completion === "Attempted" ? (
                              <Clock className="h-4 w-4 mr-1" />
                            ) : (
                              <X className="h-4 w-4 mr-1" />
                            )}
                            {problem.completion}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button className="w-full py-2 mt-4 rounded-md border border-gray-700 text-gray-400 hover:bg-gray-800 transition">
                View All Practice Problems
              </button>
            </div>
          )}
        </main>
      </div>
      <div className="bg-black text-white min-h-screen flex flex-col p-4">
        {/* <h1 className="text-2xl font-bold mb-4">User History</h1> */}
        {email ? (
          <p className="mb-4 text-gray-400">
            Showing history for: <span className="font-bold">{email}</span>
          </p>
        ) : (
          <p className="text-red-500">{error}</p>
        )}

       

        <div className="mt-6 w-full max-w-6xl overflow-x-auto">
          {history.length > 0 ? (
            <table className="w-full border border-white">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 border border-white">Title</th>
                  <th className="p-2 border border-white">Company Name</th>
                  <th className="p-2 border border-white">Status</th>
                  <th className="p-2 border border-white">Mode</th>
                  <th className="p-2 border border-white">Q_ID</th>
                  <th className="p-2 border border-white">Question Type</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index} className="border border-white text-center">
                    <td className="p-2 border border-white">{item.title}</td>
                    <td className="p-2 border border-white">
                      {item.company_name}
                    </td>
                    <td className="p-2 border border-white">{item.status}</td>
                    <td className="p-2 border border-white">{item.mode}</td>
                    <td className="p-2 border border-white">{item.q_id}</td>
                    <td className="p-2 border border-white">
                      {item.question_type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">No history found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
