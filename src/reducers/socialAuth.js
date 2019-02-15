import {
    FACEBOOK,
    GOOGLE,
    TWITTER,
    RECEIVE_DATA,
    FETCHING,
    FETCH_FAILED,
  } from '../actions/types';
  
  const initialState = {
    message: '',
  };
  
  export default function socialAuth(state = initialState, action) {
    switch (action.type) {
      case FACEBOOK:
        return { ...state, ...action.payload };
      case GOOGLE:
        return { ...state, ...action.payload };
      case TWITTER:
        return { ...state, ...action.payload };
      case RECEIVE_DATA:
        return { ...state, ...action.payload };
      case FETCHING:
        return { ...state, ...action.payload };
      case FETCH_FAILED:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }
