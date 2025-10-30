import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ searchQuery, setSearchQuery, searchType, setSearchType, onSearch }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={`Search by ${searchType}`}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="isbn">ISBN</option>
      </select>

      <button
        onClick={onSearch}
        className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <Search className="w-4 h-4 mr-2" /> Search
      </button>
    </div>
  );
}
