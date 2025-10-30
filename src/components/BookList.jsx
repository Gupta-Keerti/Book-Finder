import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books , setSelectedBook  }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
      {books.map((book, index) => (
        <BookCard key={index} book={book} setSelectedBook ={setSelectedBook } />
      ))}
    </div>
  );
}
