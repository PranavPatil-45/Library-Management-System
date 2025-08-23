import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook } from '../../slices/bookSlice';

const BookList = () => {
  const { books, status, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  
  // Calculate pagination values
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Generate page numbers for pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center tracking-tight">
          📚 Available Books
        </h1>

        {/* Books Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              {/* Book Image */}
              <div className="w-full h-72">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Book Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-6">by {book.author}</p>

                <button className="w-full py-2 px-4 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg mb-3">
                  View Details
                </button>

                <button
                  className="w-full py-2 px-4 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                  onClick={() => dispatch(deleteBook(book.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {/* Page Numbers */}
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 text-sm font-medium border rounded-lg ${
                    currentPage === number
                      ? 'text-white bg-indigo-600 border-indigo-600'
                      : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              {/* Next Button */}
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;