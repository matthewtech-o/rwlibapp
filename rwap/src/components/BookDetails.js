// components/BookDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [borrower, setBorrower] = useState('');

  useEffect(() => {
    (async() => {
      const {data} = await axios.get(`http://localhost:3000/api/books/${bookId}`);
      setBook(data)
    })()
  }, [bookId])

  const handleBorrow = () => {
    // Send a POST request to borrow the book
    axios.post(`/api/books/${bookId}/borrow`, { borrower_id: borrower }).then((response) => {
      // Update the book status after borrowing
      setBook({ ...book, status: 'borrowed', borrower_id: borrower });
    });
  };

  const handleReturn = () => {
    // Send a POST request to return the book
    axios.post(`/api/books/${bookId}/return`).then((response) => {
      // Update the book status after returning
      setBook({ ...book, status: 'available', borrower_id: null });
    });
  };

  return (
    <div>
      {book ? (
        <div>
          <h2>Book Details</h2>
          <p>
            <strong>Title:</strong> {book.title}
          </p>
          <p>
            <strong>Status:</strong> {book.status}
          </p>
          {book.status === 'borrowed' && (
            <p>
              <strong>Borrower:</strong> {book.borrower_id}
            </p>
          )}
          {book.status === 'available' && (
            <div>
              <label>
                Borrower ID:
                <input type="text" value={borrower} onChange={(e) => setBorrower(e.target.value)} />
              </label>
              <button onClick={handleBorrow}>Borrow</button>
            </div>
          )}
          {book.status === 'borrowed' && <button onClick={handleReturn}>Return</button>}
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetails;
