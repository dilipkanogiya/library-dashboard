import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books, deleteBook }) => {
  return (
    <div className="list-container">
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-xl font-bold">Books</h2>
        <Link to="/books" className="btn">Add New Book</Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className='bg-black text-white'>
            <th className="py-2">Book Name</th>
            <th className="py-2">Author</th>
            <th className="py-2">ISBN</th>
            <th className="py-2">Published Date</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.isbn} className="">
              <td className="py-2">{book.title}</td>
              <td className="py-2">{book.author}</td>
              <td className="py-2">{book.isbn}</td>
              <td className="py-2">{new Date(book.publicationDate).toLocaleDateString()}</td>
              <td className="py-2">
                <Link to={`/books/edit/${book.isbn}`} className="btn mr-2">Edit</Link>
                <button onClick={() => deleteBook(book.isbn)} className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;