import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Clock, Trophy } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const certifications = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    issuer: "CKsEdu Academy",
    date: "Issued June 2023",
    description: "Master the fundamentals of web development including HTML, CSS, and JavaScript.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    status: "Completed",
    icon: <Award className="w-6 h-6 text-blue-500" />,
    color: "blue"
  },
  {
    id: 2,
    title: "Advanced React Development",
    issuer: "CKsEdu Academy",
    date: "In Progress",
    description: "Build complex applications with React, Redux, and modern frontend tooling.",
    skills: ["React", "Redux", "Hooks", "Context API"],
    status: "In Progress",
    icon: <Clock className="w-6 h-6 text-yellow-500" />,
    color: "yellow"
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    issuer: "CKsEdu Academy",
    date: "Coming Soon",
    description: "Learn to build scalable server-side applications with Node.js and Express.",
    skills: ["Node.js", "Express", "REST APIs", "MongoDB"],
    status: "Not Started",
    icon: <Trophy className="w-6 h-6 text-purple-500" />,
    color: "purple"
  },
  {
    id: 4,
    title: "Data Science Fundamentals",
    issuer: "CKsEdu Academy",
    date: "Coming Soon",
    description: "Introduction to data analysis and machine learning with Python.",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib"],
    status: "Not Started",
    icon: <Trophy className="w-6 h-6 text-green-500" />,
    color: "green"
  }
];

const statusColors = {
  "Completed": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Not Started": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
};

const CertificationsPage = () => {
  const { darkMode } = useTheme();
  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} sm:text-5xl md:text-6xl`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your <span className="text-blue-600 dark:text-blue-400">Certifications</span>
          </motion.h1>
          <motion.p 
            className={`mt-3 max-w-2xl mx-auto text-xl ${darkMode ? 'text-gray-300' : 'text-gray-500'} sm:mt-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Track your learning achievements and showcase your skills
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden border-l-4 border-${cert.color}-500 hover:shadow-xl transition-shadow duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full bg-${cert.color}-100 dark:bg-opacity-20`}>
                      {cert.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {cert.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[cert.status]}`}>
                    {cert.status}
                  </span>
                </div>
                
                <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {cert.description}
                </p>
                
                <div className="mt-4">
                  <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Skills Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <button 
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-${cert.color}-600 hover:bg-${cert.color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${cert.color}-500 transition-colors`}
                    disabled={cert.status !== "Completed"}
                  >
                    {cert.status === "Completed" ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        View Certificate
                      </>
                    ) : (
                      "Not Available Yet"
                    )}
                  </button>
                  
                  {cert.status === "In Progress" && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">65%</span> complete
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} sm:text-3xl`}>
            Ready to earn your next certification?
          </h2>
          <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore our courses and start your learning journey today.
          </p>
          <div className="mt-6">
            <a
              href="/courses"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Browse Courses
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificationsPage;
