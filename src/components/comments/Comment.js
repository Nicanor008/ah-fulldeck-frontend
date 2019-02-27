/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap';
import ComponentButton from './ComponentButton';
import './Comments.scss';
import UpdateComment from './UpdateComment';

const Comment = ({
  comment: {
    author_image, author, created_at, body, id,
  }, article: { article },
}) => (
  <div className="container mt-3">
    <div className="col-md-6 ml-2">
      <img src={author_image} alt="Avatar" className="avatar" />
      <p className="d-inline text-muted ml-2">
        <strong>
          {' '}
          {author}{' '}
          <span className="ml-2 text-secondary-10">
            {' '}
            {new Date(created_at).toDateString()}{' '}
          </span>
        </strong>
      </p>
      <div className="card-text border-0 bg-light text-muted mt-2">
        {' '}
        <div className="p-3">
          {body}
        </div>
        <br /> <br />
        <div className="col-md-8" style={{ float: 'right' }}>
          <UpdateComment id={id} slug={article.slug} body={body} author={author} />
          <ComponentButton
            type="submit"
            id="reply"
            clazz="fas fa-reply"
            value="Reply"
          />
          <br />
        </div>
        <br />
        <hr />
      </div>
    </div>
  </div>
);

export default Comment;
