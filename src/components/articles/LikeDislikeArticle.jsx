import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// eslint-disable-next-line import/no-unresolved
import '../../assets/styles/Likes.scss';
import { like, dislike } from '../../actions/likeDislikeActions';

class LikesDislikes extends Component {
  handleLike = (e) => {
    e.preventDefault();
    const { likeArticle, article } = this.props;
    likeArticle(article.article.slug);
  };

  handleDislike = (e) => {
    e.preventDefault();
    const { dislikeArticle, article } = this.props;
    dislikeArticle(article.article.slug);
  };

  render() {
    const { article, isLiking, isDisliking } = this.props;

    return (
      <div className="likecontainer">
        <button
          type="button"
          id="likebutton"
          className="btn btn-default btn-responsive up_button"
          onClick={this.handleLike}
        >
          {isLiking ? (
            <i className="fa fa-spinner fa-spin like-spinners thumbsup" />
          ) : (
            <i className="fa fa-thumbs-up fa-2x thumbsup" id="thumbsup" />
          )}
        </button>
        {article.article.likes}
        <button
          type="button"
          id="likebutton"
          className="btn btn-default btn-responsive up_button"
          onClick={this.handleDislike}
        >
          {isDisliking ? (
            <i className="fa fa-spinner fa-spin like-spinners thumbsdown" />
          ) : (
            <i className="fa fa-thumbs-down fa-2x thumbsdown" id="thumbsdown" />
          )}
        </button>
        {article.article.dislikes}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLiking: state.likeDislike.isLiking,
  isDisliking: state.likeDislike.isDisliking,
});

const mapDispatchToProps = (dispatch) => ({
  likeArticle: bindActionCreators(like, dispatch),
  dislikeArticle: bindActionCreators(dislike, dispatch),
});

LikesDislikes.defaultProps = {
  isLiking: false,
  isDisliking: false,
};

LikesDislikes.propTypes = {
  article: PropTypes.object.isRequired,
  likeArticle: PropTypes.func.isRequired,
  dislikeArticle: PropTypes.func.isRequired,
  isLiking: PropTypes.bool,
  isDisliking: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikesDislikes);
