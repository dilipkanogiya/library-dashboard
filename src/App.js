import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookForm from './components/BookForm';
import AuthorForm from './components/AuthorForm';
import Dashboard from './components/Dashboard';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import Navbar from './components/Navbar';

const App = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentAuthor, setCurrentAuthor] = useState(null);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map(book => book.isbn === updatedBook.isbn ? updatedBook : book));
  };

  const deleteBook = (isbn) => {
    setBooks(books.filter(book => book.isbn !== isbn));
  };

  const addAuthor = (author) => {
    setAuthors([...authors, author]);
  };

  const updateAuthor = (updatedAuthor) => {
    setAuthors(authors.map(author => author.name === updatedAuthor.name ? updatedAuthor : author));
  };

  const deleteAuthor = (name) => {
    setAuthors(authors.filter(author => author.name !== name));
  };

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<BookForm addBook={addBook} authors={authors} />} />
          <Route path="/books/edit/:isbn" element={<BookForm addBook={addBook} updateBook={updateBook} authors={authors} books={books} />} />
          <Route path="/authors" element={<AuthorForm addAuthor={addAuthor} />} />
          <Route path="/authors/edit/:name" element={<AuthorForm addAuthor={addAuthor} updateAuthor={updateAuthor} authors={authors} />} />
          <Route path="/book-list" element={<BookList books={books} deleteBook={deleteBook} setCurrentBook={setCurrentBook} />} />
          <Route path="/author-list" element={<AuthorList authors={authors} deleteAuthor={deleteAuthor} setCurrentAuthor={setCurrentAuthor} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;