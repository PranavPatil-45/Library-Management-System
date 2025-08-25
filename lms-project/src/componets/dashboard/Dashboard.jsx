import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiMenu, FiBookOpen, FiHome, FiSettings, FiLogOut, FiX, FiUsers, FiBarChart2, FiPlusCircle } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, CreditCard } from "lucide-react";
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { fetchMembers } from './../../slices/membersSlice';
import { fetchBooks } from '../../slices/bookSlice';    

const Dashboard = () => {
  const { books } = useSelector((state) => state.books);
  const { members } = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    totalMembers: 0
  });

  // Get active tab from current URL path
  const pathSegments = location.pathname.split('/');
  const activeTab = pathSegments[pathSegments.length - 1] || 'dashboard';

  // Fetch members when component mounts
  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchBooks());
  }, [dispatch]);

  // Calculate stats from books and members data
  useEffect(() => {
    if (books) {
      const totalBooks = books.length;
      const availableBooks = books.filter(book => book.status === 'available').length;
      const borrowedBooks = books.filter(book => book.status === 'borrowed').length;
      const totalMembers = members.length;
      
      setStats({
        totalBooks, 
        availableBooks,
        borrowedBooks,
        totalMembers,
      });
    }
  }, [books, members]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    open: { 
      x: 0, 
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 200 
      } 
    },
    closed: { 
      x: "-100%", 
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 200 
      } 
    }
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome size={20} />, path: '/dashboard' },
    { id: 'books', label: 'Books', icon: <FiBookOpen size={20} />, path: '/dashboard/books' },
    { id: 'members', label: 'Members', icon: <FiUsers size={20} />, path: '/dashboard/members' },
    { id: 'reports', label: 'Reports', icon: <FiBarChart2 size={20} />, path: '/dashboard/reports' },
    { id: 'settings', label: 'Settings', icon: <FiSettings size={20} />, path: '/dashboard/settings' },
    { id: 'reservations', label: "Reservations", icon: <Bookmark className="w-5 h-5" />, path: '/dashboard/reservations' },
    { id: 'fines', label: "Fines", icon: <CreditCard className="w-5 h-5" />, path: '/dashboard/fines' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Fixed position to prevent scrolling */}
      <motion.aside 
        variants={sidebarVariants}
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        className={`bg-indigo-700 text-white shadow-lg flex flex-col fixed h-screen z-30 overflow-y-auto transition-all duration-300
          ${isSidebarOpen ? 'w-64' : 'w-0 lg:w-16'}`}
        style={{ position: 'fixed' }} // Ensure it's fixed
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-600">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold tracking-tight flex items-center"
          >
            <span className="mr-2">📚</span> 
            {isSidebarOpen && <span>BookDash Admin</span>}
          </motion.h2>
          {isSidebarOpen && (
            <button 
              className="p-2 rounded-lg hover:bg-indigo-600 transition-colors"
              onClick={toggleSidebar}
            >
              <FiX size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-pointer ${activeTab === item.id ? 'bg-indigo-600' : 'hover:bg-indigo-600'}`}
              onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-indigo-600">
          <button 
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer w-full"
            onClick={() => navigate('/login')}
          >
            <FiLogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content - Add margin to account for sidebar */}
      <main 
        className={`flex-1 p-8 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}
      >
        {/* Floating Menu Button for Closed Sidebar */}
        {!isSidebarOpen && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="fixed top-4 left-4 p-3 bg-indigo-600 text-white rounded-full shadow-lg z-10 hover:bg-indigo-700 transition-colors"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiMenu size={20} />
          </motion.button>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button 
              className="p-2 mr-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow lg:hidden"
              onClick={toggleSidebar}
            >
              <FiMenu size={20} />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Overview
            </h1>
          </div>
          
          {(activeTab === 'books' || activeTab === 'members') && (
            <Link 
              to={activeTab === 'books' ? '/dashboard/add-book' : '/dashboard/manage-members'}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              <FiPlusCircle size={18} />
              <span>{activeTab === 'books' ? 'Add New Book' : 'Add New Member'}</span>
            </Link>
          )}
        </div>

        {/* Stats Cards for Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div 
              variants={statCardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500"
            >
              <h3 className="text-gray-500 text-sm font-semibold mb-2">Total Books</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.totalBooks}</p>
            </motion.div>
            
            <motion.div 
              variants={statCardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500"
            >
              <h3 className="text-gray-500 text-sm font-semibold mb-2">Available Books</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.availableBooks}</p>
            </motion.div>
            
            <motion.div 
              variants={statCardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500"
            >
              <h3 className="text-gray-500 text-sm font-semibold mb-2">Borrowed Books</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.borrowedBooks}</p>
            </motion.div>
            
            <motion.div 
              variants={statCardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500"
            >
              <h3 className="text-gray-500 text-sm font-semibold mb-2">Total Members</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.totalMembers}</p>
            </motion.div>
          </div>
        )}

        {/* Content based on active tab */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          {/* Only show Outlet for routes that have components */}
          {activeTab !== 'dashboard' && activeTab !== 'reservations' && activeTab !== 'fines' && (
            <Outlet />
          )}
          
          {/* Show dashboard content */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <p className="text-gray-600">Your admin dashboard overview will go here with charts, graphs, and recent activities.</p>
              
              {/* Sample activity list */}
              <div className="mt-6 space-y-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-sm">New book "The Great Gatsby" was added</p>
                  <span className="ml-auto text-xs text-gray-500">2 hours ago</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <p className="text-sm">User John Doe borrowed "To Kill a Mockingbird"</p>
                  <span className="ml-auto text-xs text-gray-500">5 hours ago</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <p className="text-sm">Monthly report generated</p>
                  <span className="ml-auto text-xs text-gray-500">1 day ago</span>
                </motion.div>
              </div>
            </div>
          )}
          
          {/* Placeholder content for Reservations and Fines */}
          {activeTab === 'reservations' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Reservations Management</h2>
              <p className="text-gray-600">This section will contain all book reservation information and management tools.</p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                <p>Reservation management features are currently under development.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'fines' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Fines Management</h2>
              <p className="text-gray-600">This section will contain all fine-related information and payment processing.</p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                <p>Fine management features are currently under development.</p>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;