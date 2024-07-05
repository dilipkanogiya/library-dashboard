import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold">Library Dashboard</Link>
        </div>
        <div className="flex space-x-4">
          <div className="dropdown">
            <button className="dropbtn">Books</button>
            <div className="dropdown-content">
              <Link to="/books">Add Book</Link>
              <Link to="/book-list">View Books</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Authors</button>
            <div className="dropdown-content">
              <Link to="/authors">Add Author</Link>
              <Link to="/author-list">View Authors</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;