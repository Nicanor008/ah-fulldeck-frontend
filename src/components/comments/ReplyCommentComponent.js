/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
// import ComponentButton from './ComponentButton';
import './Comments.scss';
import 'bootstrap';

const ReplyCommentComponent = ({
  comment: {
    author, created_at, body,
  },
}) => (
  <div className="container w-80 mt-3 mr-20">
    <div className="col-md-6 mr-10">
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
      <div className="card-text border-0 bg-light text-muted mr-5 mt-2 w-100 p-3">
        {' '}
        {body}
        <br />
      </div>
    </div>
  </div>
);

export default ReplyCommentComponent;
