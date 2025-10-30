import React, { useState, useEffect } from "react";
import { Search, BookOpen, Loader2, Filter, SortAsc } from "lucide-react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";
import NoResults from "./components/NoResults";
import BookDetailModal from "./components/BookDetailModal";

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [numFound, setNumFound] = useState(0);
  const [searched, setSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    hasEbook: false,
    yearFrom: "",
    yearTo: "",
    language: "",
    publisher: "",
  });

  // 🔄 Fetch data from Open Library API
  const fetchBooks = async () => {
    if (!searchQuery.trim()) return;
  
    setLoading(true);
    try {
      // ✅ Base URL
      let url = `https://openlibrary.org/search.json?${searchType}=${encodeURIComponent(searchQuery)}&page=${page}`;
  
      // ✅ Apply API-based filters
      if (filters.language) url += `&language=${filters.language}`;
      if (filters.publisher) url += `&publisher=${encodeURIComponent(filters.publisher)}`;
      if (filters.hasEbook) url += `&has_fulltext=true`;
  
      // ✅ Request only needed fields for performance
      url += `&fields=key,title,author_name,first_publish_year,cover_i,edition_count,has_fulltext,ebook_access,ratings_average`;
  
      const { data } = await axios.get(url);
  
      let results = data.docs || [];
  
      // ✅ Local filter for year range (API doesn’t handle this well)
      const fromYear = parseInt(filters.yearFrom, 10);
      const toYear = parseInt(filters.yearTo, 10);
  
      if (!Number.isNaN(fromYear)) {
        results = results.filter(
          (b) => b.first_publish_year && b.first_publish_year >= fromYear
        );
      }
      if (!Number.isNaN(toYear)) {
        results = results.filter(
          (b) => b.first_publish_year && b.first_publish_year <= toYear
        );
      }
  
      // ✅ Sorting
      if (sortBy === "new") {
        results.sort(
          (a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0)
        );
      } else if (sortBy === "old") {
        results.sort(
          (a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0)
        );
      } else if (sortBy === "top") {
        // Sort by ratings if available, else move unrated ones below
        results.sort(
          (a, b) => (b.ratings_average || 0) - (a.ratings_average || 0)
        );
      }
  
      setBooks(results);
      setNumFound(data.numFound || results.length);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search trigger
  const handleSearch = () => {
    if (!searchQuery.trim()) return; // prevent empty search
    setPage(1);
    setSearched(true); // ✅ mark that user has performed a search
    fetchBooks();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchBooks();
  };

  const clearFilters = () => {
    setFilters({
      hasEbook: false,
      yearFrom: "",
      yearTo: "",
      language: "",
      publisher: "",
    });
    setSortBy("");
  };

  const quickSearch = (subject) => {
    setSearchType("subject");
    setSearchQuery(subject);
    setPage(1);
    setSearched(true);
    fetchBooks();
  };

  const goHome = () => {
    setBooks([]);
    setSearchQuery("");
    setSearchType("title");
    setShowFilters(false);
    setSortBy("");
    clearFilters();
    setSearched(false);
  };

  useEffect(() => {
    if (searchQuery.trim()) fetchBooks();
  }, [page, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1
            onClick={goHome}
            className="text-3xl font-bold flex items-center gap-2 cursor-pointer text-indigo-700 hover:text-indigo-900 transition"
          >
            <BookOpen className="text-indigo-600" /> Book Finder
          </h1>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="subject">Subject</option>
                <option value="isbn">ISBN</option>
                <option value="all">All Fields</option>
              </select>

              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={`Search by ${searchType}...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasEbook}
                      onChange={(e) =>
                        setFilters({ ...filters, hasEbook: e.target.checked })
                      }
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Has E-book</span>
                  </label>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Year From
                    </label>
                    <input
                      type="number"
                      value={filters.yearFrom}
                      onChange={(e) =>
                        setFilters({ ...filters, yearFrom: e.target.value })
                      }
                      placeholder="e.g., 2000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Year To
                    </label>
                    <input
                      type="number"
                      value={filters.yearTo}
                      onChange={(e) =>
                        setFilters({ ...filters, yearTo: e.target.value })
                      }
                      placeholder="e.g., 2024"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Language
                    </label>
                    <select
                      value={filters.language}
                      onChange={(e) =>
                        setFilters({ ...filters, language: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">All Languages</option>
                      <option value="eng">English</option>
                      <option value="spa">Spanish</option>
                      <option value="fre">French</option>
                      <option value="ger">German</option>
                      <option value="chi">Chinese</option>
                      <option value="jpn">Japanese</option>
                      <option value="rus">Russian</option>
                      <option value="ita">Italian</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Publisher
                    </label>
                    <input
                      type="text"
                      value={filters.publisher}
                      onChange={(e) =>
                        setFilters({ ...filters, publisher: e.target.value })
                      }
                      placeholder="e.g., Penguin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <SortAsc className="w-4 h-4 text-gray-600" />
                    <label className="text-sm text-gray-700">Sort by:</label>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Relevance</option>
                    <option value="new">Newest First</option>
                    <option value="old">Oldest First</option>
                    <option value="top">Top Rated</option>
                    <option value="random">Random</option>
                    <option value="title">Title A-Z</option>
                  </select>

                  <button
                    onClick={clearFilters}
                    className="ml-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Welcome Screen */}
        {!loading && books.length === 0 && !searchQuery && (
          <div className="text-center py-16">
            <BookOpen className="w-20 h-20 text-indigo-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Your Next Great Read
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Search millions of books by title, author, subject, or ISBN. Find
              both physical editions and e-books with advanced filters and
              sorting.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Fiction",
                "Science",
                "History",
                "Biography",
                "Poetry",
                "Philosophy",
              ].map((subject) => (
                <button
                  key={subject}
                  onClick={() => quickSearch(subject)}
                  className="px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition font-medium"
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Book Results */}
        {loading ? (
          <Loader />
        ) : books.length > 0 ? (
          <>
            <BookList books={books} setSelectedBook={setSelectedBook} />
            <Pagination
              page={page}
              setPage={setPage}
              total={numFound}
              perPage={100}
            />

            {/* Book Detail Modal */}
            {selectedBook && (
              <BookDetailModal
                book={selectedBook}
                onClose={() => setSelectedBook(null)}
              />
            )}
          </>
        ) : (
          searched && !loading && <NoResults />
        )}
      </div>
    </div>
  );
}
