import {
  UPDATE_PASSWORD,
  UPDATE_REQUEST,
  UPDATE_ERROR,
} from '../actions/types';
import resetInitialState from './resetInitialState';

export default function (state = resetInitialState, action) {
  switch (action.type) {
    case UPDATE_REQUEST:
      return {
        ...state,
        isUpdated: true,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        isUpdated: false,
        message: action.payload.message,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        isUpdated: false,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
}
