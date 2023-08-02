// routes/books.js

const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get a list of all books
router.get('/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Books');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching books', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Borrow a book
router.post('/books/:book_id/borrow', async (req, res) => {
  const bookId = req.params.book_id;
  const borrowerId = req.body.borrower_id;
  const borrowTime = new Date().toISOString();

  try {
    // Check if the book is available
    const bookResult = await pool.query('SELECT * FROM Books WHERE book_id = $1', [bookId]);
    const book = bookResult.rows[0];
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.status !== 'available') {
      return res.status(409).json({ error: 'Book is not available for borrowing' });
    }

    // Update the book status, borrower_id, and borrow_time
    await pool.query(
      'UPDATE Books SET status = $1, borrower_id = $2, borrow_time = $3 WHERE book_id = $4',
      ['borrowed', borrowerId, borrowTime, bookId]
    );

    res.json({ message: 'Book borrowed successfully' });
  } catch (error) {
    console.error('Error borrowing book', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Return a book
router.post('/books/:book_id/return', async (req, res) => {
  const bookId = req.params.book_id;

  try {
    // Check if the book is borrowed
    const bookResult = await pool.query('SELECT * FROM Books WHERE book_id = $1', [bookId]);
    const book = bookResult.rows[0];
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.status !== 'borrowed') {
      return res.status(409).json({ error: 'Book is not currently borrowed' });
    }

    // Update the book status, borrower_id, and return_time
    await pool.query('UPDATE Books SET status = $1, borrower_id = NULL, borrow_time = NULL WHERE book_id = $2', ['available', bookId]);

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Error returning book', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;