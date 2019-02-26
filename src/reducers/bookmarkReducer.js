import {
  BOOKMARK_ARTICLE,
  BOOKMARK_ARTICLE_FAILURE,
  UNBOOKMARK_ARTICLE,
  GET_ALL_BOOKMARKS_SUCCESS,
  GET_ALL_BOOKMARKS_FAIL,
} from '../actions/types';

export const initialState = {
  isBookmarked: false,
  bookmarks: [],
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
    case GET_ALL_BOOKMARKS_SUCCESS:
      return {
        bookmarks: action.data,
      };
    case GET_ALL_BOOKMARKS_FAIL:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};

export default bookmarkArticlesReducer;
