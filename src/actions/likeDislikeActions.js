import {
  LIKE_ARTICLE_FAILURE,
  LIKE_ARTICLE_SUCCESS,
  LIKE_ARTICLE_REQUEST,
  DISLIKE_ARTICLE_FAILURE,
  DISLIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_REQUEST,
} from './types';
import axiosConfig from '../config/configAxios';
import { getSingleArticle } from './articleActions';

// eslint-disable-next-line import/prefer-default-export
export const likeArticleRequest = () => ({
  type: LIKE_ARTICLE_REQUEST,
});

export const likeArticleSuccess = (response) => ({
  type: LIKE_ARTICLE_SUCCESS,
  payload: response,
});

export const likeArticleFailure = (errors) => ({
  type: LIKE_ARTICLE_FAILURE,
  payload: errors,
});

export const dislikeArticleRequest = () => ({
  type: DISLIKE_ARTICLE_REQUEST,
});

export const dislikeArticleSuccess = (response) => ({
  type: DISLIKE_ARTICLE_SUCCESS,
  payload: response,
});

export const dislikeArticleFailure = (errors) => ({
  type: DISLIKE_ARTICLE_FAILURE,
  payload: errors.data,
});

export const like = (slug) => (dispatch) => {
  dispatch(likeArticleRequest());
  axiosConfig
    .post(`api/v1/articles/${slug}/like/`)
    .then((res) => {
      const response = res.data;
      dispatch(getSingleArticle(slug));
      dispatch(likeArticleSuccess(response));
    })
    .catch((err) => dispatch(likeArticleFailure(err)));
};

export const dislike = (slug) => (dispatch) => {
  dispatch(dislikeArticleRequest());
  axiosConfig
    .post(`api/v1/articles/${slug}/dislike/`)
    .then((res) => {
      const response = res.data;
      dispatch(getSingleArticle(slug));
      dispatch(dislikeArticleSuccess(response));
    })
    .catch((err) => dispatch(likeArticleFailure(err)));
};
