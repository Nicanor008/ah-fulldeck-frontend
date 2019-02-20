import * as types from './types';

export const FacebookAuth = data => data;
export const GoogleAuth = data => data;
export const TwitterAuth = data => data;
export const receivedUsers = action => ({
  type: types.RECEIVE_DATA,
  payload: {
    fetching: false,
    users: action,
    message: 'success',
  },
});
export const fetchUsers = () => ({
  type: types.FETCHING,
  payload: {
    fetching: true,
    message: 'fetching',
  },
});
export const getError = error => ({

  type: types.FETCH_FAILED,
  payload: {
    fetching: false,
    message: error,
  },
});
