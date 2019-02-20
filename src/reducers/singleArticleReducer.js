import * as types from '../actions/types';

const initialState = { notFetching: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SINGLE_ARTICLE: {
      return {
        ...state,
        article: action.payload,
        notFetching: true,
      };
    }
    default:
      return state;
  }
};
