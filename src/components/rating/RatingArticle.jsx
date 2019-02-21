/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userRatingArticle } from '../../actions/Rating/articleRatingAction';

class Rating extends Component {
  onStarClick = (state, nextValue) => {
    const { slug } = this.props.match.params;
    this.setState({ rating: nextValue });
    this.props.userRatingArticle(slug, state);
  };

  render() {
    return (
      <React.Fragment>
        <div className="mt-5">
          <span>Rate this article</span>
          <br />
          <StarRatingComponent
            name="rateArticle"
            starCount={5}
            onStarClick={this.onStarClick}
          />
          {this.props.isLoading && (
            <i className="fas fa-spinner fa-spin ml-2" />
          )}
        </div>
      </React.Fragment>
    );
  }
}
Rating.propTypes = {
  userRatingArticle: PropTypes.func.isRequired,
  isLoading: PropTypes.func,
  match: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  rating: state.rating,
});

export default connect(
  mapStateToProps,
  { userRatingArticle },
)(Rating);
