import { COMMENT_REQUEST, COMMENT_SUCCESS, COMMENT_ERROR } from '../actions/types';

const initialState = {
  isLoading: false,
  slug: '',
  errors: {},
  comment: {},
  comments: [],
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };
    case COMMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};

export default commentsReducer;
