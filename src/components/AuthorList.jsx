import React from 'react';
import { Link } from 'react-router-dom';

const AuthorList = ({ authors, deleteAuthor }) => {
  return (
    <div className="list-container">
        <div className='flex justify-between items-center mb-4'>
            <h2 className="text-xl font-bold">Authors</h2>
            <Link to="/authors" className="btn">Add New Author</Link>
        </div>
        <table className="min-w-full bg-white">
        <thead>
          <tr className='bg-black text-white text-left'>
            <th className="py-2 px-1">Author Name</th>
            <th className="py-2 px-1">DOB</th>
            <th className="py-2 px-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author => (
            <tr key={author.name} className="">
              <td className="py-2">{author.name}</td>
              <td className="py-2">{author.birthDate}</td>
              <td className="py-2">
                <Link to={`/authors/edit/${author.name}`} className="btn mr-2">Edit</Link>
                <button onClick={() => deleteAuthor(author.name)} className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuthorList;