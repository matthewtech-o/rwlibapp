// components/BookList.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import BookList from './BookList';

describe('BookList Component', () => {
  it('renders a list of books', () => {
    // Mock the list of books to be displayed in the component
    const books = [
      { book_id: 1, title: 'Book 1', status: 'available' },
      { book_id: 2, title: 'Book 2', status: 'borrowed', borrower_id: 123 },
    ];

    // Render the BookList component with the mocked data
    render(<BookList />, { initialState: { books } });

    // Check if the book titles are rendered correctly
    const bookTitles = screen.getAllByText(/Book [1-2]/i);
    expect(bookTitles).toHaveLength(2);

    // Check if the status of each book is displayed correctly
    const bookStatuses = screen.getAllByText(/(available|borrowed)/i);
    expect(bookStatuses).toHaveLength(2);
  });
});
