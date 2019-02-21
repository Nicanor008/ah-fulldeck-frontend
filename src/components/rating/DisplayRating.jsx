import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const DisplayRating = article => (
  <div>
    <StarRatingComponent
      name="rate2"
      editing={false}
      starCount={5}
      value={article.article.article.avg_rating.avg_rating}
    />
  </div>
);

export default DisplayRating;
