import { LOGIN_USER, LOGIN_ERROR } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_ERROR:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
}
