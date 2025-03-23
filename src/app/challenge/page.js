"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Book, Code, Menu, X, ArrowUp, ArrowDown } from 'lucide-react';

const CodeEditorPage = () => {
  const [code, setCode] = useState('// Write your code here\n\nfunction solution() {\n  // Your implementation\n  \n  return result;\n}');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showProblem, setShowProblem] = useState(true);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [compileResult, setCompileResult] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  useEffect(() => {
    const disableKeys = (event) => {
      // Block all Ctrl and Alt combinations
      if (event.ctrlKey || event.altKey) {
        event.preventDefault();
        console.log("Ctrl and Alt keys are disabled!");
      }
      
      // Block specific combinations
      if (event.ctrlKey && ["c", "v", "s", "p", "a", "f"].includes(event.key.toLowerCase())) {
        event.preventDefault();
        console.log(`Ctrl+${event.key.toUpperCase()} is disabled!`);
      }
      
      // Block F12 key (Developer tools)
      if (event.key === "F12") {
        event.preventDefault();
        console.log("F12 is disabled!");
      }
      
      // Block Alt+Tab
      if (event.altKey && event.key === "Tab") {
        event.preventDefault();
        console.log("Alt+Tab is disabled!");
      }
      
      // Block browser shortcuts
      if (
        (event.ctrlKey && event.shiftKey && event.key === "I") || // Chrome/Firefox dev tools
        (event.ctrlKey && event.shiftKey && event.key === "J") || // Chrome dev tools
        (event.ctrlKey && event.shiftKey && event.key === "C") || // Chrome inspect element
        (event.metaKey && event.altKey && event.key === "I") || // Safari dev tools
        (event.key === "F11") // Fullscreen mode
      ) {
        event.preventDefault();
        console.log("Browser developer shortcuts are disabled!");
      }
    };
  
    const disableRightClick = (event) => {
      event.preventDefault();
      console.log("Right-click is disabled!");
    };
  
    document.addEventListener("keydown", disableKeys);
    document.addEventListener("contextmenu", disableRightClick);
  
    return () => {
      document.removeEventListener("keydown", disableKeys);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false);
    }
  }, [isMobile]);
  
  useEffect(() => {
    const fetchQuestionById = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const qId = urlParams.get('qbId');
        const questionId = parseInt(qId); 
        console.log("questionId: ",questionId)
        const response = await fetch('/questions.json');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        
        const data = await response.json();
        
        let foundQuestion;
        if (Array.isArray(data)) {
          foundQuestion = data.find(q => q.id === questionId);
        } else if (data.questions && Array.isArray(data.questions)) {
          foundQuestion = data.questions.find(q => q.id === questionId);
        } else if (data[questionId]) {
          foundQuestion = data[questionId];
        }
        
        if (foundQuestion) {
          setQuestion(foundQuestion);
          setCode(foundQuestion.starterCode || code);
        } else {
          console.error(`Question with ID ${questionId} not found`);
          // Set a default message if question not found
          setQuestion({
            title: "Question Not Found",
            description: "The requested question could not be found.",
            examples: [],
            constraints: []
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading question:', error);
        setLoading(false);
        
        // Set a default message for error state
        setQuestion({
          title: "Error Loading Question",
          description: "There was an error loading the question. Please try again later.",
          examples: [],
          constraints: []
        });
      }
    };
    
    fetchQuestionById();
  }, []);
  
  const currentProblem = question || {
    title: "Loading...",
    description: "Loading problem description...",
    examples: [],
    constraints: []
  };
  
  const handleRunCode = async () => {
    try {
      setIsCompiling(true);
      setCompileResult(null);
      
      const response = await fetch('/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentProblem,
          userCode: code
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("API Response:", result);
      setCompileResult(result.filteredData);
    } catch (error) {
      console.error("Error compiling code:", error);
      setCompileResult({
        codeValidity: "Error",
        errorsIssues: ["Failed to communicate with the server. Please try again later."],
        codeQualityRating: 0
      });
    } finally {
      setIsCompiling(false);
    }
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const toggleProblemVisibility = () => {
    setShowProblem(!showProblem);
  };

  // Function to render the compile results
  const renderCompileResults = () => {
    if (!compileResult) return null;
    
    const getBgColorClass = () => {
      if (compileResult.codeValidity === "Yes") return "bg-green-900";
      if (compileResult.codeValidity === "No") return "bg-red-900";
      return "bg-yellow-900";
    };
    
    return (
      <div className={`p-4 rounded mb-4 ${getBgColorClass()} border border-gray-700`}>
        <h3 className="text-base font-semibold mb-2">
          {compileResult.codeValidity === "Yes" ? "Success!" : "Code Check Results"}
        </h3>
        
        <div className="mb-2">
          <span className="font-medium">Validity:</span>{" "}
          <span>{compileResult.codeValidity}</span>
        </div>
        
        {compileResult.errorsIssues && compileResult.errorsIssues.length > 0 && (
          <div className="mb-2">
            <div className="font-medium mb-1">Issues:</div>
            <ul className="list-disc pl-5 text-sm">
              {compileResult.errorsIssues.map((issue, idx) => (
                <li key={idx} className="mb-1">{issue}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div>
          <span className="font-medium">Quality Rating:</span>{" "}
          <span>{compileResult.codeQualityRating}/5</span>
        </div>
      </div>
    );
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
            disabled={isCompiling}
            className={`px-2 py-1 rounded ${isCompiling ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-sm flex items-center`}
          >
            {isCompiling ? (
              <span>Running...</span>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Run</span>
              </>
            )}
          </button>
        </div>
      </header>
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">Loading question...</div>
          </div>
        </div>
      ) : (
        <>
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
                      {currentProblem.examples && currentProblem.examples.map((example, index) => (
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
                        {currentProblem.constraints && currentProblem.constraints.map((constraint, index) => (
                          <li key={index} className="mb-1">{constraint}</li>
                        ))}
                      </ul>
                    </div>
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
                  <div className="flex-1 flex flex-col overflow-y-auto">
                    {compileResult && (
                      <div className="p-3">
                        {renderCompileResults()}
                      </div>
                    )}
                    <textarea 
                      className="flex-1 bg-gray-900 text-gray-200 p-3 font-mono text-sm resize-none outline-none"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      spellCheck="false"
                    />
                  </div>
                  <div className="bg-gray-800 border-t border-gray-700 p-3 flex justify-end">
                    <button 
                      onClick={handleRunCode}
                      disabled={isCompiling}
                      className={`px-3 py-1.5 ${isCompiling ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} rounded flex items-center`}
                    >
                      {isCompiling ? (
                        <span>Running...</span>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Run Code
                        </>
                      )}
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
                        {currentProblem.examples && currentProblem.examples.map((example, index) => (
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
                          {currentProblem.constraints && currentProblem.constraints.map((constraint, index) => (
                            <li key={index} className="mb-1">{constraint}</li>
                          ))}
                        </ul>
                      </div>
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
                <div className="flex-1 flex flex-col overflow-y-auto">
                  {compileResult && (
                    <div className="p-4">
                      {renderCompileResults()}
                    </div>
                  )}
                  <textarea 
                    className="flex-1 bg-gray-900 text-gray-200 p-4 font-mono resize-none outline-none"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck="false"
                  />
                </div>
                <div className="bg-gray-800 border-t border-gray-700 p-3 flex justify-end">
                  <button 
                    onClick={handleRunCode}
                    disabled={isCompiling}
                    className={`px-4 py-2 ${isCompiling ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} rounded flex items-center`}
                  >
                    {isCompiling ? (
                      <span>Running...</span>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CodeEditorPage;