import { GET_ALL_PROFILES, FOLLOW_USER_SUCCESS } from '../../actions/types';

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PROFILES:
      return {
        ...state,
        usersProfiles: action.payload,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        follow: action.payload,
      };

    default:
      return state;
  }
}
