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
} from "lucide-react";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("internships");
  const [notificationCount, setNotificationCount] = useState(3);

  const studentData = {
    name: "John Doe",
    email: "john.doe@example.com",
    college: "University of Technology",
    progress: 68,
    completedProblems: 42,
    streak: 7,
  };

  // Sample data for the dashboard
  const internships = [
    {
      id: 1,
      company: "TechCorp",
      role: "Frontend Developer Intern",
      location: "Mumbai, India (Remote)",
      duration: "3 months",
      stipend: "₹25,000/month",
      deadline: "April 10, 2025",
      logo: "T",
      skills: ["React", "JavaScript", "CSS"],
      status: "new",
    },
    {
      id: 2,
      company: "DataSoft Systems",
      role: "Backend Developer Intern",
      location: "Bangalore, India",
      duration: "6 months",
      stipend: "₹30,000/month",
      deadline: "April 5, 2025",
      logo: "D",
      skills: ["Node.js", "MongoDB", "Express"],
      status: "new",
    },
    {
      id: 3,
      company: "CloudVision",
      role: "Full Stack Developer Intern",
      location: "Pune, India (Hybrid)",
      duration: "4 months",
      stipend: "₹28,000/month",
      deadline: "April 15, 2025",
      logo: "C",
      skills: ["React", "Node.js", "AWS"],
      status: "",
    },
  ];

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
    <div className="flex h-screen bg-black text-white">
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-white font-bold">
                <img src="/avatar.png"/>
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
                {/* name */}
              <h3 className="font-medium">{studentData.name}</h3>
              {/* college name */}
              <p className="text-xs text-gray-400">{studentData.college}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="">
            <li>
              <a href="#" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
                <History className="h-5 w-5 text-gray-400" />
                <span>History</span>
              </a>
            </li>
          </ul>
        </nav>
        
        {/* logout */}
        <div className="p-4 border-t border-gray-800">
          <a href="/" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 text-gray-400">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </a>
        </div>
      </div>
      
      {/* main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-900 border-b border-gray-800 h-16 flex items-center justify-between px-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search internships, problems, companies..."
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
          {/* dashboard */}
          
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-700 flex">
              <button 
                onClick={() => setActiveTab("internships")}
                className={`py-3 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "internships" 
                    ? "border-blue-500 text-blue-400" 
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                Available Internships
              </button>
              <button 
                onClick={() => setActiveTab("practice")}
                className={`py-3 px-6 font-medium text-sm border-b-2 ${
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
              
              {internships.map((internship) => (
                <div key={internship.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{internship.logo}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{internship.role}</h3>
                        {internship.status === "new" && (
                          <span className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs">
                            New
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-400 text-sm">{internship.company}</p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {internship.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {internship.duration}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Deadline: {internship.deadline}
                        </span>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex space-x-2">
                          {internship.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <span className="text-green-400 font-medium">
                          {internship.stipend}
                        </span>
                      </div>
                    </div>
                    
                    <button className="ml-4 text-blue-400 hover:text-blue-300">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2 mt-4 rounded-md border border-gray-700 text-gray-400 hover:bg-gray-800 transition">
                View All Internships
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Recommended Practice Problems</h2>
              
              <div className="overflow-hidden rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Problem
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Difficulty
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Companies
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {problems.map((problem) => (
                      <tr key={problem.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">
                            {problem.id}. {problem.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            problem.difficulty === "Easy" 
                              ? "bg-green-900 text-green-300" 
                              : problem.difficulty === "Medium"
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-red-900 text-red-300"
                          }`}>
                            {problem.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {problem.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-1">
                            {problem.companies.slice(0, 2).map((company, idx) => (
                              <span key={idx} className="bg-gray-700 px-2 py-0.5 rounded text-xs">
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`flex items-center text-sm ${
                            problem.completion === "Solved" 
                              ? "text-green-400" 
                              : problem.completion === "Attempted"
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}>
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
      <div className="w-72 bg-gray-900 border-l border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <h2 className="font-bold text-lg">Activity History</h2>
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Recently Enrolled</h3>
          
          <div className="space-y-3">
            {recentPractice.map((item) => (
              <div key={item.id} className="flex items-start">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                  item.status === "Completed" ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"
                }`}>
                  {item.status === "Completed" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>        
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;