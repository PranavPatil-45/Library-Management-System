import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../slices/bookSlice";
import { ArrowLeft, BookOpen, Tag, Calendar, Hash, Languages, FileText } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);

  // Ensure books exist if user lands directly on details page
  useEffect(() => {
    if (!books || books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [books, dispatch]);

  const book = books?.find((b) => String(b.id) === String(id));

  if (status === "loading") {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full" role="status" aria-label="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-xl">
        Failed to load book. {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="p-6 bg-yellow-50 text-yellow-800 rounded-xl">
        Book not found.
        <div className="mt-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    author,
    image,
    description,
    status: availability,
    category,
    isbn,
    ISBN,
    publishedYear,
    publicationYear,
    pages,
    language,
  } = book;

  const bookIsbn = isbn || ISBN || "—";
  const year = publishedYear || publicationYear || "—";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">by {author || "Unknown"}</p>
        </div>

        <Link
          to="/dashboard/books"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
        >
          <ArrowLeft size={18} /> Back to Books
        </Link>
      </div>

      {/* Main Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cover */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-[3/4] bg-gray-100">
              {/* Fallback if no image */}
              {image ? (
                <img src={image} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <BookOpen className="w-14 h-14" />
                </div>
              )}
            </div>
            <div className="p-4 flex items-center justify-between">
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  availability === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {availability || "unknown"}
              </span>
              {category && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  <Tag size={14} /> {category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={20} /> Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {description || "No description provided for this title."}
            </p>

            {/* Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-gray-500">ISBN</div>
                <div className="mt-1 font-medium text-gray-900">{bookIsbn}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <Calendar size={16} /> Published
                </div>
                <div className="mt-1 font-medium text-gray-900">{year}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <BookOpen size={16} /> Pages
                </div>
                <div className="mt-1 font-medium text-gray-900">{pages || "—"}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <Languages size={16} /> Language
                </div>
                <div className="mt-1 font-medium text-gray-900">{language || "—"}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <Tag size={16} /> Category
                </div>
                <div className="mt-1 font-medium text-gray-900">{category || "—"}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <Hash size={16} /> ID
                </div>
                <div className="mt-1 font-medium text-gray-900">{id}</div>
              </div>
            </div>

            {/* CTA Area (non-destructive, UI only) */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow"
              >
                Borrow (UI)
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 shadow"
              >
                Reserve (UI)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested / Similar (optional UI using category) */}
      {category && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            More in <span className="text-indigo-600">{category}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {books
              .filter((b) => b.category === category && String(b.id) !== String(id))
              .slice(0, 3)
              .map((b) => (
                <Link
                  key={b.id}
                  to={`/dashboard/books/${b.id}`}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="aspect-[16/9] bg-gray-100">
                    {b.image ? (
                      <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <BookOpen className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-gray-900 line-clamp-1">{b.title}</div>
                    <div className="text-sm text-gray-600 line-clamp-1">{b.author}</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
