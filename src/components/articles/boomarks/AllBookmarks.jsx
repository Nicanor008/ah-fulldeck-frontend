import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Article from '../Article';
import * as bookmarksAction from '../../../actions/bookmarkActions';
import './bookmark.scss';

class Bookmarks extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getBookmarks();
  }

  render() {
    const { allBookmarks } = this.props;
    return (
      <div>

        <div className="container">
          <br />
          <br />

          <h1 className="bookmarktitle">Bookmarks</h1>
          <br />
          <br />
          {
                allBookmarks.length === 0 ? (
                  <h3> You have not bookmarked any article yet!!</h3>
                ) : (
                  allBookmarks.map(bookmark => (
                    <Article
                      key={bookmark.id}
                      title={bookmark.title}
                      description={bookmark.description}
                      author={bookmark.author}
                      slug={bookmark.slug}
                      image_url={bookmark.image_url}
                      created_at={new Date(bookmark.created_at).toDateString()}
                      like={bookmark.likes}
                      dislike={bookmark.dislikes}
                      rating={bookmark.avg_rating.avg_rating}
                      bookmarked={bookmark.bookmarked}
                    />
                  ))
                )
              }
        </div>

      </div>
    );
  }
}

Bookmarks.propTypes = {
  actions: PropTypes.object.isRequired,
  allBookmarks: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    allBookmarks: state.bookmark.bookmarks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bookmarksAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
