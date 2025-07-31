import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Calendar, Heart, ArrowRight } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const CommunityPage = () => {
  const { darkMode } = useTheme();
  return (
    <div className={`min-h-screen bg-gradient-to-b ${darkMode ? 'from-gray-900 to-gray-800 text-white' : 'from-gray-50 to-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Join Our Learning Community
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connect with fellow learners, share knowledge, and grow together in our vibrant community of passionate students and educators.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <a
              href="#join-now"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              Join Community Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Discussion Forums</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Engage in meaningful discussions, ask questions, and share your knowledge with the community.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Study Groups</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Join or create study groups to collaborate with peers who share your academic interests.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Events & Webinars</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Participate in live events, workshops, and webinars hosted by experts in various fields.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="join-now" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Become part of a growing community of learners and educators. Share, learn, and grow together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/signup"
                className="px-8 py-4 bg-white text-blue-600 font-medium rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/login"
                className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors duration-300"
              >
                Log In
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Community Says</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from students and educators who are part of our learning community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Johnson',
                role: 'Computer Science Student',
                content: 'The community helped me understand complex algorithms through collaborative learning. The study groups are amazing!',
                rating: 5
              },
              {
                name: 'Maria Garcia',
                role: 'Mathematics Educator',
                content: 'As an educator, I find the discussion forums incredibly valuable for sharing knowledge and connecting with students.',
                rating: 5
              },
              {
                name: 'James Wilson',
                role: 'Self-Learner',
                content: 'The webinars and events organized by the community have been instrumental in my learning journey.',
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-full ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-bold text-lg mr-4`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
