import { LOGIN_USER, LOGIN_ERROR, LOGIN_REQUEST } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_USER:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_ERROR:
      return { ...state, isLoading: false, errors: action.payload };
    default:
      return state;
  }
}
