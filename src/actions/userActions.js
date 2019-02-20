import { LOGIN_USER, LOGIN_ERROR } from './types';
import axiosConfig from '../config/configAxios';

// eslint-disable-next-line import/prefer-default-export
export const loginUser = credentials => async (dispatch) => {
  await axiosConfig
    .post('/api/v1/users/login/', {
      user: credentials,
    })
    .then((res) => {
      if (res) {
        dispatch({
          type: LOGIN_USER,
          payload: { ...res.data.user, success: true },
        });
      }
    })
    .catch((errors) => {
      const err = JSON.parse(errors.request.response);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.errors,
      });
    });
};
