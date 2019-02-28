import {
  GET_PROFILE,
  EDIT_PROFILE,
  GET_LOGGED_IN_USER_FOLLOWING,
} from '../../actions/types';

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case GET_LOGGED_IN_USER_FOLLOWING:
      return {
        ...state,
        loggedInUserfollowing: action.payload,
      };
    default:
      return state;
  }
}
