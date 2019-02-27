import {
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_ERROR,
  CREATED_COMMENT,
  GET_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} from './types';
import launchToaster from '../helpers/toaster';
import axiosConfig from '../config/configAxios';

export const addComment = (comments, slug) => async dispatch => {
  dispatch({ type: COMMENT_REQUEST });
  await axiosConfig
    .post(`/api/v1/articles/${slug}/comments/`, comments)
    .catch(error => {
      const errors = JSON.parse(error.request.response);
      dispatch({
        type: COMMENT_ERROR,
        payload: errors,
      });
      launchToaster(errors.error, 'toastFail', 'descFail', 'fail');
    })
    .then(res => {
      if (res) {
        dispatch({
          type: CREATED_COMMENT,
          payload: res.data,
        });
        launchToaster(
          'Comment added successfully',
          'toastSuccess',
          'descSuccess',
          'success',
        );
      }
    });
};

export const getComments = slug => async dispatch => {
  dispatch({ type: COMMENT_REQUEST });
  await axiosConfig
    .get(`/api/v1/articles/${slug}/comments/`)
    .catch(error => {
      const errors = JSON.parse(error.request.response);
      dispatch({
        type: COMMENT_ERROR,
        payload: errors,
      });
    })
    .then(res => {
      if (res) {
        dispatch({
          type: COMMENT_SUCCESS,
          payload: res.data,
        });
      }
    });
};

export const getComment = (slug, id) => async dispatch => {
  dispatch({ type: COMMENT_REQUEST });
  await axiosConfig
    .get(`/api/v1/articles/${slug}/comments/${id}`)
    .catch(error => {
      const errors = JSON.parse(error.request.response);
      dispatch({
        type: COMMENT_ERROR,
        payload: errors,
      });
    })
    .then(res => {
      if (res) {
        dispatch({
          type: GET_COMMENT,
          payload: res.data,
        });
      }
    });
};

export const updateComment = (slug, id, body) => async dispatch => {
  dispatch({ type: COMMENT_REQUEST });
  await axiosConfig
    .put(`/api/v1/articles/${slug}/comments/${id}/`, body)
    .catch(error => {
      const errors = JSON.parse(error.request.response);
      dispatch({
        type: COMMENT_ERROR,
        payload: errors,
      });
    })
    .then(res => {
      if (res) {
        dispatch({
          type: UPDATE_COMMENT,
          payload: res.data,
        });
      }
    });
};

export const deleteComment = (slug, id) => async dispatch => {
  dispatch({ type: COMMENT_REQUEST });
  await axiosConfig
    .delete(`/api/v1/articles/${slug}/comments/${id}/`)
    .catch(error => {
      // console.log(error.request);
      const errors = JSON.parse(error.request.response);
      dispatch({
        type: COMMENT_ERROR,
        payload: errors,
      });
    })
    .then(res => {
      // console.log(res.data.detail);
      if (res) {
        dispatch({
          type: DELETE_COMMENT,
          payload: res.data,
        });
        dispatch(getComments);
        launchToaster(
          res.data.detail,
          'toastSuccess',
          'descSuccess',
          'success',
        );
      }
    });
};
