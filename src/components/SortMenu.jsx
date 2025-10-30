import React from "react";
import { SortAsc } from "lucide-react";

export default function SortMenu({ sortType, setSortType }) {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-center gap-2">
        <SortAsc className="w-4 h-4 text-gray-600" />
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
        >
          <option value="relevance">Sort by Relevance</option>
          <option value="year">Sort by Publish Year</option>
        </select>
      </div>
    </div>
  );
}
