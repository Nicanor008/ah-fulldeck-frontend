import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import BookmarkIcon from './bookmarkButton';
import { bookmarkArticle } from '../../../actions/bookmarkActions';

class BookmarkArticle extends Component {
  componentDidMount() {
    this.slug = this.props.match.params.slug;
  }

  handleBookmark = () => {
    this.props.bookmark(this.slug);
  };


  render() {
    return (
      <BookmarkIcon
        onBookmarkClick={this.handleBookmark}
      />
    );
  }
}
BookmarkArticle.propTypes = {
  match: PropTypes.object.isRequired,
  bookmark: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => bindActionCreators({ bookmark: bookmarkArticle }, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(BookmarkArticle);
