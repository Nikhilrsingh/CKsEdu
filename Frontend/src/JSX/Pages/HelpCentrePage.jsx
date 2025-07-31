import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Mail, MessageSquare, BookOpen, UserCheck, CreditCard, Settings, Users } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. You will receive an email with instructions to reset your password.'
  },
  {
    question: 'How do I enroll in a course?',
    answer: 'Browse our course catalog, select the course you\'re interested in, and click the "Enroll Now" button. You may need to complete the payment process if the course is not free.'
  },
  {
    question: 'Can I access courses offline?',
    answer: 'Yes, you can download course materials for offline viewing in our mobile app. Look for the download icon on the course content page.'
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach our support team 24/7 through the contact form on our Contact Us page or by emailing support@cksedu.com.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers. All transactions are secure and encrypted.'
  }
];

const helpCategories = [
  {
    title: 'Getting Started',
    description: 'New to CKsEdu? Learn how to set up your account and navigate the platform.',
    icon: <HelpCircle className="w-8 h-8" />,
    link: '#getting-started'
  },
  {
    title: 'Account Settings',
    description: 'Manage your profile, notification preferences, and account security.',
    icon: <Settings className="w-8 h-8" />,
    link: '#account-settings'
  },
  {
    title: 'Billing & Payments',
    description: 'Information about subscriptions, invoices, and payment methods.',
    icon: <CreditCard className="w-8 h-8" />,
    link: '#billing'
  },
  {
    title: 'Courses & Learning',
    description: 'Find answers about course enrollment, progress tracking, and certificates.',
    icon: <BookOpen className="w-8 h-8" />,
    link: '#courses'
  },
  {
    title: 'Technical Support',
    description: 'Troubleshoot technical issues with our platform and supported devices.',
    icon: <Settings className="w-8 h-8" />,
    link: '#technical'
  },
  {
    title: 'Community & Forums',
    description: 'Learn how to engage with other learners and instructors.',
    icon: <Users className="w-8 h-8" />,
    link: '#community'
  }
];

const HelpCentrePage = () => {
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
            How can we <span className="text-blue-600 dark:text-blue-400">help you</span> today?
          </motion.h1>
          <motion.p 
            className={`mt-3 max-w-2xl mx-auto text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} sm:mt-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Find answers to common questions or get in touch with our support team.
          </motion.p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className={`relative rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} p-1`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className={`block w-full pl-10 pr-3 py-4 rounded-md ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Search help articles..."
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-20">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Browse Help Categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {helpCategories.map((category, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center mb-4`}>
                  {React.cloneElement(category.icon, { className: `w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}` })}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <details className="group">
                  <summary className={`flex items-center justify-between p-4 cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {faq.question}
                    </h3>
                    <svg className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className={`px-4 pb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className={`rounded-2xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
              <MessageSquare className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Still need help?</h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </a>
              <a
                href="mailto:support@cksedu.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCentrePage;
