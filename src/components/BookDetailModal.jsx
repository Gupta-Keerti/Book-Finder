import React from "react";
import { X, Book, Download, ExternalLink, Star } from "lucide-react";

export default function BookDetailModal({ book, onClose }) {
  const getCoverUrl = (book, size = "L") => {
    return book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`
      : null;
  };
  const getEbookBadge = (book) => {
    if (book.ebook_access === "public") return { text: "Available for Free" };
    if (book.ebook_access === "borrowable") return { text: "Available for Borrowing" };
    return null;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover Image */}
            <div className="md:w-1/3">
              {getCoverUrl(book, "L") ? (
                <img
                  src={getCoverUrl(book, "L")}
                  alt={book.title}
                  className="w-full rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
                  <Book className="w-20 h-20 text-gray-400" />
                </div>
              )}
            </div>

            {/* Book Info */}
            <div className="md:w-2/3 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">{book.title}</h3>
              {book.author_name && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Authors</p>
                  <p className="text-gray-900">{book.author_name.join(", ")}</p>
                </div>
              )}

              {book.first_publish_year && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">First Published</p>
                  <p className="text-gray-900">{book.first_publish_year}</p>
                </div>
              )}

              {book.edition_count && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Editions</p>
                  <p className="text-gray-900">{book.edition_count}</p>
                </div>
              )}

              {/* ⭐ Rating Section */}
              {(book.ratings_average || book.ratings_count) && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Ratings</p>
                  <div className="flex items-center gap-2 text-gray-900">
                    {book.ratings_average ? (
                      <>
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">
                          {book.ratings_average.toFixed(2)} / 5
                        </span>
                      </>
                    ) : (
                      <span>No rating available</span>
                    )}
                    {book.ratings_count && (
                      <span className="text-sm text-gray-500">
                        ({book.ratings_count} reviews)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Ebook Availability */}
              {getEbookBadge(book) && (
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-600">
                    E-book {getEbookBadge(book).text}
                  </span>
                </div>
              )}

              {/* View Button */}
              <div className="flex gap-3 pt-4">
                <a
                  href={`https://openlibrary.org${book.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <ExternalLink className="w-5 h-5" />
                  View on Open Library
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
