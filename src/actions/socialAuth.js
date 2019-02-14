import * as types from './types';

export const FacebookAuth=(data) =>{
  return data;
}
export const GoogleAuth=(data) =>{
  return data;
}
export const TwitterAuth=(data)=> {
  return data;
}
export const receivedUsers=(action) =>{
  return {
    type: types.RECEIVE_DATA,
    payload: {
      fetching: false,
      users: action,
      message: 'success',
    },
  };
}
export const fetchUsers=()=> {
  return {
    type: types.FETCHING,
    payload: {
      fetching: true,
      message: 'fetching',
    },
  };
}
export const getError=(error)=> {
  return {

    type: types.FETCH_FAILED,
    payload: {
      fetching: false,
      message: error,
    },
  };
}
