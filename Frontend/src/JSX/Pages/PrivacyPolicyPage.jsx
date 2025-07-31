import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, User, Server } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const PrivacyPolicyPage = () => {
  const { darkMode } = useTheme();

  const sections = [
    {
      title: 'Introduction',
      icon: <Shield className="w-5 h-5" />,
      content: 'At CKsEdu, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.'
    },
    {
      title: 'Information We Collect',
      icon: <Server className="w-5 h-5" />,
      content: 'We collect information you provide when you create an account, enroll in courses, complete forms, or communicate with us. This may include your name, email, payment details, and learning progress.'
    },
    {
      title: 'How We Use Your Data',
      icon: <User className="w-5 h-5" />,
      content: 'Your information helps us provide and improve our services, process transactions, personalize your experience, and communicate important updates. We never sell your data to third parties.'
    },
    {
      title: 'Data Security',
      icon: <Lock className="w-5 h-5" />,
      content: 'We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.'
    },
    {
      title: 'Your Rights',
      icon: <Shield className="w-5 h-5" />,
      content: 'You have the right to access, correct, or delete your personal information. You can update your account details in your profile settings or contact us for assistance.'
    },
    {
      title: 'Changes to This Policy',
      icon: <Server className="w-5 h-5" />,
      content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.'
    }
  ];

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} sm:text-5xl`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Privacy <span className="text-blue-600 dark:text-blue-400">Policy</span>
          </motion.h1>
          <motion.p 
            className={`mt-3 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </div>

        {/* Main Content */}
        <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-8 md:p-10">
            <div className="prose dark:prose-invert max-w-none">
              {/* Introduction */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  Welcome to CKsEdu's Privacy Policy. This document explains how we collect, use, and protect your personal information when you use our platform.
                </p>
              </motion.div>

              {/* Policy Sections */}
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <motion.section 
                    key={index}
                    id={section.title.toLowerCase().replace(/\s+/g, '-')}
                    className="scroll-mt-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} mr-3`}>
                        {React.cloneElement(section.icon, { 
                          className: `w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}` 
                        })}
                      </div>
                      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {section.title}
                      </h2>
                    </div>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {section.content}
                    </p>
                  </motion.section>
                ))}
              </div>

              {/* Contact Information */}
              <motion.div 
                className={`mt-16 p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Contact Us
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="space-y-2">
                  <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    <a href="mailto:privacy@cksedu.com" className="hover:underline">
                      privacy@cksedu.com
                    </a>
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    CKsEdu Inc.<br />
                    123 Education Street<br />
                    Learning City, 10101
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
