export default function BookCard({ book, setSelectedBook }) {
    const getCoverUrl = (book, size = "M") => {
      return book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`
        : null;
    };
  
    return (
      <div
        onClick={() => setSelectedBook(book)}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
      >
        <img
          src={getCoverUrl(book) || "https://via.placeholder.com/150x220?text=No+Cover"}
          alt={book.title}
          className="w-full h-60 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">{book.title}</h3>
          <p className="text-gray-600 text-sm mt-1">
            {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
          </p>
          {book.first_publish_year && (
            <p className="text-gray-500 text-sm mt-1">
              Published: {book.first_publish_year}
            </p>
          )}
        </div>
      </div>
    );
  }
  