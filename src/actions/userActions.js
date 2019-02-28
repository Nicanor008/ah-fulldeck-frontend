// eslint-disable-next-line import/named
import { LOGIN_USER, LOGIN_ERROR, LOGIN_REQUEST } from './types';
import axiosConfig from '../config/configAxios';
import launchToast from '../helpers/toaster';

// eslint-disable-next-line import/prefer-default-export
export const loginUser = credentials => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  await axiosConfig
    .post('/api/v1/users/login/', {
      user: credentials,
    })
    .then(res => {
      if (res) {
        dispatch({
          type: LOGIN_USER,
          payload: { ...res.data.user, success: true },
        });
        launchToast(
          `${res.data.user.username} logged in succefully`,
          'toastSuccess',
          'descSuccess',
          'success',
        );
      }
    })
    .catch(errors => {
      const err = JSON.parse(errors.request.response);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.errors,
      });
      launchToast(err.errors.error[0], 'toastFail', 'descFail', 'fail');
    });
};
