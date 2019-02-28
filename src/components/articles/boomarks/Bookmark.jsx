import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import BookmarkIcon from './bookmarkButton';
import { bookmarkArticle } from '../../../actions/bookmarkActions';

class BookmarkArticle extends Component {
  handleBookmark = () => {
    const { slug } = this.props;
    this.props.bookmark(slug);
  };


  render() {
    const { bookmarked } = this.props;
    return (
      <BookmarkIcon
        onBookmarkClick={this.handleBookmark}
        bookmark={bookmarked}
      />
    );
  }
}
BookmarkArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  bookmark: PropTypes.func.isRequired,
  bookmarked: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ bookmark: bookmarkArticle }, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(BookmarkArticle);
