// components/BorrowBook.js

import React, { useState } from 'react';
import axios from 'axios';

const BorrowBook = () => {
  const [bookId, setBookId] = useState('');
  const [borrowerId, setBorrowerId] = useState('');
  const [message, setMessage] = useState('');

  const handleBorrow = () => {
    // Send a POST request to borrow the book
    axios
      .post(`http://localhost:3000/api/books/${bookId}/borrow`, { borrower_id: borrowerId })
      .then((response) => {
        setMessage(`Book with ID ${bookId} has been borrowed by ${borrowerId}`);
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Borrow a Book</h2>
      <label>
        Book ID:
        <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
      </label>
      <br />
      <label>
        Borrower ID:
        <input type="text" value={borrowerId} onChange={(e) => setBorrowerId(e.target.value)} />
      </label>
      <br />
      <button onClick={handleBorrow}>Borrow</button>
      <p>{message}</p>
    </div>
  );
};

export default BorrowBook;
