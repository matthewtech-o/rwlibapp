// components/BookList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of books from the backend API
    axios.get('http://localhost:3000/api/books').then((response) => {
      setBooks(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.book_id}>
            <strong>Title:</strong> {book.title}, <strong>Status:</strong> {book.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
