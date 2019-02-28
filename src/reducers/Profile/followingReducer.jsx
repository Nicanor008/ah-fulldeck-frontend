import { GET_FOLLOWING } from '../../actions/types';

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload,
      };
    default:
      return state;
  }
}
