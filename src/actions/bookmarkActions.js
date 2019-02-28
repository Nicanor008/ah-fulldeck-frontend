import {
  BOOKMARK_ARTICLE,
  UNBOOKMARK_ARTICLE,
  BOOKMARK_ARTICLE_FAILURE,
  GET_ALL_BOOKMARKS_SUCCESS,
  GET_ALL_BOOKMARKS_FAIL,
} from './types';
import axiosConfig from '../config/configAxios';
import launchToast from '../helpers/toaster';
import { getSingleArticle } from './articleActions';

export const bookmark = () => ({
  type: BOOKMARK_ARTICLE,
});
export const unbookmark = () => ({
  type: UNBOOKMARK_ARTICLE,
});
export const bookmarkingFailed = error => ({
  type: BOOKMARK_ARTICLE_FAILURE,
  error,
});
export const getBookmarkSuccess = data => ({
  type: GET_ALL_BOOKMARKS_SUCCESS,
  data,
});
export const getBookmarkFail = error => ({
  type: GET_ALL_BOOKMARKS_FAIL,
  error,
});

export const getBookmarks = () => dispatch => {
  const url = '/api/v1/articles/bookmarks/';
  axiosConfig.defaults.headers.Authorization = `Token ${localStorage.getItem(
    'token',
  )}`;
  axiosConfig
    .get(url, {})
    .then(response => {
      if (response.status === 200) {
        dispatch(getBookmarkSuccess(response.data['Bookmarked articles']));
      }
    })
    .catch(error => {
      dispatch(getBookmarkFail(error.response.data));
    });
};

export const bookmarkArticle = slug => dispatch => {
  const url = `/api/v1/articles/${slug}/bookmark/`;
  axiosConfig.defaults.headers.Authorization = `Token ${localStorage.getItem(
    'token',
  )}`;
  axiosConfig
    .put(url, {})
    .then(response => {
      const icon = document.getElementById('bookmark');

      if (
        response.data.message === `The article ${slug} has been bookmarked!`
      ) {
        icon.classList.remove('notbookmarked');
        icon.classList.add('bookmarked');
        dispatch(bookmark(response.data.message));
        dispatch(getSingleArticle(slug));
        dispatch(getBookmarks());
        launchToast(
          'Article added to bookmarks',
          'toastSuccess',
          'descSuccess',
          'success',
        );
      } else if (
        response.data.message === `The article ${slug} has been removed from bookmarks!`
      ) {
        icon.classList.add('notbookmarked');
        icon.classList.remove('bookmarked');
        dispatch(unbookmark(response.data.message));
        dispatch(getSingleArticle(slug));
        dispatch(getBookmarks());
        launchToast(
          'Article removed from bookmarks',
          'toastFail',
          'descFail',
          'fail',
        );
      }
    })
    .catch(error => {
      dispatch(bookmarkingFailed(error.response.data));
      launchToast(
        'Log in to bookmark',
        'toastFail',
        'descFail',
        'fail',
      );
    });
};
