import {
  GET_PROFILE,
  EDIT_PROFILE,
  GET_ALL_PROFILES,
  GET_FOLLOWING,
  GET_FOLLOWERS,
  GET_LOGGED_IN_USER_FOLLOWING,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
} from '../types';
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
export const getAllUsers = () => async dispatch => {
  await axiosConfig
    .get('/api/v1/profiles/')
    .catch(error => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: { ...JSON.parse(error.request.response), updated: false },
      });
    })
    .then(res => {
      if (res) {
        dispatch({
          type: GET_ALL_PROFILES,
          payload: { ...res.data.profile, updated: false },
        });
      }
    });
};

// eslint-disable-next-line camelcase
export const editUserProfile = (username, user_data) => async dispatch => {
  const data = {
    profile: user_data,
  };

  await axiosConfig.put(`/api/v1/users/${username}`, data).then(res => {
    if (res) {
      dispatch({
        type: EDIT_PROFILE,
        payload: { ...res.data.profile, updated: true },
      });
    }
  });
};
export const getLoggedInUserFollowing = username => async dispatch => {
  await axiosConfig
    .get(`/api/v1/users/${username}/following/`)
    .catch(error => {
      dispatch({
        type: GET_LOGGED_IN_USER_FOLLOWING,
        payload: { ...JSON.parse(error.request.response), updated: false },
      });
    })
    .then(res => {
      if (res) {
        dispatch({
          type: GET_LOGGED_IN_USER_FOLLOWING,
          payload: {
            ...res.data,
          },
        });
      }
    });
};

export const followUserRequest = () => ({
  type: FOLLOW_USER_REQUEST,
});
export const followUserSuccess = response => ({
  type: FOLLOW_USER_SUCCESS,
  payload: response,
});
export const followUserFailure = errors => ({
  type: FOLLOW_USER_FAILURE,
  payload: errors,
});
export const unfollowUserRequest = () => ({
  type: UNFOLLOW_USER_REQUEST,
});
export const unfollowUserSuccess = response => ({
  type: UNFOLLOW_USER_SUCCESS,
  payload: response,
});
export const unfollowUserFailure = errors => ({
  type: UNFOLLOW_USER_FAILURE,
  payload: errors,
});

export const getFollowing = username => async dispatch => {
  await axiosConfig
    .get(`/api/v1/users/${username}/following/`)
    .catch(error => {
      dispatch({
        type: GET_FOLLOWING,
        payload: { ...JSON.parse(error.request.response), updated: false },
      });
    })
    .then(res => {
      if (res) {
        dispatch({
          type: GET_FOLLOWING,
          payload: {
            ...res.data,
          },
        });
      }
    });
};

export const followUser = (
  username,
  currentUserProfileName = null,
) => dispatch => {
  dispatch(followUserRequest());
  axiosConfig
    .post(`/api/v1/users/${username}/follow/`)
    .then(res => {
      const response = res.data.Details;
      dispatch(getFollowing(currentUserProfileName));
      dispatch(getUserProfile(currentUserProfileName));
      dispatch(followUserSuccess(response));
    })
    .catch(err => dispatch(followUserFailure(err)));
};

export const unfollowUser = (
  username,
  currentUserProfileName = null,
) => dispatch => {
  dispatch(unfollowUserRequest());
  axiosConfig
    .delete(`/api/v1/users/${username}/follow/`)
    .then(res => {
      const response = res.data.Details;
      dispatch(getFollowing(currentUserProfileName));
      dispatch(unfollowUserSuccess(response));
    })
    .catch(err => dispatch(unfollowUserFailure(err)));
};

export const getFollowers = username => async dispatch => {
  await axiosConfig
    .get(`/api/v1/users/${username}/followers/`)
    .catch(error => {
      dispatch({
        type: GET_FOLLOWERS,
        payload: { ...JSON.parse(error.request.response), updated: false },
      });
    })
    .then(res => {
      if (res) {
        dispatch({
          type: GET_FOLLOWERS,
          payload: {
            ...res.data,
          },
        });
      }
    });
};
