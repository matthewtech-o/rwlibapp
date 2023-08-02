// components/ReturnBook.js

import React from 'react';
import axios from 'axios';

const ReturnBook = ({ bookId }) => {
  const handleReturn = () => {
    // Send a POST request to return the book
    axios
      .post(`http://localhost:3000/api/books/${bookId}/return`)
      .then((response) => {
        // Handle the response or update the UI if needed
      })
      .catch((error) => {
        // Handle errors if any
      });
  };

  return (
    <div>
      <button onClick={handleReturn}>Return Book</button>
    </div>
  );
};

export default ReturnBook;
