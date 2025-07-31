import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const ContactUsPage = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: 'Your message has been sent successfully! We\'ll get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    { icon: <Mail className="w-6 h-6" />, title: 'Email Us', description: 'support@cksedu.com' },
    { icon: <Phone className="w-6 h-6" />, title: 'Call Us', description: '+1 (555) 123-4567' },
    { icon: <MapPin className="w-6 h-6" />, title: 'Visit Us', description: '123 Education St, Learning City, 10101' }
  ];

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} sm:text-5xl md:text-6xl`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </motion.h1>
          <motion.p 
            className={`mt-3 max-w-2xl mx-auto text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} sm:mt-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Have questions? We're here to help. Reach out to our team anytime.
          </motion.p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center mb-4`}>
                {React.cloneElement(item.icon, { className: `w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}` })}
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {status.message && (
            <div className={`mb-6 p-4 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'}`}>
              <div className="flex items-center">
                {status.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                {status.message}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="How can we help you?"
              />
            </div>
            <div>
              <label htmlFor="message" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Tell us more about how we can help you..."
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
