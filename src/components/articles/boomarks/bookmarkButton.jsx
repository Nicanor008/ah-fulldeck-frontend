import React from 'react';
import PropTypes from 'prop-types';
import './bookmark.scss';

const BookmarkIcon = ({ onBookmarkClick, bookmark }) => (
  <div>
    <button className="bookmark" type="submit" onClick={onBookmarkClick}>
      {bookmark ? <i className="fas fa-bookmark bookmarked" id="bookmark" /> : <i className="fas fa-bookmark notbookmarked" id="bookmark" />}
    </button>
  </div>
);

BookmarkIcon.propTypes = {
  onBookmarkClick: PropTypes.func.isRequired,
  bookmark: PropTypes.string.isRequired,
};

export default BookmarkIcon;
