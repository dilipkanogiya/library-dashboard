import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const BookForm = ({ addBook, updateBook, authors = [], books = [] }) => {
  const { isbn } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(isbn);
  const book = isEditing ? books.find(b => b.isbn === isbn) : { title: '', author: '', isbn: '', publicationDate: '' };

  const initialValues = book;

  const validationSchema = Yup.object({
    title: Yup.string().required('Required').min(3, 'Title must be at least 3 characters'),
    author: Yup.string().required('Required').oneOf(authors.map(author => author.name), 'Author must be selected'),
    isbn: Yup.string().required('Required').matches(/^[0-9\-]+$/, 'Invalid ISBN format').test('unique-isbn', 'ISBN must be unique', value => {
      return !books.some(book => book.isbn === value && book.isbn !== isbn);
    }),
    publicationDate: Yup.date().required('Required').max(new Date(), 'Publication date cannot be in the future')
  });

  const onSubmit = (values, { resetForm }) => {
    if (isEditing) {
      updateBook(values);
    } else {
      addBook(values);
    }
    resetForm();
    navigate('/book-list');
  };

  return (
    <div className="form-container">
      <h2 className="text-xl font-bold">{isEditing ? 'Edit' : 'Add'} Book</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div className="form-field">
            <label htmlFor="author">Author</label>
            <Field as="select" id="author" name="author">
              <option value="">Select Author</option>
              {authors.map(author => (
                <option key={author.name} value={author.name}>{author.name}</option>
              ))}
            </Field>
            <ErrorMessage name="author" component="div" className="error" />
          </div>

          <div className="form-field">
            <label htmlFor="isbn">ISBN</label>
            <Field type="text" id="isbn" name="isbn" />
            <ErrorMessage name="isbn" component="div" className="error" />
          </div>

          <div className="form-field">
            <label htmlFor="publicationDate">Publication Date</label>
            <Field type="date" id="publicationDate" name="publicationDate" />
            <ErrorMessage name="publicationDate" component="div" className="error" />
          </div>

          <button type="submit" className="btn">{isEditing ? 'Update' : 'Submit'}</button>
        </Form>
      </Formik>
    </div>
  );
}

export default BookForm;