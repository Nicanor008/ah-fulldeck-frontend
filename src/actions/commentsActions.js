import { COMMENT_REQUEST, COMMENT_SUCCESS, COMMENT_ERROR } from './types';
import launchToaster from '../helpers/toaster';
import axiosConfig from '../config/configAxios';

export const addComment = (comments, slug) => async (dispatch) => {
  dispatch({ type: COMMENT_REQUEST });
  await axiosConfig.post(`/api/v1/articles/${slug}/comments/`, comments)
    .catch((error) => {
      const errors = JSON.parse(error.request.response);
      dispatch({
        type: COMMENT_ERROR,
        payload: errors,
      });
      launchToaster(errors.error, 'toastFail', 'descFail', 'fail');
    })
    .then((res) => {
      if (res) {
        dispatch({
          type: COMMENT_SUCCESS,
          payload: res.data,
        });
        launchToaster('Comment added successfully', 'toastSuccess', 'descSuccess', 'success');
      }
    });
};

export const getComments = slug => async (dispatch) => {
  dispatch({ type: COMMENT_REQUEST });
  await axiosConfig.get(`/api/v1/articles/${slug}/comments/`)
    .catch((error) => {
      const errors = JSON.parse(error.request.response);
      dispatch({
        type: COMMENT_ERROR,
        payload: errors,
      });
    })
    .then((res) => {
      if (res) {
        dispatch({
          type: COMMENT_SUCCESS,
          payload: res.data,
        });
      }
    });
};
