// App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/books/:bookId" component={BookPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
