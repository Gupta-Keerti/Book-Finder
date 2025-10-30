import React from "react";
import { Book } from "lucide-react";

export default function NoResults() {
  return (
    <div className="text-center py-20 text-gray-500">
      <Book className="w-10 h-10 mx-auto mb-3 text-gray-400" />
      <p>No books found. Try searching for something else.</p>
    </div>
  );
}
