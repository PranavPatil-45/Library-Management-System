import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEdit, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser, FiBook, FiClock } from 'react-icons/fi';

const MemberDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { members } = useSelector((state) => state.members);
  const { books } = useSelector((state) => state.books);
  const [member, setMember] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (members && id) {
      const foundMember = members.find(m => m.id === id);
      setMember(foundMember);
      
      if (foundMember && foundMember.borrowedBooks && books) {
        const borrowed = books.filter(book => 
          foundMember.borrowedBooks.includes(book.id)
        );
        setBorrowedBooks(borrowed);
      }
      setLoading(false);
    }
  }, [members, books, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading member details...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Member not found</h2>
          <button 
            onClick={() => navigate('/dashboard/members')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Members
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/dashboard/members')}
                className="mr-4 p-2 rounded-full hover:bg-indigo-500 transition-colors"
              >
                <FiArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold">Member Details</h1>
            </div>
            <Link
              to={`/dashboard/edit-member/${member.id}`}
              className="p-2 rounded-full hover:bg-indigo-500 transition-colors"
            >
              <FiEdit size={20} />
            </Link>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Member Photo/Icon */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
                    <img src={member.image || ''} alt="" className="w-32 h-32 rounded-full object-cover" />
                </div>
              </div>
              
              {/* Member Details */}
              <div className="flex-grow">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {member.firstName} {member.lastName}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center">
                    <FiMail className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">{member.email}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FiPhone className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">{member.phone}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FiMapPin className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">{member.address}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FiCalendar className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">
                      {new Date(member.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center text-xs font-bold
                      ${member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {member.status === 'active' ? 'A' : 'I'}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="w-5 h-5 bg-blue-100 text-blue-800 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
                      M
                    </span>
                    <span className="text-gray-700 capitalize">{member.membershipType}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-600">Member since: {new Date(member.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            {/* Borrowed Books Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Borrowed Books ({borrowedBooks.length})</h3>
              
              {borrowedBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {borrowedBooks.map(book => (
                    <div key={book.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <div className="bg-indigo-100 p-2 rounded-md mr-3">
                          <FiBook className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-800">{book.title}</h4>
                          <p className="text-sm text-gray-600">by {book.author}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <FiClock className="mr-1" />
                            <span>Due: {book.dueDate ? new Date(book.dueDate).toLocaleDateString() : 'Not specified'}</span>
                          </div>
                        </div>
                        <Link
                          to={`/dashboard/book/${book.id}`}
                          className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          View Book
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">This member hasn't borrowed any books.</p>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => navigate('/dashboard/members')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back to Members
              </button>
              <Link
                to={`/dashboard/borrow-book?memberId=${member.id}`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Borrow Book
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MemberDescription;