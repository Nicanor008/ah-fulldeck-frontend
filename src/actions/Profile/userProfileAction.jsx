import { GET_PROFILE, EDIT_PROFILE } from '../types';
import axiosConfig from '../../config/configAxios';

export const getUserProfile = username => async dispatch => {
  await axiosConfig
    .get(`/api/v1/users/${username}`)
    .catch(error => {
      dispatch({
        type: GET_PROFILE,
        payload: { ...JSON.parse(error.request.response), updated: false },
      });
    })
    .then(res => {
      if (res) {
        dispatch({
          type: GET_PROFILE,
          payload: { ...res.data.profile, updated: false },
        });
      }
    });
};

export const editUserProfile = (username, user_data) => async dispatch => {
  const data = {
    profile: user_data,
  };

  await axiosConfig
    .put(`/api/v1/users/${username}`, data)
    .catch(error => {})
    .then(res => {
      if (res) {
        dispatch({
          type: EDIT_PROFILE,
          payload: { ...res.data.profile, updated: true },
        });
      }
    });
};
