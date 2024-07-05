import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Library Dashboard</h1>
      <Link to="/books" className="btn">Add Book</Link>
      <Link to="/authors" className="btn">Add Author</Link>
      <Link to="/book-list" className="btn">View Books</Link>
      <Link to="/author-list" className="btn">View Authors</Link>
    </div>
  );
}

export default Dashboard;