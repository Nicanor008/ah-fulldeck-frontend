import React from 'react';
import PropTypes from 'prop-types';
import './bookmark.scss';

const BookmarkIcon = ({ onBookmarkClick }) => (
  <div>
    <button className="bookmark" type="submit" onClick={onBookmarkClick}>
      <i className="fas fa-bookmark notbookmarked" id="bookmark" />
    </button>
  </div>
);

BookmarkIcon.propTypes = {
  onBookmarkClick: PropTypes.func.isRequired,
};

export default BookmarkIcon;
