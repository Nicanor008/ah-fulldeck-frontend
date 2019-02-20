/* eslint-disable no-return-await */
import * as types from './types';
import axiosWithHeader from '../config/configAxios';

export const getAllArticles = () => async dispatch => {
  dispatch({
    type: types.ISFETCHING,
  });
  return await axiosWithHeader.get('/api/v1/articles/').then(response => {
    dispatch({
      type: types.GET_ARTICLES,
      payload: response.data,
    });
  });
};

export const postArticle = payload => async dispatch => {
  await axiosWithHeader.post('/api/v1/articles/', payload).then(response => {
    dispatch({
      type: types.CREATE_ARTICLE,
      payload: response,
    });
  });
};
export const getSingleArticle = slug => async dispatch => {
  dispatch({
    type: types.ISFETCHING,
  });
  return await axiosWithHeader
    .get(`/api/v1/articles/${slug}`)
    .then(response => {
      dispatch({
        type: types.GET_SINGLE_ARTICLE,
        payload: response.data,
      });
    });
};
