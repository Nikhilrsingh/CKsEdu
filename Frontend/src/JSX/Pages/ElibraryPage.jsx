import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../Context/ThemeContext';
import { Search, FolderOpen, Plus } from 'lucide-react';

// books with external links
const books = [
  {
    id: 1,
    title: "The Python Tutorial",
    author: "Guido van Rossum et al.",
    cover: "https://placehold.co/150x200/4F46E5/ffffff?text=Python",
    category: "Computer Science",
    year: 2023,
    description: "The official Python tutorial provides an introduction to the Python language and system. It's an excellent starting point for new programmers.",
    externalUrl: "https://docs.python.org/3/tutorial/",
  },
  {
    id: 2,
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, and Stein",
    cover: "https://placehold.co/150x200/E11D48/ffffff?text=Algorithms",
    category: "Computer Science",
    year: 2009,
    description: "The official MIT OpenCourseWare resource for 'Introduction to Algorithms'. The course covers fundamental algorithms and data structures.",
    externalUrl: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
  },
  {
    id: 3,
    title: "The Elements of Style",
    author: "William Strunk Jr.",
    cover: "https://placehold.co/150x200/1D4ED8/ffffff?text=Style",
    category: "Literature",
    year: 1918,
    description: "A classic American English writing style guide. It's a must-read for anyone who wants to improve their writing.",
    externalUrl: "https://www.gutenberg.org/ebooks/37134",
  },
  {
    id: 4,
    title: "Fundamentals of Physics",
    author: "David Halliday, Robert Resnick, and Jearl Walker",
    cover: "https://placehold.co/150x200/F59E0B/ffffff?text=Physics",
    category: "Physics",
    year: 2020,
    description: "An open-source, interactive textbook for an introductory physics course, covering mechanics, thermodynamics, and more.",
    externalUrl: "https://openstax.org/details/books/university-physics-volume-1",
  },
  {
    id: 5,
    title: "An Introduction to the Philosophy of Mathematics",
    author: "Mark Colyvan",
    cover: "https://placehold.co/150x200/6D28D9/ffffff?text=Philosophy",
    category: "Philosophy",
    year: 2012,
    description: "A clear and accessible introduction to the philosophical questions raised by mathematics. Part of the Stanford Encyclopedia of Philosophy.",
    externalUrl: "https://plato.stanford.edu/entries/philosophy-mathematics/",
  },
  {
    id: 6,
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    cover: "https://placehold.co/150x200/059669/ffffff?text=Calculus",
    category: "Mathematics",
    year: 2016,
    description: "An open-source textbook for a standard first course in calculus. It's a high-quality resource for students and teachers.",
    externalUrl: "https://openstax.org/details/books/calculus-volume-1",
  },
  {
    id: 7,
    title: "Microeconomics",
    author: "Paul Krugman",
    cover: "https://placehold.co/150x200/9CA3AF/ffffff?text=Economics",
    category: "Economics",
    year: 2020,
    description: "An introductory macroeconomics textbook with a clear, concise, and engaging narrative that builds on the fundamental principles of economics.",
    externalUrl: "https://openstax.org/details/books/principles-macroeconomics-3e",
  },
];

// Categories for dropdown
const categories = ["Science", "Mathematics", "Literature", "Economics", "Computer Science", "Physics", "Chemistry", "Philosophy"];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

function ElibraryPage() {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: 'Science',
    year: '',
    description: '',
    externalUrl: '',
    cover: 'https://placehold.co/150x200/4B5EAA/ffffff?text=Book',
  });

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const result = books.filter(book =>
      book.title.toLowerCase().includes(value) ||
      book.author.toLowerCase().includes(value) ||
      book.category.toLowerCase().includes(value)
    );
    setFilteredBooks(result);
  };

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({ ...prev, [name]: value }));
  };

  // Handle add book
  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.year) {
      alert('Please fill in Title, Author, and Year.');
      return;
    }
    const newId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
    books.push({ ...newBook, id: newId, year: parseInt(newBook.year) });
    setFilteredBooks([...books]);
    setNewBook({
      title: '',
      author: '',
      category: 'Science',
      year: '',
      description: '',
      externalUrl: '',
      cover: 'https://placehold.co/150x200/4B5EAA/ffffff?text=Book',
    });
    setIsModalOpen(false);
    // TODO: Replace with backend API call, e.g., axios.post('/api/v1/library/books', newBook)
  };

  return (
    <div className="space-y-6">
      {/* Header with Search, Resources Link, and Add Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-center"
      >
        <div className="mb-4 md:mb-0">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            E-Library
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover and explore academic resources.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search by title, author, or category..."
              className={`w-full bg-opacity-50 rounded-xl py-3 pl-12 pr-4 border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-700/50 text-white placeholder-gray-400'
                  : 'bg-white/50 text-gray-900 placeholder-gray-500'
              }`}
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search
              className={`h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
          </div>
          <div className="flex gap-4">
            <Link
              to="/app/resources"
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              <FolderOpen className="w-5 h-5 mr-2" />
              More Resources
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Resource
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Add Resource Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`p-6 rounded-xl max-w-lg w-full mx-4 ${
                darkMode
                  ? 'bg-gray-800/90 border-gray-700/50'
                  : 'bg-white/90 border-white/50'
              }`}
            >
              <h2 className={`text-xl font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Add New Resource
              </h2>
              <form onSubmit={handleAddBook} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg py-2 px-3 border-0 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700/50 text-white placeholder-gray-400'
                        : 'bg-white/50 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter book title"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg py-2 px-3 border-0 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700/50 text-white placeholder-gray-400'
                        : 'bg-white/50 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter author name"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Category *
                  </label>
                  <select
                    name="category"
                    value={newBook.category}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg py-2 px-3 border-0 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700/50 text-white'
                        : 'bg-white/50 text-gray-900'
                    }`}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Year *
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={newBook.year}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg py-2 px-3 border-0 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700/50 text-white placeholder-gray-400'
                        : 'bg-white/50 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter publication year"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newBook.description}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg py-2 px-3 border-0 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700/50 text-white placeholder-gray-400'
                        : 'bg-white/50 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter description"
                    rows="4"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    External URL
                  </label>
                  <input
                    type="url"
                    name="externalUrl"
                    value={newBook.externalUrl}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg py-2 px-3 border-0 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700/50 text-white placeholder-gray-400'
                        : 'bg-white/50 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter external URL"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    name="cover"
                    value={newBook.cover}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg py-2 px-3 border-0 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700/50 text-white placeholder-gray-400'
                        : 'bg-white/50 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter cover image URL"
                  />
                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className={`flex-1 rounded-lg py-2 px-4 font-semibold transition-all duration-200 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    Add Resource
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={`flex-1 rounded-lg py-2 px-4 font-semibold transition-all duration-200 ${
                      darkMode
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70'
                  : 'bg-white/50 border-gray-200 hover:bg-white/70'
              } p-6 flex flex-col items-center text-center`}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full max-w-[150px] h-auto object-cover rounded-lg mb-4"
                onError={(e) => (e.target.src = 'https://placehold.co/150x200/4B5EAA/ffffff?text=Book')}
              />
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {book.title}
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                by {book.author}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                {book.category} ({book.year})
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-3 line-clamp-3`}>
                {book.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (book.externalUrl) window.open(book.externalUrl, '_blank');
                  else alert('Details not available');
                }}
                className={`mt-4 w-full rounded-lg py-2 px-4 font-semibold transition-all duration-200 ${
                  darkMode
                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                View Details
              </motion.button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No books found matching your search.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ElibraryPage;