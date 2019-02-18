import { ADD_EMAIL, ADD_REQUEST, ADD_ERROR } from "../actions/types";
import resetInitialState from './resetInitialState';


export default function(state = resetInitialState, action) {
  switch (action.type) {
    case ADD_REQUEST:
      return {
        ...state,
        isSent: true
      }
    case ADD_EMAIL:
      return {
          ...state,
          isSent: false,
          message: action.payload.message
        };
    case ADD_ERROR: 
        return {
          ...state,
          isSent:false,
          errors: action.payload.errors
        };
    default:
        return state;
   }
  };
