/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import {
  COMMENT_REQUEST, COMMENT_SUCCESS,
  COMMENT_ERROR, CREATED_COMMENT,
  UPDATE_COMMENT, GET_COMMENT,
  DELETE_COMMENT,
} from '../actions/types';

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
    case GET_COMMENT:
      return {
        ...state,
        isLoading: false,
        comment: action.payload,
      };
    case CREATED_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: {
          ...state.comments,
          count: state.comments.count + 1,
          comments: [
            ...state.comments.comments,
            action.payload,
          ],
        },
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: {
          ...state.comments,
          comments: state.comments.comments.map(comment => (comment.id === action.payload.id ? (comment = action.payload) : comment)),
        },
        comment: action.payload,
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          comment: [
            ...state.comments.comments,
            action.payload,
          ],
        },
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
