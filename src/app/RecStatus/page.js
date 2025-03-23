"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function RecruitmentStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const stringifyData = localStorage.getItem("loggedin");
      if (stringifyData) {
        const rawData = JSON.parse(stringifyData);
        setUserEmail(rawData.email || '');
      }
    } catch (e) {
      console.error("Error retrieving email from localStorage:", e);
    }
    const fetchStatus = async () => {
      try {
        const response = await fetch('https://wehack-backend.vercel.app/api/getRecStatus', {
          method: 'POST',
          headers: {
            'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        setStatus(data.status);
        
        // Redirect if status is 1
        if (data.status === 1) {
          window.location = '/rdashboard';
        }
        
      } catch (error) {
        console.error('Error fetching status:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  if (status === 1) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Head>
        <title>SkillHire | Application Status</title>
        <meta name="description" content="Check your SkillHire application status" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <header className="py-6 px-4 md:px-12 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Skill<span className="text-blue-500">Hire</span></h1>
          <button className="px-4 py-2 text-white border border-blue-500 rounded-md hover:bg-blue-500 hover:bg-opacity-20 transition-all">
            Contact Support
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        {error ? <ErrorCard error={error} /> : <StatusCard status={status} email={userEmail} />}
      </main>

      <footer className="py-6 px-4 border-t border-gray-800 text-center text-gray-400">
        <div className="max-w-6xl mx-auto">
          <p>© 2025 SkillHire. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-8"></div>
      <h2 className="text-2xl font-semibold">Checking your application status...</h2>
    </div>
  );
}

function ErrorCard({ error }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg"
    >
      <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center text-white">
            <motion.div 
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Connection Error
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white text-opacity-90 mb-8"
            >
              We couldn't connect to the status server. Please check your internet connection and try again.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white bg-opacity-10 p-4 rounded-lg mb-8 w-full"
            >
              <p className="text-white text-opacity-80 text-sm">
                Error details: {error}
              </p>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="px-8 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-opacity-90 transition-all shadow-lg"
              onClick={() => window.location.reload()}
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatusCard({ status, email }) {
  let cardBg, icon, title, message, buttonText;

  switch (status) {
    case 0:
      cardBg = "from-yellow-500 to-yellow-600";
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-yellow-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      title = "Application Under Review";
      message = "Thank you for your interest in SkillHire! Our team is currently reviewing your application. We'll notify you as soon as the review is complete.";
      buttonText = "Check Again Later";
      break;
    case 2:
      cardBg = "from-red-600 to-red-700";
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
      title = "Account Terminated";
      message = "Our admin panel has identified something from your side that is against our guidelines. Unfortunately, your account has been terminated. Please email us for more information.";
      buttonText = "Contact Support";
      break;
    default:
      cardBg = "from-gray-600 to-gray-700";
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      title = "Status Unavailable";
      message = "We couldn't retrieve your application status at this time. Please try again later or contact support for assistance.";
      buttonText = "Try Again";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg"
    >
      <div className={`bg-gradient-to-br ${cardBg} rounded-lg shadow-xl overflow-hidden`}>
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center text-white">
            <motion.div 
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              {icon}
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white text-opacity-90 mb-8"
            >
              {message}
            </motion.p>
            
            {status === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white bg-opacity-10 p-4 rounded-lg mb-8 w-full"
              >
                <p className="text-white font-medium mb-2">Please email us at:</p>
                <div className="flex items-center justify-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-mono text-white">support@skillhire.com</span>
                </div>
                {email && (
                  <p className="text-white text-opacity-80 mt-3 text-sm">
                    Include your email ({email}) in your correspondence for faster assistance.
                  </p>
                )}
              </motion.div>
            )}
            
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="px-8 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-opacity-90 transition-all shadow-lg"
              onClick={() => status === 0 ? window.location.reload() : window.location = '/contact'}
            >
              {buttonText}
            </motion.button>
          </div>
        </div>
      </div>
      
      {status === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-center text-white text-opacity-80"
        >
          <p>This usually takes 1-2 business days. We appreciate your patience!</p>
        </motion.div>
      )}
    </motion.div>
  );
}