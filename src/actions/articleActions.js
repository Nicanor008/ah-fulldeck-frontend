/* eslint-disable camelcase */
import * as types from './types';
import axiosConfig from '../config/configAxios';
import launchToast from '../helpers/toaster';

export const getAllArticles = (page = 1, page_size = 10) => async dispatch => {
  dispatch({
    type: types.ISFETCHING,
  });
  // eslint-disable-next-line no-return-await
  return await axiosConfig
    // eslint-disable-next-line no-template-curly-in-string
    .get(`/api/v1/articles/?page=${page}&page_size=${page_size}`)
    .then(response => {
      dispatch({
        type: types.GET_ARTICLES,
        payload: response.data,
      });
    })
    .catch(error => {
      const errors = JSON.parse(error.request.response);
      dispatch({
        type: types.GET_ARTICLES_ERROR,
        payload: errors,
      });
      launchToast('No articles found', 'toastFail', 'descFail', 'fail');
    });
};

// eslint-disable-next-line no-return-await
export const postArticle = payload => async dispatch => await axiosConfig
  .post('/api/v1/articles/', payload)
  .then(response => {
    dispatch({
      type: types.CREATE_ARTICLE,
      payload: response,
    });
    launchToast('Article Created', 'toastSuccess', 'descSuccess', 'success');
  })
  .catch(error => {
    const errors = JSON.parse(error.request.response);
    dispatch({
      type: types.POST_ARTICLE_ERROR,
      payload: errors,
    });
    launchToast(
      errors.article.errors.description,
      'toastFail',
      'descFail',
      'fail',
    );
  });

// eslint-disable-next-line no-return-await
export const editArticle = (payload, slug) => async dispatch => await axiosConfig
  .put(`/api/v1/articles/${slug}/`, payload)
  .then(response => {
    dispatch({
      type: types.EDIT_ARTICLE,
      payload: response,
    });
    dispatch(getAllArticles());
  })
  .catch(error => {
    const errors = JSON.parse(error.request.response);
    dispatch({
      type: types.GET_SINGLE_ARTICLE_ERROR,
      payload: errors,
    });
    launchToast(errors.article.description, 'toastFail', 'descFail', 'fail');
  });

// eslint-disable-next-line no-return-await
export const deleteArticle = slug => async dispatch => await axiosConfig.delete(`/api/v1/articles/${slug}/`).then(response => {
  dispatch({
    type: types.DELETE_ARTICLE,
    payload: response,
  });
  dispatch(getAllArticles);
});

export const getSingleArticle = slug => async dispatch => {
  dispatch({
    type: types.ISFETCHING,
  });
  // eslint-disable-next-line no-return-await
  return await axiosConfig
    .get(`/api/v1/articles/${slug}`)
    .then(response => {
      dispatch({
        type: types.GET_SINGLE_ARTICLE,
        payload: response.data,
      });
    })
    .catch(error => {
      const errors = JSON.parse(error.request.response);
      dispatch({
        type: types.GET_SINGLE_ARTICLE_ERROR,
        payload: errors,
      });
      launchToast(errors.article.errors.error, 'toastFail', 'descFail', 'fail');
    });
};
