import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, BookOpen, User, CreditCard, Shield } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const TermsOfServicePage = () => {
  const { darkMode } = useTheme();

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: <FileText className="w-5 h-5" />,
      content: 'By accessing or using the CKsEdu platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'
    },
    {
      title: 'User Accounts',
      icon: <User className="w-5 h-5" />,
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 13 years old to use our services.'
    },
    {
      title: 'Course Access and Payments',
      icon: <CreditCard className="w-5 h-5" />,
      content: 'Payment is required for access to certain courses and features. All fees are non-refundable except as required by law. We reserve the right to modify our pricing at any time.'
    },
    {
      title: 'Intellectual Property',
      icon: <BookOpen className="w-5 h-5" />,
      content: 'All content on the CKsEdu platform, including courses, text, graphics, and logos, is the property of CKsEdu or its content providers and is protected by intellectual property laws.'
    },
    {
      title: 'User Conduct',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: 'You agree not to engage in any activity that interferes with or disrupts the services. Prohibited activities include sharing login credentials, distributing harmful content, or violating applicable laws.'
    },
    {
      title: 'Limitation of Liability',
      icon: <Shield className="w-5 h-5" />,
      content: 'CKsEdu shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the platform or any content provided through it.'
    },
    {
      title: 'Termination',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: 'We reserve the right to suspend or terminate your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users.'
    },
    {
      title: 'Changes to Terms',
      icon: <FileText className="w-5 h-5" />,
      content: 'We may update these Terms of Service from time to time. We will notify you of any changes by posting the new terms on this page and updating the effective date.'
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
            Terms of <span className="text-blue-600 dark:text-blue-400">Service</span>
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
                  Welcome to CKsEdu's Terms of Service. Please read these terms carefully before using our platform.
                </p>
              </motion.div>

              {/* Terms Sections */}
              <div className="space-y-10">
                {sections.map((section, index) => (
                  <motion.section 
                    key={index}
                    id={section.title.toLowerCase().replace(/\s+/g, '-')}
                    className="scroll-mt-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <div className="flex items-start mb-3">
                      <div className={`p-2 rounded-lg mt-1 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} mr-3`}>
                        {React.cloneElement(section.icon, { 
                          className: `w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}` 
                        })}
                      </div>
                      <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {section.title}
                      </h2>
                    </div>
                    <p className={`pl-11 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {section.content}
                    </p>
                  </motion.section>
                ))}
              </div>

              {/* Contact and Legal */}
              <motion.div 
                className={`mt-16 p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Contact Information
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="space-y-2">
                  <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    <a href="mailto:legal@cksedu.com" className="hover:underline">
                      legal@cksedu.com
                    </a>
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    CKsEdu Inc.<br />
                    123 Education Street<br />
                    Learning City, 10101
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    By using CKsEdu, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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

export default TermsOfServicePage;
