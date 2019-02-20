import {
  LIKE_ARTICLE_REQUEST,
  LIKE_ARTICLE_SUCCESS,
  LIKE_ARTICLE_FAILURE,
  DISLIKE_ARTICLE_REQUEST,
  DISLIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_FAILURE,
} from '../actions/types';

// eslint-disable-next-line import/prefer-default-export
export const likeDislike = (state = {}, action) => {
  switch (action.type) {
    case LIKE_ARTICLE_REQUEST:
      return { ...state, isLiking: true };
    case LIKE_ARTICLE_FAILURE:
      return {
        ...state,
        isLiking: false,
        errors: action.payload.response.data,
      };
    case LIKE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLiking: false,
        liked: true,
        disliked: false,
      };
    case DISLIKE_ARTICLE_REQUEST:
      return { ...state, isDisliking: true };
    case DISLIKE_ARTICLE_FAILURE:
      return {
        ...state,
        isDisliking: false,
        errors: action.payload.response.data,
      };
    case DISLIKE_ARTICLE_SUCCESS:
      return {
        ...state,
        isDisliking: false,
        liked: false,
        disliked: true,
      };
    default:
      return state;
  }
};
