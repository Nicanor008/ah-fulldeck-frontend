import {
  SUCCESSFUL_RATING,
  RATING_ERROR,
  RATING_REQUEST,
} from '../../actions/types';

const ratingReducer = (state = {}, action) => {
  switch (action.type) {
    case RATING_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case RATING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESSFUL_RATING:
      return {
        ...state,
        isLoading: false,
        userRating: action.payload,
      };
    default:
      return state;
  }
};

export default ratingReducer;
