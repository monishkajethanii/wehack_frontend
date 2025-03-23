// pages/index.js
"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-hidden">
      <Head>
        <title>SkillHire | Real Skills Assessment</title>
        <meta
          name="description"
          content="Connecting recruiters with top talent based on real skills assessment"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading ? <SplashScreen isMounted={isMounted} /> : <MainContent />}
    </div>
  );
}

function SplashScreen({ isMounted }) {
  // Safe default values when not mounted (server-side)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        {isMounted && Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-60"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
            }}
            animate={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Skill<span className="text-blue-500">Hire</span>
        </motion.h1>

        <motion.div
          className="w-16 h-1 bg-blue-500 mb-6"
          initial={{ width: 0 }}
          animate={{ width: "4rem" }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />

        <motion.p
          className="text-lg md:text-xl text-gray-300 text-center max-w-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Assessing real skills to connect top talent with the right
          opportunities
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function MainContent() {
  return (
    <motion.div
      className="w-full min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-12 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            Skill<span className="text-blue-500">Hire</span>
          </h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li className="hover:text-blue-400 transition-colors">
              <a href="#">Home</a>
            </li>
            <li className="hover:text-blue-400 transition-colors">
              <a href="#">For Recruiters</a>
            </li>
            <li className="hover:text-blue-400 transition-colors">
              <a href="#">For Students</a>
            </li>
            {/* <li className="hover:text-blue-400 transition-colors"><a href="#">About</a></li> */}
          </ul>
        </nav>
        <div className="flex space-x-4">
          <button className="px-4 py-2 border border-blue-500 rounded-md hover:bg-blue-500 hover:bg-opacity-20 transition-all">
            {" "}
            <a href="/">Log In</a>
          </button>
          <button className="hidden md:block px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
            <a href="/signup">Sign Up</a>
          </button>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <section className="pt-32 pb-20 px-4 md:px-16 lg:px-32">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Find talent based on{" "}
                <span className="text-blue-500">real skills</span>, not just
                resumes
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                SkillHire bridges the gap between recruiters seeking qualified
                candidates and students looking for opportunities that match
                their abilities.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors text-lg font-medium">
                  I'm a Recruiter
                </button>
                <button className="px-8 py-3 border border-white rounded-md hover:bg-white hover:bg-opacity-10 transition-all text-lg font-medium">
                  I'm a Student
                </button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative z-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-1">
                <div className="bg-black rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Skills Assessment</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      "React.js",
                      "Node.js",
                      "TypeScript",
                      "UI/UX Design",
                      "Problem Solving",
                    ].map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span>{skill}</span>
                        <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${70 + Math.random() * 30}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.5 + index * 0.1,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                    View Full Assessment
                  </button>
                </div>
              </div>
              <div className="absolute -top-5 -left-5 w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg blur-md -z-10 animate-pulse"></div>
            </motion.div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 px-4 md:px-16 bg-gray-900 bg-opacity-30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How SkillHire Works
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our platform uses advanced assessment tools to evaluate real
                skills and connect the right talent with the right companies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "For Recruiters",
                  description:
                    "Find candidates with verified skills that match your requirements, saving time on screening and interviews.",
                  icon: "👔",
                },
                {
                  title: "For Students",
                  description:
                    "Showcase your real abilities and get matched with opportunities that align with your skill set.",
                  icon: "🎓",
                },
                {
                  title: "Skill Assessment",
                  description:
                    "Our comprehensive testing evaluates practical skills that matter in real-world scenarios.",
                  icon: "📊",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">
              Skill<span className="text-blue-500">Hire</span>
            </h2>
            <p className="text-gray-400 mt-2">
              © 2025 SkillHire. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}