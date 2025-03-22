"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  AlertCircle,
  Check,
  X,
  HelpCircle,
  Menu,
  X as XIcon,
} from "lucide-react";

const InternshipAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(90); // 15 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const questions = [
    {
      id: 1,
      question:
        "Which data structure would be most efficient for implementing a priority queue?",
      options: ["Array", "Linked List", "Heap", "Stack"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "What is the time complexity of quicksort in the average case?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "In React, what hook would you use to perform side effects?",
      options: ["useState", "useReducer", "useContext", "useEffect"],
      correctAnswer: 3,
    },
    {
      id: 4,
      question: "Which HTTP status code indicates a successful request?",
      options: [
        "200 OK",
        "404 Not Found",
        "500 Internal Server Error",
        "403 Forbidden",
      ],
      correctAnswer: 0,
    },
    {
      id: 5,
      question: "What is the purpose of normalization in database design?",
      options: [
        "To speed up queries",
        "To reduce data redundancy",
        "To increase storage capacity",
        "To simplify database structure",
      ],
      correctAnswer: 1,
    },
    {
      id: 6,
      question: "Which of the following is NOT a RESTful API method?",
      options: ["GET", "POST", "CONNECT", "DELETE"],
      correctAnswer: 2,
    },
    {
      id: 7,
      question:
        "What principle describes the concept that a class should have only one reason to change?",
      options: [
        "Dependency Inversion Principle",
        "Open/Closed Principle",
        "Single Responsibility Principle",
        "Interface Segregation Principle",
      ],
      correctAnswer: 2,
    },
    {
      id: 8,
      question: "Which CSS property is used to create space between elements?",
      options: ["padding", "margin", "spacing", "gap"],
      correctAnswer: 1,
    },
    {
      id: 9,
      question: "What is a closure in JavaScript?",
      options: [
        "A way to hide variable implementation details",
        "A function with access to its outer function's scope",
        "A method to close unused connections",
        "A technique to prevent memory leaks",
      ],
      correctAnswer: 1,
    },
    {
      id: 10,
      question:
        "Which of these is a valid way to create a new array in JavaScript?",
      options: ["Array()", "new Array()", "[]", "All of the above"],
      correctAnswer: 3,
    },
  ];
  
  useEffect(() => {
    // Only run the timer if the assessment is not completed and results are not showing
    if (!isCompleted && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up - clear interval and submit assessment automatically
            clearInterval(timer);
            setIsCompleted(true);
            setShowResults(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      // Clean up interval on component unmount or when assessment is completed
      return () => clearInterval(timer);
    }
  }, [isCompleted, showResults]);

  // Handle window resize to show/hide sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Calculate score based on answers
  const calculateScore = () => {
    let correctCount = 0;
    Object.keys(answers).forEach((questionId) => {
      const question = questions.find((q) => q.id === parseInt(questionId));
      if (question && answers[questionId] === question.correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  // Handle selection of an answer
  const handleSelectAnswer = (index) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: index,
    });
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit the assessment
  const handleSubmit = () => {
    setShowResults(true);
  };

  // Check if the current question has been answered
  const isAnswered = (questionId) => {
    return answers[questionId] !== undefined;
  };

  // Toggle sidebar visibility for mobile devices
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-900 border-b border-gray-800 h-16 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            {!showResults && (
              <button 
                onClick={toggleSidebar}
                className="mr-3 text-gray-400 lg:hidden"
                aria-label="Toggle question navigator"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-lg sm:text-xl font-bold truncate">
              MCQ Assessment Test
            </h1>
          </div>
          {!showResults && (
            <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-md">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">{formatTime(timeLeft)}</span>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-auto bg-gray-900 p-4 sm:p-6">
          {!showResults ? (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg sm:text-xl font-bold">
                    Question {currentQuestion + 1} of {questions.length}
                  </h2>
                  <div className="text-sm text-gray-400">
                    {Object.keys(answers).length} of {questions.length} answered
                  </div>
                </div>

                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / questions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 mb-6">
                <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      className={`p-3 sm:p-4 rounded-md border cursor-pointer transition ${
                        answers[questions[currentQuestion].id] === index
                          ? "border-blue-500 bg-blue-900/30"
                          : "border-gray-700 hover:border-gray-600 bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${
                            answers[questions[currentQuestion].id] === index
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-600"
                          }`}
                        >
                          {answers[questions[currentQuestion].id] === index && (
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span className="text-sm sm:text-base">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-md ${
                    currentQuestion === 0
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {isCompleted ? (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
                  >
                    Submit Assessment
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="flex items-center px-3 sm:px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
              <div className="flex flex-col items-center mb-6 sm:mb-8">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  <span className="text-white text-2xl sm:text-3xl font-bold">
                    {calculateScore()}/{questions.length}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Assessment Complete</h2>
                <p className="text-sm sm:text-base text-gray-400 mt-2 text-center">
                  You scored {calculateScore()} out of {questions.length}{" "}
                  questions correctly
                </p>
              </div>

              <div className="space-y-4">
                {questions.map((question, qIndex) => (
                  <div
                    key={question.id}
                    className="bg-gray-850 rounded-lg p-3 sm:p-4 border border-gray-700"
                  >
                    <div className="flex justify-between mb-2 flex-wrap gap-2">
                      <h3 className="font-medium text-sm sm:text-base">Question {qIndex + 1}</h3>
                      {answers[question.id] === question.correctAnswer ? (
                        <span className="flex items-center text-green-400 text-sm">
                          <Check className="h-4 w-4 mr-1" />
                          Correct
                        </span>
                      ) : (
                        <span className="flex items-center text-red-400 text-sm">
                          <X className="h-4 w-4 mr-1" />
                          Incorrect
                        </span>
                      )}
                    </div>

                    <p className="mb-4 text-sm sm:text-base">{question.question}</p>

                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className={`p-2 sm:p-3 rounded-md flex items-center ${
                            oIndex === question.correctAnswer
                              ? "bg-green-900/30 border border-green-700"
                              : answers[question.id] === oIndex &&
                                oIndex !== question.correctAnswer
                              ? "bg-red-900/30 border border-red-700"
                              : "bg-gray-800 border border-gray-700"
                          }`}
                        >
                          {oIndex === question.correctAnswer ? (
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-400 flex-shrink-0" />
                          ) : answers[question.id] === oIndex ? (
                            <X className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-400 flex-shrink-0" />
                          ) : (
                            <div className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0"></div>
                          )}
                          <span className="text-sm sm:text-base">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6 sm:mt-8">
                <button className="px-4 sm:px-6 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 text-sm sm:text-base">
                  <a href="/dashboard">Return to Dashboard</a>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {!showResults && showSidebar && (
        <div className="fixed inset-0 z-50 lg:relative lg:z-0">
          {/* Mobile overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 lg:hidden"
            onClick={toggleSidebar}
          ></div>
          
          <div className="absolute right-0 top-0 h-full w-72 bg-gray-900 border-l border-gray-800 overflow-auto lg:relative">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="font-bold text-lg">Question Navigator</h2>
              <button 
                onClick={toggleSidebar} 
                className="text-gray-400 lg:hidden"
                aria-label="Close navigator"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    onClick={() => {
                      setCurrentQuestion(index);
                      if (window.innerWidth < 1024) {
                        setShowSidebar(false);
                      }
                    }}
                    className={`h-10 w-10 rounded flex items-center justify-center cursor-pointer ${
                      currentQuestion === index
                        ? "bg-blue-600 text-white"
                        : isAnswered(question.id)
                        ? "bg-green-900/50 text-green-300 border border-green-700"
                        : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-400">
                  <div className="h-4 w-4 rounded bg-blue-600 mr-2"></div>
                  <span>Current Question</span>
                </div>

                <div className="flex items-center text-sm text-gray-400">
                  <div className="h-4 w-4 rounded bg-green-900/50 border border-green-700 mr-2"></div>
                  <span>Answered</span>
                </div>

                <div className="flex items-center text-sm text-gray-400">
                  <div className="h-4 w-4 rounded bg-gray-800 border border-gray-700 mr-2"></div>
                  <span>Unanswered</span>
                </div>
              </div>

              <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  <h3 className="font-medium text-sm">Assessment Information</h3>
                </div>

                <ul className="mt-3 text-sm text-gray-400 space-y-2">
                  <li className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5" />
                    <span>15 minutes time limit</span>
                  </li>
                  <li className="flex items-start">
                    <HelpCircle className="h-4 w-4 mr-2 mt-0.5" />
                    <span>10 questions total</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-0.5" />
                    <span>70% passing score required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipAssessment;