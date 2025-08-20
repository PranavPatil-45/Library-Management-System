import React from 'react'
import { useSelector,useDispatch } from 'react-redux';

const BookList = () => {
    
    const{books, status, error} = useSelector((state) => state.books);
    const dispatch = useDispatch();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center tracking-tight">
      📚 Available Books
    </h1>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
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

            <button className="w-full py-2 px-4 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default BookList
