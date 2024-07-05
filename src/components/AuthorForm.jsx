import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const AuthorForm = ({ addAuthor, updateAuthor, authors = [] }) => {
  const { name } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(name);
  const author = isEditing ? authors.find(a => a.name === name) : { name: '', birthDate: '', biography: '' };

  const initialValues = author;

  const validationSchema = Yup.object({
    name: Yup.string().required('Required').min(3, 'Name must be at least 3 characters').test('unique-name', 'Author name must be unique', value => {
      return !authors.some(author => author.name === value && author.name !== name);
    }),
    birthDate: Yup.date().required('Required').max(new Date(), 'Birth date cannot be in the future'),
    biography: Yup.string().required('Required').min(10, 'Biography must be at least 10 characters')
  });

  const onSubmit = (values, { resetForm }) => {
    if (isEditing) {
      updateAuthor(values);
    } else {
      addAuthor(values);
    }
    resetForm();
    navigate('/author-list');
  };

  return (
    <div className="form-container">
      <h2 className="text-xl font-bold">{isEditing ? 'Edit' : 'Add'} Author</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className="form-field">
            <label htmlFor="birthDate">Birth Date</label>
            <Field type="date" id="birthDate" name="birthDate" />
            <ErrorMessage name="birthDate" component="div" className="error" />
          </div>

          <div className="form-field">
            <label htmlFor="biography">Biography</label>
            <Field as="textarea" id="biography" name="biography" />
            <ErrorMessage name="biography" component="div" className="error" />
          </div>

          <button type="submit" className="btn">{isEditing ? 'Update' : 'Submit'}</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AuthorForm;