"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Book, Code, Menu, X, ArrowUp, ArrowDown } from 'lucide-react';

const CodeEditorPage = () => {
  const [code, setCode] = useState('// Write your code here\n\nfunction solution() {\n  // Your implementation\n  \n  return result;\n}');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showProblem, setShowProblem] = useState(true);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false);
    }
  }, [isMobile]);
  
  const questions = [
    {
      id: 1,
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]"
        }
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
      ],
      starterCode: "function twoSum(nums, target) {\n  // Your implementation\n  \n}"
    },
    {
      id: 2,
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
      examples: [
        {
          input: "s = \"()\"",
          output: "true"
        },
        {
          input: "s = \"()[]{}\"",
          output: "true"
        },
        {
          input: "s = \"(]\"",
          output: "false"
        }
      ],
      constraints: [
        "1 <= s.length <= 10^4",
        "s consists of parentheses only '()[]{}'."
      ],
      starterCode: "function isValid(s) {\n  // Your implementation\n  \n}"
    }
  ];
  
  const currentProblem = questions[currentQuestion];
  
  const handleRunCode = () => {
    console.log("Running code:", code);
    alert("Code execution triggered!");
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCode(questions[currentQuestion + 1].starterCode);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCode(questions[currentQuestion - 1].starterCode);
    }
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const toggleProblemVisibility = () => {
    setShowProblem(!showProblem);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 h-14 flex items-center justify-between px-4">
        <div className="flex items-center">
          <Menu className="h-5 w-5 mr-3 text-gray-400" />
          <h1 className="text-lg font-semibold truncate">Coding Challenge Platform</h1>
        </div>
        <div className="flex items-center space-x-2">
          {isMobile && (
            <button 
              onClick={toggleProblemVisibility}
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm flex items-center"
            >
              {showProblem ? <Code className="h-4 w-4" /> : <Book className="h-4 w-4" />}
            </button>
          )}
          <button 
            onClick={handleRunCode}
            className="px-2 py-1 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-sm flex items-center"
          >
            <Play className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Run</span>
          </button>
        </div>
      </header>
      
      {/* Mobile View */}
      {isMobile && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {showProblem ? (
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-800">
              <div className="flex justify-between items-center p-3 border-b border-gray-700">
                <div>
                  <h2 className="text-lg font-bold">{currentProblem.title}</h2>
                </div>
                <button 
                  onClick={toggleProblemVisibility}
                  className="p-2 rounded bg-gray-700 hover:bg-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3">
                <div className="mb-4">
                  <h3 className="text-base font-semibold mb-2">Problem</h3>
                  <p className="text-gray-300 whitespace-pre-line text-sm">{currentProblem.description}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-base font-semibold mb-2">Examples</h3>
                  {currentProblem.examples.map((example, index) => (
                    <div key={index} className="mb-3 bg-gray-900 p-2 rounded border border-gray-700">
                      <div className="mb-1 text-sm">
                        <span className="text-gray-400">Input: </span>
                        <code className="text-gray-300">{example.input}</code>
                      </div>
                      <div className="mb-1 text-sm">
                        <span className="text-gray-400">Output: </span>
                        <code className="text-gray-300">{example.output}</code>
                      </div>
                      {example.explanation && (
                        <div className="text-sm">
                          <span className="text-gray-400">Explanation: </span>
                          <span className="text-gray-300">{example.explanation}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mb-4">
                  <h3 className="text-base font-semibold mb-2">Constraints</h3>
                  <ul className="list-disc pl-4 text-gray-300 text-sm">
                    {currentProblem.constraints.map((constraint, index) => (
                      <li key={index} className="mb-1">{constraint}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-700 p-2 flex justify-between">
                <button 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  className={`px-2 py-1 rounded flex items-center text-sm ${
                    currentQuestion === 0 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                <button 
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                  className={`px-2 py-1 rounded flex items-center text-sm ${
                    currentQuestion === questions.length - 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col bg-gray-900">
              <div className="bg-gray-800 border-b border-gray-700 p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-gray-400" />
                  <h3 className="font-medium">Code Editor</h3>
                </div>
                <button 
                  onClick={toggleProblemVisibility}
                  className="p-2 rounded bg-gray-700 hover:bg-gray-600"
                >
                  <Book className="h-4 w-4" />
                </button>
              </div>
              <textarea 
                className="flex-1 bg-gray-900 text-gray-200 p-3 font-mono text-sm resize-none outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
              />
              <div className="bg-gray-800 border-t border-gray-700 p-3 flex justify-end">
                <button 
                  onClick={handleRunCode}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Run Code
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Tablet and Desktop View */}
      {!isMobile && (
        <div className="flex-1 flex overflow-hidden">
          {/* Problem statement panel */}
          <div className={`${isCollapsed ? 'w-12' : 'w-1/2 md:w-2/5 lg:w-1/3'} border-r border-gray-700 bg-gray-800 flex flex-col transition-all duration-300`}>
            {isCollapsed ? (
              <div className="h-full flex flex-col items-center py-4">
                <button 
                  onClick={toggleCollapse}
                  className="mb-6 p-2 rounded bg-gray-700 hover:bg-gray-600"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <Book className="h-5 w-5 text-gray-400 mb-4" />
                <div className="flex-1"></div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-3 border-b border-gray-700">
                  <div>
                    <h2 className="text-lg font-bold">{currentProblem.title}</h2>
                  </div>
                  <button 
                    onClick={toggleCollapse}
                    className="p-2 rounded bg-gray-700 hover:bg-gray-600"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="mb-6">
                    <h3 className="text-base font-semibold mb-2">Problem</h3>
                    <p className="text-gray-300 whitespace-pre-line text-sm">{currentProblem.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-base font-semibold mb-2">Examples</h3>
                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="mb-4 bg-gray-900 p-3 rounded border border-gray-700">
                        <div className="mb-2 text-sm">
                          <span className="text-gray-400">Input: </span>
                          <code className="text-gray-300">{example.input}</code>
                        </div>
                        <div className="mb-2 text-sm">
                          <span className="text-gray-400">Output: </span>
                          <code className="text-gray-300">{example.output}</code>
                        </div>
                        {example.explanation && (
                          <div className="text-sm">
                            <span className="text-gray-400">Explanation: </span>
                            <span className="text-gray-300">{example.explanation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-base font-semibold mb-2">Constraints</h3>
                    <ul className="list-disc pl-5 text-gray-300 text-sm">
                      {currentProblem.constraints.map((constraint, index) => (
                        <li key={index} className="mb-1">{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 p-3 flex justify-between">
                  <button 
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 0}
                    className={`px-3 py-1 rounded flex items-center text-sm ${
                      currentQuestion === 0 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden lg:inline">Previous</span>
                  </button>
                  <button 
                    onClick={handleNextQuestion}
                    disabled={currentQuestion === questions.length - 1}
                    className={`px-3 py-1 rounded flex items-center text-sm ${
                      currentQuestion === questions.length - 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <span className="hidden lg:inline">Next</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Code editor panel */}
          <div className={`${isCollapsed ? 'flex-1' : 'w-1/2 md:w-3/5 lg:w-2/3'} bg-gray-900 flex flex-col transition-all duration-300`}>
            <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center">
              <Code className="h-5 w-5 mr-2 text-gray-400" />
              <h3 className="font-medium">Code Editor</h3>
            </div>
            <textarea 
              className="flex-1 bg-gray-900 text-gray-200 p-4 font-mono resize-none outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />
            <div className="bg-gray-800 border-t border-gray-700 p-3 flex justify-end">
              <button 
                onClick={handleRunCode}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center"
              >
                <Play className="h-4 w-4 mr-2" />
                Run Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditorPage;