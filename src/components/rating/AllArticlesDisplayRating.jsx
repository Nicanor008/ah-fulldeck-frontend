import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const AllArticlesDisplayRating = articles => (
  <div>
    <StarRatingComponent
      name="rate2"
      editing={false}
      starCount={5}
      value={articles.rating}
    />
  </div>
);

export default AllArticlesDisplayRating;
