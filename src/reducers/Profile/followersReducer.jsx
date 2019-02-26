import { GET_FOLLOWERS } from '../../actions/types';

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    default:
      return state;
  }
}
