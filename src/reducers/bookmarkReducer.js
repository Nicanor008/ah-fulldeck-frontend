import { BOOKMARK_ARTICLE, BOOKMARK_ARTICLE_FAILURE, UNBOOKMARK_ARTICLE } from '../actions/types';

export const initialState = {
  isBookmarked: false,
};

const bookmarkArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKMARK_ARTICLE:
      return {
        ...state,
        isBookmarked: true,
      };
    case UNBOOKMARK_ARTICLE:
      return {
        ...state,
        isBookmarked: false,
      };
    case BOOKMARK_ARTICLE_FAILURE:
      return {
        ...state,
        isBookmarked: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookmarkArticlesReducer;
