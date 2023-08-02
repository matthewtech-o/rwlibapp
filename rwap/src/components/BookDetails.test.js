// components/BookDetails.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import BookDetails from './BookDetails';

// Mock axios for the integration test
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { book_id: 1, title: 'Book 1', status: 'available' } })),
}));

describe('BookDetails Component', () => {
  it('displays book details', async () => {
    // Render the BookDetails component with a mocked bookId
    render(<BookDetails bookId={1} />);

    // Check if book details are fetched and displayed correctly
    const bookTitle = await screen.findByText('Book 1');
    expect(bookTitle).toBeInTheDocument();

    const bookStatus = screen.getByText('available');
    expect(bookStatus).toBeInTheDocument();
  });
});
