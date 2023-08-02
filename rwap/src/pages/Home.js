// pages/Home.js
import React from 'react';
import BookList from '../components/BookList';

function Home() {
  return (
    <div>
      <h1>Welcome to the Library</h1>
      <BookList />
    </div>
  );
}

export default Home;